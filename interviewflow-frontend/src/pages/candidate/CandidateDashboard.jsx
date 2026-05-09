import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, StatCard, StatusBadge } from "../../components/common/UI";
import { useAuth } from "../../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STATUS_COLORS = {
  Applied: "#3b82f6",
  "Under Review": "#f59e0b",
  Shortlisted: "#8b5cf6",
  Rejected: "#ef4444",
  Selected: "#22c55e",
};

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/applications/my");
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  const selected = applications.filter((a) => a.status === "Selected").length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Welcome back, {user?.name} 👋
        </h2>
        <p className="text-sm text-gray-500">Track your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Applied" value={applications.length} color="blue" />
        <StatCard label="Under Review" value={statusCount["Under Review"] || 0} color="orange" />
        <StatCard label="Shortlisted" value={shortlisted} color="purple" />
        <StatCard label="Selected" value={selected} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Application Status</h3>
          {pieData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No applications yet. Start applying!
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {pieData.map((entry) => (
              <span key={entry.name} className="flex items-center gap-1 text-xs text-gray-600">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: STATUS_COLORS[entry.name] || "#94a3b8" }}
                />
                {entry.name} ({entry.value})
              </span>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Applications</h3>
          {applications.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {app.job?.title}
                    </p>
                    <p className="text-xs text-gray-500">{app.job?.company}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
