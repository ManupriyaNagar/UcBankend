// const express = require("express");
// const router = express.Router();
// const Job = require("../models/Job");

// // GET /jobs?type=full-time&experience=2-3
// router.get("/", async (req, res) => {
//   const { type, experience } = req.query;
//   const filter = {};

//   if (type && ["full-time", "part-time"].includes(type.toLowerCase())) {
//     filter.type = type.toLowerCase();
//   }

//   if (experience) {
//     const [minExp, maxExp] = experience.split("-").map(Number);
//     if (!isNaN(minExp) && !isNaN(maxExp)) {
//       filter.experience = { $gte: minExp, $lte: maxExp };
//     }
//   }

//   try {
//     const jobs = await Job.find(filter).sort({ createdAt: -1 });
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching jobs", error: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
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

