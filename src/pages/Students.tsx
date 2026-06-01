import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

type Student = {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  level?: string;
  className?: string;
  activity?: string;
  status?: string;
};

export default function Students() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api
      .get<Student[]>("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getStudentName = (student: Student) => {
    if (student.name) return student.name;

    const fullName = `${student.first_name ?? ""} ${student.last_name ?? ""}`.trim();

    return fullName || "Unknown Student";
  };
  const filteredStudents = students.filter((student) =>
    `${student.first_name || ""} ${student.last_name || ""} ${student.name || ""} ${student.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getAvatar = (student: Student) => {
    const name = getStudentName(student);

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
          Students
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage students registered in school activities.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search students..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-800 dark:text-white lg:max-w-sm"
          />

          <div className="flex items-center gap-3 flex-wrap">
            <button className="rounded-xl border px-5 py-3">
              All
            </button>

            <Link
              to="/students/add"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              + Add Student
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStudents.map((student) => {
                const studentName = getStudentName(student);

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-500">
                          {getAvatar(student)}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {studentName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {student.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {student.level || student.className || "No level"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {student.activity || "Not registered"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          (student.status || "Active") === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {student.status || "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/students/${student.id}`}
                        className="mr-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
                      >
                        View
                      </Link>
                      <Link
                        to={`/students/edit/${student.id}`}
                        className="rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No students found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}