var express = require('express');
var router = express.Router();

var AppointmentController = require('../controllers/appointment')

router.route('/')
    .post(AppointmentController.create)

router.route('/details')
    .get(AppointmentController.get)

router.route('/agenda/veterinary')
    .get(AppointmentController.getByVeterinary)

 router.route('/agenda/petowner')
    .get(AppointmentController.getByPetowner)

module.exports = router;