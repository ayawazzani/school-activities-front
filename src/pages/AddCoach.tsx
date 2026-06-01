import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function AddCoach() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    specialty: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      await api.post("/coaches", form);

      navigate("/coaches");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error creating coach");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Coach
        </h1>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              type="text"
              placeholder="First name"
              className="h-11 rounded-lg border border-gray-200 px-4"
            />

            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              type="text"
              placeholder="Last name"
              className="h-11 rounded-lg border border-gray-200 px-4"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="h-11 rounded-lg border border-gray-200 px-4"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              className="h-11 rounded-lg border border-gray-200 px-4"
            />

            <input
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              type="text"
              placeholder="Specialty"
              className="h-11 rounded-lg border border-gray-200 px-4 lg:col-span-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/coaches"
              className="rounded-lg border border-gray-200 px-5 py-3"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-500 px-5 py-3 text-white"
            >
              {loading ? "Creating..." : "Create Coach"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}