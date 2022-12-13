const express = require('express');
const router = express.Router();
const bandAttendanceController = require('../controllers/bandAttendanceController');

router.post('/add', bandAttendanceController.add)
router.get('/list/:owner', bandAttendanceController.list)
router.get('/:id', bandAttendanceController.singleAttendance)
//router.patch('/:id/edit', bandAttendanceController.edit)
module.exports = router;