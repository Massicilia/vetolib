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
        console.log('create function');
        var reason = req.body.reason;
        var date = req.body.date;
        var veterinary_nordinal = req.body.veterinary_nordinal;
        var petowner_idpetownerappoint = req.body.petowner_idpetownerappoint;
        var pet_idpetappoint = req.body.pet_idpetappoint;

        //verifier si les parametres sont non nuls
        if (reason == null || date == null || veterinary_nordinal == null || petowner_idpetownerappoint == null || pet_idpetappoint == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }
        if(Number.isInteger(veterinary_nordinal) && Number.isInteger(petowner_idpetownerappoint) && Number.isInteger(pet_idpetappoint)){
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
        }else{
            res.status(504).json({'error': 'not valide parameters'});
        }

    },
}