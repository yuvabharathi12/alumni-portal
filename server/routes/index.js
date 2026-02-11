const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const alumniRoutes = require('./alumniRoutes');
const jobRoutes = require('./jobRoutes');
const eventRoutes = require('./eventRoutes');
const carouselRoutes = require('./carouselRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/alumni', alumniRoutes);
router.use('/jobs', jobRoutes);
router.use('/events', eventRoutes);
router.use('/carousel', carouselRoutes);

module.exports = router;