const db = require('../models');
const mailer = require('../handlers/mailer');

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param bcryptedPassword
     * @returns {Promise<unknown>}
     */
    create : (req,res,bcryptedPassword) => {
        return new Promise((next) => {
             var newPetowner = db.petowner.create(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    adress: req.body.adress,
                    email: req.body.email,
                    phonenum: req.body.phonenum,
                    username: req.body.username,
                    password: bcryptedPassword,
                })
                .then(function(newPetowner) {
                    // send email to notify to the petowner
                    let to = newPetowner.idpetowner;
                    let mailSubject = "VOTRE INSCRIPTION SUR VETOLIB ";
                    let mailText = "Bienvenue sur Vetolib ! ";
                    mailer.sendToPetowner(req, res, {to,mailSubject,mailText});
                    return res.status(201).json({
                        'idpetowner': newPetowner.idpetowner
                    })
                })
                .catch(function(err){
                    return res.status(500).json({'error': 'Can not add a new petowner'})
                })
        })
    }
}