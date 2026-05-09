import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, EmptyState, StatusBadge } from "../../components/common/UI";
import EvaluationModal from "../../components/recruiter/EvaluationModal";

// Modal to read the full cover letter
function CoverLetterModal({ application, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900">Cover Letter</h3>
            <p className="text-sm text-gray-500">
              {application.candidate?.name} — {application.job?.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">
          {application.coverLetter ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {application.coverLetter}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              No cover letter was submitted.
            </p>
          )}
        </div>
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(null);
  const [viewingCover, setViewingCover] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/applications");
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdate = async (id, updates) => {
    await api.put(`/applications/${id}`, updates);
    fetchApplications();
  };

  const statuses = ["All", "Applied", "Under Review", "Shortlisted", "Rejected", "Selected"];

  const filtered =
    filter === "All"
      ? applications
      : applications.filter((a) => a.status === filter);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">All Applications</h2>
        <p className="text-sm text-gray-500">Review and evaluate candidates</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1 text-xs opacity-75">
                ({applications.filter((a) => a.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No applications match this filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900">
                      {app.candidate?.name}
                    </p>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {app.candidate?.email}
                  </p>
                  <p className="text-sm text-blue-700 font-medium mt-1">
                    {app.job?.title} — {app.job?.company}
                  </p>

                  {/* Scores display */}
                  {(app.evaluation?.technicalSkills > 0 ||
                    app.evaluation?.communication > 0) && (
                    <div className="flex gap-4 mt-2 text-xs text-gray-600">
                      <span>Tech: {app.evaluation.technicalSkills}/10</span>
                      <span>Comm: {app.evaluation.communication}/10</span>
                      <span>PS: {app.evaluation.problemSolving}/10</span>
                    </div>
                  )}

                  {app.evaluation?.feedback && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      "{app.evaluation.feedback}"
                    </p>
                  )}

                  {/* Cover letter preview with "Read full" link */}
                  {app.coverLetter ? (
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-xs text-gray-400 line-clamp-1 flex-1">
                        {app.coverLetter}
                      </p>
                      <button
                        onClick={() => setViewingCover(app)}
                        className="text-xs text-blue-600 hover:underline whitespace-nowrap font-medium"
                      >
                        Read full
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 mt-2 italic">
                      No cover letter submitted
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEvaluating(app)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Evaluate
                  </button>
                  {app.coverLetter && (
                    <button
                      onClick={() => setViewingCover(app)}
                      className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      Cover Letter
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evaluation modal */}
      {evaluating && (
        <EvaluationModal
          application={evaluating}
          onClose={() => setEvaluating(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Cover letter modal */}
      {viewingCover && (
        <CoverLetterModal
          application={viewingCover}
          onClose={() => setViewingCover(null)}
        />
      )}
    </div>
  );
}