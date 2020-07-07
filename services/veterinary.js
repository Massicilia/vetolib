var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {

}

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
}
module.exports = {
    isAvailable: (nordinal, date) =>
    {
        return new Promise((next) => {
            return db.veterinary.getB
            create(
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
/* ///////////////////////////////
var express = require('express');
var router = express.Router();
const db = require('../models');
/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
/*
router.get('/', function(req, res, next) {
  db.veterinary.findAll().then(veterinary => {
    res.send(veterinary);
  })
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});**/

/**
 * @POST /veterinary/

 router.post('/', function(req, res, next) {
  const {
    nordinal,
    name,
    surname,
    adress,
    email,
    phonenum,
    clinic_nsiret,
    username,
    password
  } = req.body;

  db.veterinary.create({
    nordinal: nordinal,
    name: name,
    surname: surname,
    adress: adress,
    email: email,
    phonenum: phonenum,
    clinic_nsiret: clinic_nsiret,
    username: username,
    password: password
  })
  .then(veterinary => res.status(201).json({
    error: false,
    data: veterinary,
    message: 'New veterinary created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});*/
module.exports = router;
