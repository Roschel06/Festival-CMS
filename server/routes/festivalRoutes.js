const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

router.post('/add', festivalController.add)
router.get('/list', festivalController.list)

module.exports = router;