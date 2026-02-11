const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporterConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // Ensure this is a boolean
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // This should ideally be handled more securely in production
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  };

  // Log transporter configuration for debugging (without exposing password)
  console.log('Nodemailer Transporter Config:', {
    host: transporterConfig.host,
    port: transporterConfig.port,
    secure: transporterConfig.secure,
    user: transporterConfig.auth.user,
  });

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Only if using ethereal
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SMTP response:', error.response);
    }
    throw new Error('Failed to send email: ' + error.message);
  }
};

module.exports = sendEmail;