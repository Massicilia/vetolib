const moment= require('moment')
var AppointmentService = require('../services/appointment');
var handler = require('../handlers/crudHandlers');
var model = require('../models');
var appointmentmodel = model.appointment;

module.exports = {
    /**
     * 
     * @param req
     * @param res
     * @returns {any}
     */
    create: function (req, res) {
        var reason = req.body.reason;
        var date = req.body.date;
        var veterinary_nordinal = req.body.veterinary_nordinal;
        var petowner_idpetownerappoint = req.body.petowner_idpetownerappoint;
        var pet_idpetappoint = req.body.pet_idpetappoint;


        //verifier si les parametres sont non nuls
        if (reason == null || date == null || veterinary_nordinal == null || petowner_idpetownerappoint == null ) {
            return res.status(400).json({'error': 'missing or invalide parameters'});
        }
        handler.getOne({
            where: {
                date: date,
                veterinary_nordinal: veterinary_nordinal
            }
        }, appointmentmodel)
            .then(function (appointmentFound) {
                console.log('appointmentFound : ' + appointmentFound);
                if (appointmentFound == null) {
                    console.log('appointmentFound if : ' + appointmentFound);
                    AppointmentService.create(req,res)
                } else {
                    console.log('appointmentFound else : ' + appointmentFound);
                    return res.status(400).json({
                        status: 400,
                        message: "Veterinary not available"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to add an appointment'})
            })

    },
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    get: (req, res, next) => {
        var idappointment = req.query.idappointment;
        if (idappointment == null && idappointment.isInteger()) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(idappointment, appointmentmodel)
            .then(function (appointmentFound) {
                if (appointmentFound != null) {
                    return res.status(200).json({
                        'idappointment': appointmentFound.idappointment,
                        'reason': appointmentFound.reason,
                        'date': appointmentFound.date,
                        'veterinary_nordinal': appointmentFound.veterinary_nordinal,
                        'petowner_idpetownerappoint': appointmentFound.petowner_idpetownerappoint,
                        'pet_idpetappoint': appointmentFound.pet_idpetappoint
                    });
                }
                else {
                    return res.status(404).json({'error': 'appointment does not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the appointment'})
            })
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    getByVeterinary: (req,res) => {
        var veterinary_nordinal = req.query.veterinary_nordinal;
        if (veterinary_nordinal == null && !Number.isInteger(veterinary_nordinal)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getAll(req, res, appointmentmodel, {
            where: {
                veterinary_nordinal: veterinary_nordinal }
        })
            .then(function (appointmentsFound) {
                if (appointmentsFound != null) {
                    return res.status(200).json(appointmentsFound);
                }
                else {
                    return res.status(404).json({'error': 'appointments do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the appointments'})
            })
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    getByPetowner: (req,res,next) => {
        console.log('controller');
        var petowner_idpetownerappoint = req.query.petowner_idpetownerappoint;
        if (petowner_idpetownerappoint == null && !Number.isInteger(petowner_idpetownerappoint)) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        console.log('controller step 1');

        handler.getAll(req, res, appointmentmodel, {
            where: {
                petowner_idpetownerappoint: petowner_idpetownerappoint }
        })
            .then(function (appointmentsFound) {
                console.log('controller step 2');
                if (appointmentsFound != null) {
                    return res.status(200).json(appointmentsFound);
                }
                else {
                    return res.status(404).json({'error': 'appointments do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the appointments'})
            })
    },
}