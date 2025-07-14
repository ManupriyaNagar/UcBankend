const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const { title, description } = req.body;
  const job = new Job({ title, description });
  await job.save();
  res.status(201).json(job);
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
};
