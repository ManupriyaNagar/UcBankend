// /routes/applicationRoutes.js or similar
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/application"); // Mongoose model
const { getAllApplications ,getApplicationsByJob  } = require("../controllers/applicationController");




const fs = require("fs");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads";

    if (file.fieldname === "resume") {
      folder = "uploads/resumes";
    } else if (file.fieldname === "portfolio") {
      folder = "uploads/portfolios";
    }

    // Ensure folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });




router.post(
  "/apply",
  upload.fields([{ name: "resume" }, { name: "portfolio" }]),
  async (req, res) => {
    try {
      const { name, email, phone, job } = req.body;

      const newApp = new Application({
        name,
        email,
        phone,
        job,
        resume: `resumes/${req.files.resume?.[0].filename}` || "",
        portfolio: `portfolios/${req.files.portfolio?.[0].filename}` || "",
        
      });

      await newApp.save();
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("Application error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);
router.get("/", (req, res) => {
  getAllApplications(req, res);
});

router.get("/:id", getApplicationsByJob);

module.exports = router;
