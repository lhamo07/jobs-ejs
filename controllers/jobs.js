const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");

  res.render("jobs", {
    jobs,
  });
};

const showNewForm = (req, res) => {
  res.render("job", {
    job: null,
  });
};
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;

    await Job.create(req.body);

    res.redirect("/jobs");
  } catch (err) {
    console.log(err);
    res.send("Error creating job: " + err.message);
  }
};
const showEditForm = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.render("job", { job });
  } catch (err) {
    console.log(err);
    res.send("Error fetching job: " + err.message);
  }
};
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.redirect("/jobs");
  } catch (err) {
    console.log(err);
    res.send("Error updating job: " + err.message);
  }
};
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.redirect("/jobs");
  } catch (err) {
    console.log(err);
    res.send("Error deleting job: " + err.message);
  }
};

module.exports = {
  getAllJobs,
  showNewForm,
  createJob,
  showEditForm,
  updateJob,
  deleteJob,
};
