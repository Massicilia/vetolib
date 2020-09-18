var handler = require('../handlers/crudHandlers');
var model = require('../models')
var subscriptionrequestmodel = model.subscriptionrequest;
module.exports = {

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
}
