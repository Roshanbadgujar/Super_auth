const gmail = require('../utils/gmail');

async function checkOTP(req, res, next) {
    const { email, otp } = req.body;
    try {
        const isValidOtp = await gmail.verifyOTP(email, otp);
        if (!isValidOtp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    checkOTP
};