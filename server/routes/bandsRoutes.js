const express = require('express');
const router = express.Router();
const bandController = require('../controllers/bandController');

router.post('/add', bandController.add)
router.get('/list', bandController.list)
router.get('/band', bandController.band)
module.exports = router;