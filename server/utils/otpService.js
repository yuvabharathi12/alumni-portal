const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Otp = require('../models/Otp');

const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES || 5; // Default to 5 minutes
const MAX_OTP_ATTEMPTS = process.env.MAX_OTP_ATTEMPTS || 3; // Default to 3 attempts

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const hashOtp = async (otp) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(otp, salt);
};

const saveOtp = async (email, otpHash) => {
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    let otpRecord = await Otp.findOne({ email });

    if (otpRecord) {
        otpRecord.otpHash = otpHash;
        otpRecord.expiresAt = expiresAt;
        otpRecord.attempts = 0; // Reset attempts on new OTP request
        await otpRecord.save();
    } else {
        otpRecord = new Otp({
            email,
            otpHash,
            expiresAt,
        });
        await otpRecord.save();
    }
};

const verifyOtp = async (email, otp) => {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
        return { success: false, message: 'OTP not found or expired.' };
    }

    if (otpRecord.expiresAt < new Date()) {
        await Otp.deleteOne({ email }); // Delete expired OTP
        return { success: false, message: 'OTP expired.' };
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
        await Otp.deleteOne({ email }); // Prevent brute force
        return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);
    otpRecord.attempts += 1;
    await otpRecord.save();

    if (isMatch) {
        await Otp.deleteOne({ email }); // Delete OTP after successful verification
        return { success: true, message: 'OTP verified successfully.' };
    } else {
        return { success: false, message: 'Invalid OTP.' };
    }
};

module.exports = {
    generateOtp,
    hashOtp,
    saveOtp,
    verifyOtp,
};
