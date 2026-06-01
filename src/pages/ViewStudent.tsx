import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

type Student = {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  level?: string;
};

export default function ViewStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get<Student>(`/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => {
        console.log(err.response?.data);
        setErrorMessage(err.response?.data?.message || "Student not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (errorMessage) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{errorMessage}</p>
        <Link to="/students" className="text-brand-500">
          Back to students
        </Link>
      </div>
    );
  }

  if (!student) return null;

  const fullName =
    student.name ||
    `${student.first_name ?? ""} ${student.last_name ?? ""}`.trim() ||
    "Unknown Student";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
        <p className="text-gray-500">{student.email || "No email"}</p>

        <div className="mt-8 space-y-4">
          <p>Phone: {student.phone || "No phone"}</p>
          <p>Level: {student.level || "No level"}</p>
        </div>

        <div className="mt-8">
          <Link to="/students" className="rounded-lg bg-brand-500 px-5 py-3 text-white">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}