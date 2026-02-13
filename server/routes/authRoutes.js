const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");
const authController = require("../controllers/authController"); // Import the authController
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
const { body, validationResult } = require('express-validator'); // Import validation tools

// Rate limiting configurations
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2, // Limit each IP to 2 registration requests per hour
  message: "Too many registration attempts from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 forgot password requests per hour
  message: "Too many password reset requests from this IP, please try again after an hour",
  standardHeaders: true,
    legacyHeaders: false,
  });
  
  // Validation middleware for registration
  const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Add more validation rules as needed
  ];
  
  // Validation middleware for login
  const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
  
  
  // =====================
  // OTP RELATED ROUTES  // =====================
router.post("/send-otp", otpController.sendOtp);
router.post("/verify-otp", otpController.verifyOtp);

// =====================
// REGISTER
// =====================
router.post("/register", registerLimiter, registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, authController.register);

// =====================
// LOGIN
// =====================
router.post("/login", loginLimiter, loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, authController.login);

// =====================
// FORGOT PASSWORD / RESET PASSWORD
// =====================
router.post("/forgot-password", forgotPasswordLimiter, authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
