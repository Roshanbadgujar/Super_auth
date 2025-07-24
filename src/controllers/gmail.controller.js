const gmailService = require('../services/gmail.service');
const gmail = require('../utils/gmail')


exports.genrateOtp = async (req, res) => {
    try {
        const userData = req.body;
        const user = await gmailService.getUser(userData);

        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        res.status(200).json({
            message: 'otp are genrated and send on gmail'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.userFound = async (req, res) => {
    try {
        const userData = req.body;
        const result = await gmailService.userFound(userData);
        if (result.token) {
            res.cookie('token', result.token, { httpOnly: true });
        }
        res.status(201).json({
            message: 'user is founded'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}