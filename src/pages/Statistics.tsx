import { useEffect, useState } from "react";
import api from "../api";

type DashboardStats = {
  total_activities: number;
  total_students: number;
  total_coaches: number;
  upcoming_events: number;
};

const topActivities = [
  {
    name: "Football Championship",
    participants: 42,
    progress: 90,
  },
  {
    name: "Basketball Tournament",
    participants: 31,
    progress: 75,
  },
  {
    name: "Science Club",
    participants: 24,
    progress: 60,
  },
  {
    name: "Drama Club",
    participants: 18,
    progress: 45,
  },
];

export default function Statistics() {
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
      growth: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Registered Students",
      value: stats.total_students,
      growth: "+8%",
      color: "bg-purple-500",
    },
    {
      title: "Active Coaches",
      value: stats.total_coaches,
      growth: "+5%",
      color: "bg-green-500",
    },
    {
      title: "Upcoming Events",
      value: stats.upcoming_events,
      growth: "+18%",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Statistics
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview and analytics of school activities and participation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
              </div>

              <div className={`h-12 w-12 rounded-xl ${card.color}`} />
            </div>

            <div className="mt-5">
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                {card.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Participation
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Student participation during the year
              </p>
            </div>
          </div>

          <div className="mt-8 flex h-[300px] items-end justify-between gap-4">
            {[40, 65, 55, 80, 70, 90, 75, 60, 85, 95, 78, 88].map(
              (height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t-xl bg-brand-500 transition-all hover:bg-brand-600"
                    style={{ height: `${height * 2}px` }}
                  />

                  <span className="mt-3 text-xs text-gray-500 dark:text-gray-400">
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
            Top Activities
          </h2>

          <div className="mt-6 space-y-5">
            {topActivities.map((activity, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {activity.name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.participants} participants
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {activity.progress}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-brand-500"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activity Performance
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              General performance overview
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Sports",
              value: "85%",
              color: "bg-blue-500",
            },
            {
              label: "Clubs",
              value: "72%",
              color: "bg-purple-500",
            },
            {
              label: "Events",
              value: "90%",
              color: "bg-green-500",
            },
            {
              label: "Competitions",
              value: "68%",
              color: "bg-orange-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 p-5 dark:border-gray-800"
            >
              <div className={`mb-4 h-3 w-full rounded-full ${item.color}`} />

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.label}
              </h3>

              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}