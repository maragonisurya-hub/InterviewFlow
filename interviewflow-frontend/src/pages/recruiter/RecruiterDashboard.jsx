import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, StatCard } from "../../components/common/UI";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Applied: "#3b82f6",
  "Under Review": "#f59e0b",
  Shortlisted: "#8b5cf6",
  Rejected: "#ef4444",
  Selected: "#22c55e",
};

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          api.get("/jobs/my"),
          api.get("/applications"),
        ]);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  // Status breakdown for pie chart
  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Score bar chart data
  const scoredApps = applications.filter(
    (a) =>
      a.evaluation?.technicalSkills > 0 ||
      a.evaluation?.communication > 0 ||
      a.evaluation?.problemSolving > 0
  );

  const barData = scoredApps.slice(0, 8).map((app) => ({
    name: app.candidate?.name?.split(" ")[0] || "Unknown",
    Technical: app.evaluation?.technicalSkills || 0,
    Communication: app.evaluation?.communication || 0,
    "Problem Solving": app.evaluation?.problemSolving || 0,
  }));

  const selected = applications.filter((a) => a.status === "Selected").length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Recruiter Dashboard</h2>
        <p className="text-sm text-gray-500">Overview of your jobs and applications</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Jobs" value={jobs.length} color="blue" />
        <StatCard label="Applications" value={applications.length} color="purple" />
        <StatCard label="Shortlisted" value={shortlisted} color="orange" />
        <StatCard label="Selected" value={selected} color="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Application Status Breakdown</h3>
          {pieData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No application data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
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
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Candidate Scores</h3>
          {barData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No evaluation scores yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Technical" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Communication" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Problem Solving" fill="#22c55e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Your Recent Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-sm text-gray-400">No jobs posted yet.</p>
        ) : (
          <div className="space-y-2">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.company} &middot; {job.location}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {job.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
