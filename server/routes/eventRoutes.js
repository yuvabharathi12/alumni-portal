const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createEvent, getEvents } = require("../controllers/eventController");

router.post("/", auth, createEvent);   // admin
router.get("/", auth, getEvents);       // all users

module.exports = router;
