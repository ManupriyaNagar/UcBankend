const Application = require("../models/application");

const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, job } = req.body;

    console.log("Incoming form data:", req.body);
    console.log("Uploaded files:", req.files);

    if (!name || !email || !phone || !job) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const resume = req.files["resume"]?.[0]?.filename || null;
    const portfolio = req.files["portfolio"]?.[0]?.filename || null;

    const application = new Application({
      name,
      email,
      phone,
      job, // this must be a valid ObjectId if referencing Job model
      resume,
      portfolio,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title") // Only if job is a ref
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "job",
      "title"
    );

    res.status(200).json(applications);
  } catch (err) {
    console.error("Fetch by job error:", err);
    res.status(500).json({ error: "Failed to fetch applications by job" });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete application" });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getApplicationsByJob,
  deleteApplication,
};
