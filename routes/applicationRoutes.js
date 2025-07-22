const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const upload = require("../middleware/upload");
const {
  submitApplication,
  getAllApplications,
  getApplicationsByJob
} = require("../controllers/applicationController");

router.post(
  "/apply",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "portfolio", maxCount: 1 }
  ]),
  submitApplication
);

// router.get("/admin", getAllApplications); // ✅ this is valid

// router.get("/admin/job/:jobId", getApplicationsByJob);

router.delete("/admin/delete/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});


module.exports = router;
