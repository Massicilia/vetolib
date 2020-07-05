var express = require('express');
var router = express.Router();

var AppointmentController = require('../controllers/appointment')

router.route('/')
    //.get(AppointmentController.getAppointments())
    .post(AppointmentController.create)


module.exports = router;