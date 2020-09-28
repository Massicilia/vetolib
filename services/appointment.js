const mailer = require('../handlers/mailer');
const db = require('../models');

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<unknown>}
     */
    create : (req,res) => {
        return new Promise((next) => {
            var newAppointment = db.appointment.create(
                {
                    reason: req.body.reason,
                    date: req.body.date,
                    veterinary_nordinal: req.body.veterinary_nordinal,
                    petowner_idpetownerappoint: req.body.petowner_idpetownerappoint,
                    pet_idpetappoint: req.body.pet_idpetappoint
                })
                .then(function(newAppointment) {
                    // send email to notify to the petowner
                    let to = newAppointment.petowner_idpetownerappoint;
                    let mailSubject = "VETOLIB : Prise de rendez-vous "
                    let mailText = "Vous avez pris rendez-vous chez Vetolib le "+newAppointment.date;
                    mailer.sendToPetowner(req, res, {to,mailSubject,mailText});
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
                    return res.status(500).json({'error': 'Can not add a new appointment'})
                })
        })
    }
}