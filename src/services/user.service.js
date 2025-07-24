const userModel = require('../models/user.model');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt');

exports.registerUser = async (userData) => {
  try {
    const { email, password, username } = userData;

    if (!email || !password || !username) {
      throw new Error('Missing required fields: email, password, username');
    }

    if (await userModel.findOne({ email })) {
      throw new Error('Email already exists');
    }

    if (await userModel.findOne({ username })) {
      throw new Error('Username already exists');
    }

    const newUser = await userModel.create({
      email,
      password,
      username,
    });

    const payload = { id: newUser._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = async (userData) => {
  try {
    const { email, password } = userData;

    if (!email || !password) {
      throw new Error('Missing required fields: email, password');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const payload = { id: user._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.getUserProfile = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            message: 'User profile retrieved successfully',
            user: {
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUserProfile =async (userId, updateData, profilePicture) => {
    try {
        console.log(profilePicture.url , updateData.username, userId)
        const user = await userModel.findByIdAndUpdate(
            {
                _id : userId
            },
            {
                username : updateData.username,
                profilePicture : profilePicture.url
            },
            {
                new: true   
            }
        )
        return {
            message: 'User profile updated successfully',
            user: {
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.changePassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!await user.comparePassword(oldPassword)) {
            throw new Error('Old password is incorrect');
        }
        user.password = newPassword;
        await user.save();
        return { message: 'Password changed successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllUsers = async (userId, userData) => {
    try {
        if (!await userModel.findById(userId)) {
            throw new Error('User not found');
        }
        const users = await userModel.find({
            email: userData.email,
            username: userData.username
        });
        return {
            message: 'Users retrieved successfully',
            users: users.map(user => ( {
                email: user.email,
                username: user.username,
            }))
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteUser = async (userId, password) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    await userModel.findByIdAndDelete(userId);
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};
