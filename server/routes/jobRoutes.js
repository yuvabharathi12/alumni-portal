const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { createJob, getJobs } = require("../controllers/jobController");
const Job = require("../models/Job");

router.post("/", auth, createJob);   // Alumni
router.get("/", getJobs);            // public access

// DELETE job (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete job" });
  }
});

module.exports = router;
