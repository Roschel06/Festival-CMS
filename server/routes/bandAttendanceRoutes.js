const express = require('express');
const router = express.Router();
const bandAttendanceController = require('../controllers/bandAttendanceController');

router.patch('/add', bandAttendanceController.add)
router.patch('/:id', bandAttendanceController.singleAttendance)
//router.patch('/:id/edit', bandAttendanceController.edit)
module.exports = router;