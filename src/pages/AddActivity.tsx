import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function AddActivity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "Sport",
    description: "",
    coach_id: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
    status: "Upcoming",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/activities", {
        title: form.name,
        description: form.description,
        activity_date: form.date || null,
        location: form.location,
        coach_id: form.coach_id || null,
      });

      navigate("/activities");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error creating activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Activity
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new school activity, sport event, club session or competition.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activity Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Football Championship"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activity Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                >
                  <option>Sport</option>
                  <option>Club</option>
                  <option>Event</option>
                  <option>Competition</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short description about this activity..."
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              Schedule & Organization
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Coach ID
                </label>
                <input
                  name="coach_id"
                  value={form.coach_id}
                  onChange={handleChange}
                  type="number"
                  placeholder="1"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="School playground"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  type="date"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <input
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  type="time"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              Capacity & Status
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Participants
                </label>
                <input
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  type="number"
                  placeholder="30"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
                >
                  <option>Upcoming</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-gray-800 sm:flex-row sm:justify-end">
            <Link
              to="/activities"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-6 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-6 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}