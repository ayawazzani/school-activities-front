import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import api from "../api";

type AdminProfile = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role?: string | null;
};

export default function UserProfiles() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get<AdminProfile>("/profile/1")
      .then((res) => {
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          role: res.data.role || "Admin",
        });
      })
      .catch((err) => console.log(err.response?.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.put<AdminProfile>("/profile/1", form);

      setProfile(res.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PageMeta title="Admin Profile | SchoolHub" description="Admin profile" />

      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Admin Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage admin information saved in database.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
            >
              Edit
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {profile?.name || "No name"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {profile?.email || "No email"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {profile?.phone || "No phone"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {profile?.role || "Admin"}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone"
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
              />

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                type="text"
                placeholder="Role"
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}