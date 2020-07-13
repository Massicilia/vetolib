var express = require('express');
var router = express.Router();
const db = require('../models');

/**exports.getAppointments = async function (query) {
    try {
        var appointments = await db.appointment.findAll(query)
        return appointments;
    } catch (e) {
        throw Error('Error while finding Appointments')
    }
}
exports.postAppointment = async function (req, res, options) {
    try {
        var appointment = await db.appointment.create(
            {
                reason: req.body.reason,
                date: req.body.date,
                veterinary_nordinal: req.body.veterinary_nordinal,
                petowner_idpetownerappoint: req.body.petowner_idpetownerappoint,
                pet_idpetappoint: req.body.pet_idpetappoint
            }
        )
        return appointment;
    } catch (e) {
        throw Error('Error while creating an Appointment')
    }
}*/
module.exports = {


    create : (req,res) => {
        return new Promise((next) => {
            console.log('service appointment');
            var newAppointment = db.appointment.create(
                {
                    reason: req.body.reason,
                    date: req.body.date,
                    veterinary_nordinal: req.body.veterinary_nordinal,
                    petowner_idpetownerappoint: req.body.petowner_idpetownerappoint,
                    pet_idpetappoint: req.body.pet_idpetappoint
                })
                .then(function(newAppointment) {
                    console.log('service appointment then');
                    return res.status(201).json({
                        'idappointment': newAppointment.idappointment,
                        'reason': newAppointment.reason,
                        'date': newAppointment.date,
                        'veterinary_nordinal': newAppointment.veterinary_nordinal,
                        'petowner_idpetownerappoint': newAppointment.petowner_idpetownerappoint,
                        'pet_idpetappoint': newAppointment.pet_idpetappoint
                    })
                })
                .catch(function(err){
                    console.log('service appointment then' + err);
                    return res.status(500).json({'error': 'Can not add a new appointment'})
                })
        })
    }
}