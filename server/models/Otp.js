const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Only one OTP per email at a time
    },
    otpHash: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    attempts: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m', // MongoDB TTL index to automatically delete documents after 10 minutes
    },
});

module.exports = mongoose.model('Otp', otpSchema);
