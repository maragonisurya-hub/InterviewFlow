import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Spinner, EmptyState, StatusBadge } from "../../components/common/UI";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/applications/my");
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
        <p className="text-sm text-gray-500">
          Track your application history and recruiter feedback
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState message="You haven't applied for any jobs yet. Browse jobs to get started." />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      {app.job?.title}
                    </h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {app.job?.company} &middot; {app.job?.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>

                  {/* Evaluation scores (if evaluated) */}
                  {(app.evaluation?.technicalSkills > 0 ||
                    app.evaluation?.communication > 0 ||
                    app.evaluation?.problemSolving > 0) && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-semibold text-blue-800 mb-2">
                        Evaluation Scores
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-700">
                            {app.evaluation.technicalSkills}
                          </p>
                          <p className="text-xs text-blue-600">Technical</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-700">
                            {app.evaluation.communication}
                          </p>
                          <p className="text-xs text-blue-600">Communication</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-700">
                            {app.evaluation.problemSolving}
                          </p>
                          <p className="text-xs text-blue-600">Problem Solving</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {app.evaluation?.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        Recruiter Feedback
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        "{app.evaluation.feedback}"
                      </p>
                    </div>
                  )}

                  {/* Cover Letter */}
                  {app.coverLetter && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-400 line-clamp-2">
                        Your message: {app.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
