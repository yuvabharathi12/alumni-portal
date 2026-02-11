const AlumniProfile = require("../models/AlumniProfile");
const Event = require("../models/Event");
const Job = require("../models/Job");
const User = require("../models/User"); // Assuming 'User' model holds information for alumni/mentors

// Get total count of Alumni
exports.getAlumniCount = async (req, res) => {
  try {
    const count = await AlumniProfile.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get total count of Events
exports.getEventCount = async (req, res) => {
  try {
    const count = await Event.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get total count of Jobs
exports.getJobCount = async (req, res) => {
  try {
    const count = await Job.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get total count of Users (e.g., for mentors/companies, assuming all users can be counted for a general "community" stat)
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
