const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const otpController = require("./otpController"); // Still needed for OTP verification during registration, if that logic isn't moved
const crypto = require("crypto"); // For generating reset tokens
const sendEmail = require("../utils/sendEmail"); // Reusing existing email utility for reset emails

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role, emailVerifiedToken } = req.body;
  const otpVerificationSecret = process.env.OTP_VERIFICATION_TOKEN_SECRET;
if (!otpVerificationSecret) {
  throw new Error("OTP_VERIFICATION_TOKEN_SECRET is not defined in environment variables.");
}

  try {
    if (!emailVerifiedToken) {
      return res.status(400).json({ message: "Email verification token is missing. Please verify your email first." });
    }

    let decoded;
    try {
      decoded = jwt.verify(emailVerifiedToken, otpVerificationSecret);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired email verification token." });
    }

    if (decoded.email !== email || !decoded.verified) {
      return res.status(401).json({ message: "Email verification mismatch or not verified." });
    }

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email already exists" });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    console.error(`Registration Error: ${err.message}`);
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

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRATION_TIME || "1h" }
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
    console.error(`Login Error: ${err.message}`);
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
    const resetUrlBase = `http://localhost:3000/reset-password`; // Frontend reset password URL (generic)
    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease go to the following link: ${resetUrlBase}\\n\\nYour password reset token is: ${resetToken}\\n\\nPlease enter this token on the page to reset your password. This token is valid for 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

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
            console.error(`Forgot Password (Email) Error: ${emailError.message}`);
                  return res.status(500).json({ message: "Error sending password reset email." });
                }
              } catch (err) {
                console.error(`Forgot Password (Main) Error: ${err.message}`);
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

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
    user.password = await bcrypt.hash(password, saltRounds);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(`Reset Password Error: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};