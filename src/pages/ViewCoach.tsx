import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function ViewCoach() {
  const { id } = useParams();

  const [coach, setCoach] = useState<any>(null);

  useEffect(() => {
    api.get(`/coaches/${id}`)
      .then((res) => setCoach(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!coach) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-xl font-bold text-brand-500">
            {coach.first_name?.[0]}
            {coach.last_name?.[0]}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {coach.first_name} {coach.last_name}
            </h1>

            <p className="text-gray-500">
              {coach.email}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{coach.phone || "No phone"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Specialty</p>
            <p className="font-medium">{coach.specialty || "No specialty"}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/coaches"
            className="rounded-lg bg-brand-500 px-5 py-3 text-white"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}