const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createJob, getJobs } = require("../controllers/jobController");

router.post("/", auth, createJob);   // Alumni
router.get("/", auth, getJobs);      // All users

module.exports = router;
