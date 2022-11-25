const express = require('express');
const router = express.Router();
const {advancedUpload} = require('../config/multer')
const userController = require('../controllers/userController');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.patch('/profile', advancedUpload.single('image'), userController.profile)
module.exports = router;