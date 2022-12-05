const express = require('express');
const router = express.Router();
const {cloudinaryUpload} = require('../config/multer-cloudinary')
const bandController = require('../controllers/bandController');

router.post('/add', cloudinaryUpload.single('image'), bandController.add)
router.get('/list', bandController.list)
router.get('/band', bandController.band)
module.exports = router;