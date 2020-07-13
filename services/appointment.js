var express = require('express');
var router = express.Router();
const db = require('../models');

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