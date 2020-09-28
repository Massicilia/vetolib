const handler = require('../handlers/crudHandlers');
const mailer = require('../handlers/mailer');
const model = require('../models')
const subscriptionrequestmodel = model.subscriptionrequest;
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    getAll: (req,res) => {
        handler.getAll(req, res, subscriptionrequestmodel, {})
            .then(function (subscriptionrequestsFound) {
                if (subscriptionrequestsFound != null) {
                    return res.status(200).json(subscriptionrequestsFound);
                }
                else {
                    return res.status(404).json({'error': 'subscription requests do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the subscription requests'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    delete: (req,res) => {
        var nordinal = req.query.nordinal;
        if (nordinal == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        handler.delete(req,res,subscriptionrequestmodel,{
            where: {
                nordinal: nordinal }
        })
            .then(function () {
                // send email to notify to the veterinary
                let to = newVeterinary.email;
                let mailSubject = "VOTRE DEMANDE D'INSCRIPTION SUR VETOLIB";
                let mailText = "Votre demande d'inscription n'a pas été acceptée. Veuillez revoir vos informations.";
                mailer.sendToVeterinary(req, res, {to,mailSubject,mailText});
                return res.status(200).json('Subscription request deleted');
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to delete the subscription request'})
            })
    },

}
