const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  interestReason: String,
  source: String,
  experience: String,
  noticePeriod: String,
  resume: String,
  portfolio: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
