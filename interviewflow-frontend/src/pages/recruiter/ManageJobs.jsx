import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, EmptyState } from "../../components/common/UI";
import JobFormModal from "../../components/recruiter/JobFormModal";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get("/jobs/my");
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSave = async (form) => {
    if (editingJob) {
      await api.put(`/jobs/${editingJob._id}`, form);
    } else {
      await api.post("/jobs", form);
    }
    fetchJobs();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    setJobs(jobs.filter((j) => j._id !== id));
  };

  const openCreate = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manage Jobs</h2>
          <p className="text-sm text-gray-500">Create and manage your job listings</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Post Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <EmptyState message="No jobs posted yet. Click 'Post Job' to create your first listing." />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {job.company} &middot; {job.location} &middot; {job.type}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {job.description}
                  </p>
                  {job.salary && (
                    <p className="text-xs text-blue-600 font-medium mt-2">
                      💰 {job.salary}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(job)}
                    className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-sm border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <JobFormModal
          job={editingJob}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
