const model = require('../models')
const mailer = require('../handlers/mailer');
module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param model
     * @param options
     * @returns {Promise<unknown>}
     */
    delete : (req,res,email) => {
        return new Promise((next) => {
            console.log('before  promise : '+ req.params.idpet);
            model.subscriptionrequest.destroy({
                where : {
                    nordinal: req.query.nordinal
                }
            })
                .then(function(rowDeleted) {
                    console.log('rowDeleted : '+ rowDeleted);
                    if (rowDeleted === 1) {
                        // send email to notify to the veterinary
                        let to = email;
                        let mailSubject = "VOTRE DEMANDE D'INSCRIPTION SUR VETOLIB";
                        let mailText = "Votre demande d'inscription n'a pas été acceptée. Veuillez vérifier vos informations et réessayez.";
                        mailer.sendToVeterinary(req, res, {to,mailSubject,mailText});
                        console.log('deleted');
                        res.status(200).json({message: "Deleted successfully"});
                    } else {
                        res.status(404).json({message: "record not found"})
                    }
                })
                .catch((err) => console.log(err));
        });
    },
}
