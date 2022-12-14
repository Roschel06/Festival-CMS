const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

router.post('/add', festivalController.add)
router.patch('/select', festivalController.select)
router.get('/list', festivalController.list)
router.get('/:id', festivalController.singlefestival)
router.patch('/edit', festivalController.edit)
router.patch('/addBands', festivalController.addBands)

module.exports = router;