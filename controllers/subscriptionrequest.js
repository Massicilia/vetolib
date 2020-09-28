const handler = require('../handlers/crudHandlers');
const mailer = require('../handlers/mailer');
const model = require('../models')
const subscriptionrequestmodel = model.subscriptionrequest;
const subscriptionrequestService = require('../services/subscriptionrequest');
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
        handler.getOne({
            where: {
                nordinal: req.query.nordinal
            }
        }, subscriptionrequestmodel)
            .then(function (subscriptionrequestFound) {
                subscriptionrequestService.delete(req,res,subscriptionrequestFound.email);
            })
            .catch(function (err) {
                res.status(505).json({message: "Subscription request not found"});
            })
    },

}
