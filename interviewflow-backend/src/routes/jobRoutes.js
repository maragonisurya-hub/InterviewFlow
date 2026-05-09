const express = require("express");
const router = express.Router();
const {
  getJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect, recruiterOnly } = require("../middlewares/authMiddleware");

router.get("/", getJobs);
router.get("/my", protect, recruiterOnly, getMyJobs);
router.get("/:id", getJobById);
router.post("/", protect, recruiterOnly, createJob);
router.put("/:id", protect, recruiterOnly, updateJob);
router.delete("/:id", protect, recruiterOnly, deleteJob);

module.exports = router;
