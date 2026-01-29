const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getImages,
  addImage,
  deleteImage,
  updateImage,
} = require("../controllers/carouselController");

// Public route - get all active images
router.get("/images", getImages);

// Admin only routes
router.post("/images", auth, addImage);
router.delete("/images/:id", auth, deleteImage);
router.put("/images/:id", auth, updateImage);

module.exports = router;