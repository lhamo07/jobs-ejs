const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  showNewForm,

  showEditForm,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/new").get(showNewForm);
router.route("/edit/:id").get(showEditForm);
router.route("/update/:id").post(updateJob);
router.route("/delete/:id").post(deleteJob);

module.exports = router;
