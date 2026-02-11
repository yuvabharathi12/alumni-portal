const jwt = require('jsonwebtoken');
const { generateOtp, hashOtp, saveOtp, verifyOtp } = require('../utils/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const User = require('../models/User'); // To check if email exists (but not reveal)

const OTP_VERIFICATION_TOKEN_SECRET = process.env.OTP_VERIFICATION_TOKEN_SECRET || 'otpverificationsecret';

exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        // Do not reveal if email exists in User database
        // However, we can check if a user with this email is already registered and approved
        // This prevents creating multiple OTPs for an already approved user
        const existingUser = await User.findOne({ email, status: 'approved' });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered and approved.' });
        }

        const otp = generateOtp();
        const otpHash = await hashOtp(otp);
        await saveOtp(email, otpHash);
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error in sendOtp:', error);
        res.status(500).json({ message: 'Server error. Failed to send OTP.' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        const result = await verifyOtp(email, otp);

        if (result.success) {
            // Generate a short-lived token for successful email verification
            const emailVerifiedToken = jwt.sign(
                { email, verified: true },
                OTP_VERIFICATION_TOKEN_SECRET,
                { expiresIn: '10m' } // Token valid for 10 minutes for registration
            );
            res.status(200).json({ message: result.message, emailVerifiedToken });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ message: 'Server error. Failed to verify OTP.' });
    }
};
