import { useState } from "react";
import { ErrorAlert } from "../common/UI";

const STATUS_OPTIONS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Rejected",
  "Selected",
];

export default function EvaluationModal({ application, onClose, onUpdate }) {
  const [status, setStatus] = useState(application.status);
  const [evaluation, setEvaluation] = useState({
    technicalSkills: application.evaluation?.technicalSkills || 0,
    communication: application.evaluation?.communication || 0,
    problemSolving: application.evaluation?.problemSolving || 0,
    feedback: application.evaluation?.feedback || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScore = (field, value) => {
    const num = Math.min(10, Math.max(0, Number(value)));
    setEvaluation({ ...evaluation, [field]: num });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onUpdate(application._id, { status, evaluation });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const ScoreInput = ({ label, field }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-gray-700">{label}</label>
        <span className="text-sm font-medium text-blue-600">{evaluation[field]}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={evaluation[field]}
        onChange={(e) => handleScore(field, e.target.value)}
        className="w-full accent-blue-600"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900">Evaluate Candidate</h3>
            <p className="text-sm text-gray-500">
              {application.candidate?.name} — {application.job?.title}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-5">
          <ErrorAlert message={error} />

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Scores */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Evaluation Scores</h4>
            <ScoreInput label="Technical Skills" field="technicalSkills" />
            <ScoreInput label="Communication" field="communication" />
            <ScoreInput label="Problem Solving" field="problemSolving" />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
            <textarea
              rows={3}
              value={evaluation.feedback}
              onChange={(e) =>
                setEvaluation({ ...evaluation, feedback: e.target.value })
              }
              placeholder="Optional feedback for the candidate..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Evaluation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
