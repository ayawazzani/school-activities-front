import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import PageMeta from "../../components/common/PageMeta";

type DashboardStats = {
  total_activities: number;
  total_students: number;
  total_coaches: number;
  upcoming_events: number;
};

const recentActivities = [
  { name: "Football Championship", type: "Sport", date: "May 20, 2026", status: "Upcoming" },
  { name: "Basketball Tournament", type: "Sport", date: "May 22, 2026", status: "Upcoming" },
  { name: "Science Club", type: "Club", date: "May 18, 2026", status: "Active" },
  { name: "Drama Club", type: "Club", date: "May 25, 2026", status: "Active" },
];

const upcomingEvents = [
  { day: "20", month: "May", title: "Football Final", time: "10:00 AM" },
  { day: "22", month: "May", title: "Basketball Match", time: "02:00 PM" },
  { day: "25", month: "May", title: "Drama Club Show", time: "04:30 PM" },
];

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    total_activities: 0,
    total_students: 0,
    total_coaches: 0,
    upcoming_events: 0,
  });

  useEffect(() => {
    api
      .get<DashboardStats>("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const statsCards = [
    {
      title: "Total Activities",
      value: stats.total_activities,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Students",
      value: stats.total_students,
      change: "+8%",
      color: "bg-purple-500",
    },
    {
      title: "Coaches",
      value: stats.total_coaches,
      change: "+5%",
      color: "bg-green-500",
    },
    {
      title: "Upcoming Events",
      value: stats.upcoming_events,
      change: "+18%",
      color: "bg-orange-500",
    },
  ];

  return (
    <>
      <PageMeta
        title="School Activities Dashboard"
        description="School activities management dashboard"
      />

      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-brand-500 to-purple-600 p-6 text-white shadow-theme-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">
                School Activities Management
              </p>
              <h1 className="mt-2 text-3xl font-bold">
                Welcome back, Admin 👋
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80">
                Manage sports, clubs, school events, students, coaches and
                planning from one clean dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/activities/add"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-gray-50"
              >
                + Add Activity
              </Link>
              <Link
                to="/activities"
                className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                View Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h3>
                </div>

                <div className={`h-12 w-12 rounded-xl ${item.color}`} />
              </div>

              <span className="mt-5 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                {item.change} this month
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activities
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Latest school activities and clubs
                </p>
              </div>

              <Link
                to="/activities"
                className="text-sm font-medium text-brand-500 hover:text-brand-600"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.type} • {activity.date}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      activity.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Next planned activities
            </p>

            <div className="mt-6 space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <span className="text-lg font-bold">{event.day}</span>
                    <span className="text-xs">{event.month}</span>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Participation
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Students participating in activities
            </p>

            <div className="mt-8 flex h-[260px] items-end justify-between gap-3">
              {[45, 60, 52, 75, 70, 90, 65, 80, 95, 72, 86, 92].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t-xl bg-brand-500 hover:bg-brand-600"
                      style={{ height: `${height * 2}px` }}
                    />
                    <span className="mt-3 text-xs text-gray-500">
                      {
                        [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ][index]
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>

            <div className="mt-6 space-y-3">
              <Link
                to="/activities/add"
                className="block rounded-xl bg-brand-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
              >
                + Create Activity
              </Link>
              <Link
                to="/students"
                className="block rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
              >
                Manage Students
              </Link>
              <Link
                to="/coaches"
                className="block rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
              >
                Manage Coaches
              </Link>
              <Link
                to="/calendar"
                className="block rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
              >
                Open Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}