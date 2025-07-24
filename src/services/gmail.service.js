const userModel = require('../models/user.model')
const jwt = require('../utils/jwt')
const gmail = require('../utils/gmail')


exports.getUser = async (userData) => {
    try {
        if (!userData.email){
            throw new Error("user not Found");
        }
        const user = await userModel.findOne({
            email : userData.email
        })

        if(!user) {
            throw new Error("user is does not exists")
        }

        gmail.createOTPAndSendOnGoogle(user.email)

        return {
           message : 'otp are genrated and send on gmail'
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.userFound = async (userData) => {
    try { 
        if(!userData.email){
            throw new Error('user not found')
        }
        const user = await userModel.findOne({
            email : userData.email
        })
        const token = jwt.generateToken(user._id)
        return{
            token : token
        }
    } catch (error){
        throw new Error(error.message);
    }
}