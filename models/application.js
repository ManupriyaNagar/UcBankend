const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // <-- must match Job model name
    },
    resume: String,
    portfolio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
