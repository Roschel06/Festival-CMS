const express = require('express');
const router = express.Router();

const {auth} = require('../middlewares/auth')
const {advancedUpload} = require('../config/multer')
const userController = require('../controllers/userController');

router.post('/register', userController.register)
router.post('/emailconfirm', userController.emailConfirm)
router.post('/login', userController.login)
router.post('/forgot-password', userController.forgotPassword)
router.post('/change-password', userController.changePassword)
router.get('/logout', auth, userController.logout)
router.patch('/profile', auth, advancedUpload.single('image'), userController.profile)
module.exports = router;