const express = require('express')
const gmailController = require('../controllers/gmail.controller')
const { checkOTP } = require('../middlewares/gmail.middleware')
const router = express.Router()


router.post('/genrateotp', gmailController.genrateOtp)
router.post('/recievedotp',checkOTP, gmailController.userFound )


module.exports = router