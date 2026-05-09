const Application = require("../models/Application");
const Job = require("../models/Job");

// POST /api/applications — candidate applies
const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/applications/my — candidate's own applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate("job", "title company location type")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/applications — recruiter sees all applications for their jobs
const getAllApplications = async (req, res) => {
  try {
    // Get all jobs posted by this recruiter
    const myJobs = await Job.find({ postedBy: req.user._id }).select("_id");
    const jobIds = myJobs.map((j) => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title company")
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/applications/:id — recruiter updates status and evaluation
const updateApplication = async (req, res) => {
  try {
    const { status, evaluation } = req.body;

    const application = await Application.findById(req.params.id).populate(
      "job"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Only the recruiter who posted the job can update
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (status) application.status = status;
    if (evaluation) application.evaluation = { ...application.evaluation, ...evaluation };

    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyForJob, getMyApplications, getAllApplications, updateApplication };
