exports.submitApplication = async (req, res) => {
  try {
    console.log("▶ Request body:", req.body);
    console.log("▶ Request files:", req.files);

    const {
      firstName,
      lastName,
      email,
      phone,
      interestReason,
      source,
      experience,
      noticePeriod,
      jobId,
    } = req.body;

    const resume = req.files?.resume?.[0]?.filename || null;
    const portfolio = req.files?.portfolio?.[0]?.filename || null;

    if (!firstName || !email || !resume) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      interestReason,
      source,
      experience,
      noticePeriod,
      jobId,
      resume,
      portfolio,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("❌ Application Submission Error:", error);
    res.status(500).json({ error: "Submission failed", details: error.message });
  }
};
