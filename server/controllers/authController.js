const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const otpController = require("./otpController"); // Still needed for OTP verification during registration, if that logic isn't moved
const crypto = require("crypto"); // For generating reset tokens
const sendEmail = require("../utils/sendEmail"); // Reusing existing email utility for reset emails

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role, emailVerifiedToken } = req.body;
  const OTP_VERIFICATION_TOKEN_SECRET = process.env.OTP_VERIFICATION_TOKEN_SECRET || 'otpverificationsecret';

  try {
    if (!emailVerifiedToken) {
      return res.status(400).json({ message: "Email verification token is missing. Please verify your email first." });
    }

    let decoded;
    try {
      decoded = jwt.verify(emailVerifiedToken, OTP_VERIFICATION_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired email verification token." });
    }

    if (decoded.email !== email || !decoded.verified) {
      return res.status(401).json({ message: "Email verification mismatch or not verified." });
    }

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status: "pending",
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful. Waiting admin approval.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.status !== "approved")
      return res.status(403).json({
        message: "Account not approved yet. Please wait for admin approval.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash the token for storage
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // Frontend reset password URL
    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease go to the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message,
      });
      res.status(200).json({ message: "A password reset link has been sent." });
    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      console.error('Error sending reset email:', emailError);
      return res.status(500).json({ message: "Error sending password reset email." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash the incoming token to compare with the stored hashed token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Token must not be expired
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};