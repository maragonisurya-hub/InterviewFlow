const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getAllApplications,
  updateApplication,
} = require("../controllers/applicationController");
const { protect, recruiterOnly, candidateOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, candidateOnly, applyForJob);
router.get("/my", protect, candidateOnly, getMyApplications);
router.get("/", protect, recruiterOnly, getAllApplications);
router.put("/:id", protect, recruiterOnly, updateApplication);

module.exports = router;
