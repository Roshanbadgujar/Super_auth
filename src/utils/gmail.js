const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Otp = require('../models/gmail.model');

const OTP_EXPIRY_MINUTES = process.env.OTP_SECRET;

exports.createOTPAndSendOnGoogle = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10;
    const otpHash = await bcrypt.hash(otp, saltRounds);

    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otpHash, expiresAt });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Cohort Auth Team" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Cohort Verification: Your One-Time Password (OTP)',
        text: `Dear User,

Thank you for choosing Cohort, a trusted leader in secure authentication solutions.

Your One-Time Password (OTP) for account verification is: ${otp}

This OTP is valid for ${OTP_EXPIRY_MINUTES} minutes and is required to complete your secure login or registration process.

If you did not request this OTP, please ignore this email or contact our support team immediately.

Best regards,
Cohort Security Team
`
    };

    await transporter.sendMail(mailOptions);

    return true; // Never return OTP
};

exports.verifyOTP = async (email, otp) => {
    const record = await Otp.findOne({ email });
    if (!record) throw new Error('OTP not found or expired. Please request a new one.');

    if (new Date() > record.expiresAt) {
        await Otp.deleteOne({ _id: record._id });
        throw new Error('OTP expired. Please request a new one.');
    }

    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) throw new Error('Invalid OTP.');

    // Delete OTP after successful use (optional)
    await Otp.deleteOne({ _id: record._id });

    return true;
};
