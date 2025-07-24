const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const multer = require('multer')
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userMiddleware.protect, userController.getUserProfile);
router.put('/profile', upload.single("file"), userMiddleware.protect, userController.updateUserProfile);
router.delete('/profile', userMiddleware.protect, userController.deleteUser);
router.post('/changePassword', userMiddleware.protect, userController.changePassword)
router.get('/users', userMiddleware.protect, userController.getAllUsers);
router.get('/logout', userController.logoutUser);

module.exports = router;
