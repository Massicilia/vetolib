var express = require('express');
var router = express.Router();

var AppointmentController = require('../controllers/appointment')
console.log('appointment route');
router.route('/')
    .post(AppointmentController.create)


module.exports = router;