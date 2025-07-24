const userService = require('../services/user.service');
const imageService = require('../services/image.service')

exports.registerUser = async (req, res) => {
  const userData = req.body;
  try {
    const { accessToken, refreshToken } = await userService.registerUser(userData);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000, // 15 mins
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ message: 'User is registered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const userData = req.body;
  try {
    const { accessToken, refreshToken } = await userService.loginUser(userData);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000, // 15 mins
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ message: 'User is logged in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await userService.getUserProfile(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateUserProfile = async (req, res) => {
    const updateData = req.body
    const userId = req.user.id;
    try {
        const profileUrl = await imageService(userId, req.file)
        const result = await userService.updateUserProfile(userId, updateData, profileUrl);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const result = await userService.changePassword(userId, oldPassword, newPassword);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

exports.getAllUsers = async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;
    try {
        const users = await userService.getAllUsers(userId, userData);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required to delete account' });
  }

  try {
    const result = await userService.deleteUser(userId, password);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


exports.logoutUser = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken')

    res.status(200).json({ message: 'User logged out successfully' });
}