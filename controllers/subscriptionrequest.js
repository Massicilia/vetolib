var handler = require('../handlers/crudHandlers');
var model = require('../models')
var subscriptionrequestmodel = model.subscriptionrequest;
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
                return res.status(200).json('Subscription request deleted');
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to delete the subscription request'})
            })
    },
}
