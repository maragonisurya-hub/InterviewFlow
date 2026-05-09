import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, EmptyState } from "../../components/common/UI";
import ApplyModal from "../../components/candidate/ApplyModal";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const { data } = await api.get("/jobs");
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const { data } = await api.get("/applications/my");
      setAppliedIds(data.map((a) => a.job?._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, []);

  const handleApplied = () => {
    fetchMyApplications();
  };

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Browse Jobs</h2>
        <p className="text-sm text-gray-500">Find and apply for your next opportunity</p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, company, or location..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-sm text-gray-400">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <EmptyState message="No jobs found matching your search." />
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => {
            const hasApplied = appliedIds.includes(job._id);
            return (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {job.company} &middot; {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {job.type}
                      </span>
                      {job.salary && (
                        <span className="text-xs text-gray-500">
                          💰 {job.salary}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {hasApplied ? (
                      <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg font-medium">
                        ✓ Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplied={handleApplied}
        />
      )}
    </div>
  );
}
