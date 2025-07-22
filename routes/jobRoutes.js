const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const {
  createJob,
  getAllJobs,
  getJobById
} = require("../controllers/jobController");

router.post("/admin/add", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);

router.delete("/admin/delete/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

module.exports = router;

