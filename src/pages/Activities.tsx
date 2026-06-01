import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
type Activity = {
  id: number;
  title?: string;
  name?: string;
  type?: string;
  date?: string;
  activity_date?: string;
  participants?: number;
  capacity?: number;
  status?: string;
  color?: string;
  coach?: {
    id: number;
    first_name?: string;
    last_name?: string;
    name?: string;
    email?: string;
  } | null;
};

export default function Activities() {
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get("/activities")
      .then((res) => setActivities(res.data))
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Activities
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage school sports, clubs, competitions and events.
          </p>
        </div>

        <Link
          to="/activities/add"
          className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          + Add Activity
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search activities..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white lg:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            {["All"].map((item) => (
              <button
                key={item}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        {activities
          .filter((activity) =>
            (activity.title || activity.name || "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((activity) => {
          const participants = activity.participants ?? 0;
          const capacity = activity.capacity ?? 1;
          const percent = Math.round((participants / capacity) * 100);

          return (
            <div
              key={activity.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs transition hover:-translate-y-1 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div
                className={`h-32 ${
                  activity.color || "bg-blue-500"
                } relative p-5`}
              >
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  {activity.type || "Activity"}
                </span>

                <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                  {activity.status || "Active"}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activity.title || activity.name || "Untitled Activity"}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Date:{" "}
                    {activity.date || activity.activity_date || "No date"}
                  </p>
                  <p>
                    Coach:{" "}
                    {activity.coach
                      ? activity.coach.name ||
                        `${activity.coach.first_name ?? ""} ${activity.coach.last_name ?? ""}`.trim() ||
                        "No coach"
                      : "No coach"}
                  </p>
                  <p>
                    Participants: {participants}/{capacity}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Capacity</span>
                    <span>{percent}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-2 rounded-full bg-brand-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/activities/${activity.id}`}
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
                  >
                    View
                  </Link>

                  <Link
                      to={`/activities/edit/${activity.id}`}
                      className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-600"
                    >
                      Edit
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}