const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createOrUpdateProfile,
  getMyProfile,
  getAllProfiles,
  getProfileById,
} = require("../controllers/alumniController");

// Create or Update Profile (Alumni only)
router.post("/profile", auth, createOrUpdateProfile);
router.put("/profile", auth, createOrUpdateProfile);

// Get Own Profile (Alumni only)
router.get("/profile/me", auth, getMyProfile);

// Get All Profiles (Directory - anyone authenticated)
router.get("/profiles", auth, getAllProfiles);

// Get Single Profile by ID
router.get("/profile/:id", auth, getProfileById);

module.exports = router;