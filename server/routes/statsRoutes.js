const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// @route   GET /api/stats/alumni
// @desc    Get total count of alumni
// @access  Public
router.get("/alumni", statsController.getAlumniCount);

// @route   GET /api/stats/events
// @desc    Get total count of events
// @access  Public
router.get("/events", statsController.getEventCount);

// @route   GET /api/stats/jobs
// @desc    Get total count of jobs
// @access  Public
router.get("/jobs", statsController.getJobCount);

// @route   GET /api/stats/users
// @desc    Get total count of users
// @access  Public
router.get("/users", statsController.getUserCount);

module.exports = router;
