import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

type Coach = {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  specialty?: string;
  activities?: number;
  students?: number;
  status?: string;
};

export default function Coaches() {
  const [search, setSearch] = useState("");
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    api
      .get<Coach[]>("/coaches")
      .then((res) => setCoaches(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getCoachName = (coach: Coach) => {
    if (coach.name) return coach.name;

    const fullName = `${coach.first_name ?? ""} ${coach.last_name ?? ""}`.trim();

    return fullName || "Unknown Coach";
  };

  const getAvatar = (coach: Coach) => {
    const name = getCoachName(coach);

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coaches
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage coaches and activity supervisors.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search coaches..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white lg:max-w-sm"
          />

          <Link
            to="/coaches/add"
            className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
          >
            + Add Coach
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        {coaches
          .filter((coach) =>
            `${coach.first_name || ""} ${coach.last_name || ""} ${coach.name || ""} ${coach.email || ""}`
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((coach) => (
          <div
            key={coach.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs transition hover:-translate-y-1 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-500">
                  {getAvatar(coach)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getCoachName(coach)}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coach.email || "No email"}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  (coach.status || "Active") === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {coach.status || "Active"}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Specialty
                </span>

                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {coach.specialty || "General Coach"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Activities
                </span>

                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {coach.activities ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Students
                </span>

                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {coach.students ?? 0}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                to={`/coaches/${coach.id}`}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
              >
                View
              </Link>

              <Link
                to={`/coaches/edit/${coach.id}`}
                className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-600"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {coaches.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700">
          No coaches found.
        </div>
      )}
    </div>
  );
}