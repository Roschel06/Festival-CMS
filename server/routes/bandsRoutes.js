const express = require('express');
const router = express.Router();
const {cloudinaryUpload} = require('../config/multer-cloudinary')
const bandController = require('../controllers/bandController');

router.post('/add', cloudinaryUpload.single('image'), bandController.add)
router.post('/addToFestival', bandController.addToFestival)
router.get('/list', bandController.list)
router.get('/band/:id', bandController.band)
router.patch('/band/:id/edit', bandController.edit)
module.exports = router;