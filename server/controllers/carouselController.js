const CarouselImage = require("../models/CarouselImage");

// Get all active images
exports.getImages = async (req, res) => {
  try {
    const images = await CarouselImage.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new image (admin only)
exports.addImage = async (req, res) => {
  try {
    const { title, imageUrl, description, order } = req.body;

    const image = new CarouselImage({
      title,
      imageUrl,
      description,
      order: order || 0,
    });

    await image.save();
    res.status(201).json({ message: "Image added", image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete image (admin only)
exports.deleteImage = async (req, res) => {
  try {
    await CarouselImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update image status
exports.updateImage = async (req, res) => {
  try {
    const { isActive, order } = req.body;
    const image = await CarouselImage.findByIdAndUpdate(
      req.params.id,
      { isActive, order },
      { new: true }
    );
    res.json({ message: "Image updated", image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};