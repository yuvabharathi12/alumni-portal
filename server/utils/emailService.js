const sendEmail = require('./sendEmail');

const sendOtpEmail = async (email, otp) => {
    const subject = 'Your OTP for Alumni Portal Registration';
    const message = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hello!</h2>
            <p>Your One-Time Password (OTP) for Alumni Portal registration is:</p>
            <p style="font-size: 24px; font-weight: bold; color: #0056b3;">${otp}</p>
            <p>This OTP is valid for ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.</p>
            <p>Please do not share this OTP with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Regards,</p>
            <p>Alumni Portal Team</p>
        </div>
    `;

    try {
        await sendEmail({
            email,
            subject,
            message,
        });
        console.log(`OTP sent to ${email}`);
        return { success: true, message: 'OTP sent successfully.' };
    } catch (error) {
        console.error(`Error sending OTP to ${email}:`, error);
        return { success: false, message: 'Failed to send OTP email.' };
    }
};

module.exports = {
    sendOtpEmail,
};
