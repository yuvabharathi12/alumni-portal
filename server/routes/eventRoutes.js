const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { createEvent, getEvents } = require("../controllers/eventController");
const Event = require("../models/Event");

router.post("/", auth, createEvent);   // admin
router.get("/", auth, getEvents);      // all users

// DELETE event (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

module.exports = router;