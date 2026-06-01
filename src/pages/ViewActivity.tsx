import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

type Activity = {
  id: number;
  title?: string;
  description?: string;
  activity_date?: string;
  location?: string;
  coach?: {
    first_name?: string;
    last_name?: string;
    name?: string;
    email?: string;
  } | null;
};

export default function ViewActivity() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    api
      .get<Activity>(`/activities/${id}`)
      .then((res) => setActivity(res.data))
      .catch((err) => console.log(err.response?.data));
  }, [id]);

  if (!activity) return <p>Loading...</p>;

  const coachName = activity.coach
    ? activity.coach.name ||
      `${activity.coach.first_name ?? ""} ${activity.coach.last_name ?? ""}`.trim() ||
      "No coach"
    : "No coach";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activity.title || "Untitled Activity"}
        </h1>

        <p className="mt-2 text-gray-500">
          {activity.description || "No description"}
        </p>

        <div className="mt-8 space-y-4">
          <p>Date: {activity.activity_date || "No date"}</p>
          <p>Location: {activity.location || "No location"}</p>
          <p>Coach: {coachName}</p>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/activities"
            className="rounded-lg border border-gray-200 px-5 py-3"
          >
            Back
          </Link>

          <Link
            to={`/activities/edit/${activity.id}`}
            className="rounded-lg bg-brand-500 px-5 py-3 text-white"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}