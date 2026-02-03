const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

/* ================================
   GET ALL USERS (ADMIN)
   ================================ */
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ================================
   GET PENDING USERS
   ================================ */
router.get("/pending-users", auth, admin, async (req, res) => {
  const users = await User.find({ status: "pending" }).select("-password");
  res.json(users);
});

/* ================================
   APPROVE USER
   ================================ */
router.put("/approve/:id", auth, admin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "User approved" });
});

/* ================================
   BLOCK USER
   ================================ */
router.put("/block/:id", auth, admin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
  res.json({ message: "User blocked" });
});

/* ================================
   DELETE USER (ADMIN ONLY)
   ================================ */
router.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

/* ================================
   BULK UPLOAD USERS
   ================================ */
router.post("/bulk-upload", auth, admin, async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "No users provided" });
    }

    const results = { success: [], failed: [] };

    for (const userData of users) {
      try {
        const { name, email, password, role = "alumni" } = userData;

        if (!name || !email || !password) {
          results.failed.push({
            email,
            reason: "Missing required fields",
          });
          continue;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          results.failed.push({
            email,
            reason: "Email already exists",
          });
          continue;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          name,
          email,
          password: hashedPassword,
          role,
          status: "approved",
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
