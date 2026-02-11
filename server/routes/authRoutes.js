const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");
const authController = require("../controllers/authController"); // Import the authController

// =====================
// OTP RELATED ROUTES
// =====================
router.post("/send-otp", otpController.sendOtp);
router.post("/verify-otp", otpController.verifyOtp);

// =====================
// REGISTER
// =====================
router.post("/register", authController.register);

// =====================
// LOGIN
// =====================
router.post("/login", authController.login);

// =====================
// FORGOT PASSWORD / RESET PASSWORD
// =====================
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
