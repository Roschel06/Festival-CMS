const express = require('express');
const router = express.Router();
const bandController = require('../controllers/bandController');

router.post('/add', bandController.add)

module.exports = router;