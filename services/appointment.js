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
   /* postAppointment: (req, res) =>
    {
        return new Promise((next) => {
            return db.appointment.create(
                {
                    reason: req.body.reason,
                    date: req.body.date,
                    veterinary_nordinal: req.body.veterinary_nordinal,
                    petowner_idpetownerappoint: req.body.petowner_idpetownerappoint,
                    pet_idpetappoint: req.body.pet_idpetappoint
                }
            )
        .then((result) => {
            console.log(result)
        })
        .catch((err) => next(err))
        })
        //NOTIFICATIONS A ENVOYER
    }, **/

    postAppointment: (req,res) =>
    {
        return new Promise((next) => {
            db.appointment.findOrCreate({
                where: {
                    reason: req.body.reason,
                    date: req.body.date,
                    veterinary_nordinal: req.body.veterinary_nordinal,
                    petowner_idpetownerappoint: req.body.petowner_idpetownerappoint,
                    pet_idpetappoint: req.body.pet_idpetappoint
                }

            })
            .then(([newResult, created]) => {
                console.log('IsNewRecord: ' + newResult.isNewRecord);
                console.log('created: ' + created);
                if (created) {
                    return res.status(200).json({
                        status: 200,
                        message: "Succesfully Appointment Created"
                    });
                }else {
                    return res.status(400).json({
                        status: 400,
                        message: "Veterinary not available"
                    });
                }
            })
            .catch((err) => next(err))
            })
            //NOTIFICATIONS A ENVOYER
    }
}

/**
var express = require('express');
var router = express.Router();
const db = require('../models');


router.get('/', function(req, res, next) {
    db.appointment.findAll().then(appointment => {
        res.send(appointment);
    })
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
*/
/**
 * @POST /appointment/
 */
/**
router.post('/', function(req, res, next) {
    const {
        reason,
        date,
        veterinary_nordinal,
        petowner_idpetownerappoint,
        pet_idpetappoint
    } = req.body;

    db.appointment.create({
        reason: reason,
        date: date,
        veterinary_nordinal: veterinary_nordinal,
        petowner_idpetownerappoint: petowner_idpetownerappoint,
        pet_idpetappoint: pet_idpetappoint
    })
        .then(veterinary => res.status(201).json({
            error: false,
            data: appointment,
            message: 'New appointment created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
module.exports = router;
*/