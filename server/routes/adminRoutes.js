const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Get pending users
router.get("/pending-users", auth, admin, async (req, res) => {
  const users = await User.find({ status: "pending" }).select("-password");
  res.json(users);
});

// Approve user
router.put("/approve/:id", auth, admin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "User approved" });
});

// Block user
router.put("/block/:id", auth, admin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
  res.json({ message: "User blocked" });
});

// Bulk Upload Users
router.post("/bulk-upload", auth, admin, async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "No users provided" });
    }

    const results = {
      success: [],
      failed: [],
    };

    for (const userData of users) {
      try {
        const { name, email, password, role = "alumni" } = userData;

        // Validate required fields
        if (!name || !email || !password) {
          results.failed.push({
            email,
            reason: "Missing required fields (name, email, password)",
          });
          continue;
        }

        // Check if email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
          results.failed.push({
            email,
            reason: "Email already exists",
          });
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role,
          status: "approved", // Bulk uploaded users are auto-approved
        });

        await user.save();
        results.success.push({ email, name });
      } catch (err) {
        results.failed.push({
          email: userData.email,
          reason: err.message,
        });
      }
    }

    res.status(201).json({
      message: "Bulk upload completed",
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during bulk upload" });
  }
});

module.exports = router;
