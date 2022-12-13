const express = require('express');
const router = express.Router();
const {cloudinaryUpload} = require('../config/multer-cloudinary')
const bandController = require('../controllers/bandController');

router.post('/add', cloudinaryUpload.single('image'), bandController.add)
router.patch('/addToFestival', bandController.addToFestival)
router.get('/list', bandController.list)
router.get('/:id', bandController.singleband)
router.patch('/:id/edit', cloudinaryUpload.single('image'), bandController.edit)
router.delete('/:id/delete', bandController.delete)
module.exports = router;