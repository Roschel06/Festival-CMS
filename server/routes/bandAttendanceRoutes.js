const express = require('express');
const router = express.Router();
const bandAttendanceController = require('../controllers/bandAttendanceController');

router.patch('/:id', bandAttendanceController.attendance)
//router.patch('/:id/edit', bandAttendanceController.edit)
module.exports = router;