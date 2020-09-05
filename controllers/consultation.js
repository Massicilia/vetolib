var handler = require('../handlers/crudHandlers');
var model = require('../models')
var consultationmodel = model.consultation;
module.exports = {

    getAll: (req,res) => {
        handler.getAll(req, res, consultationmodel, {})
            .then(function (consultationsFound) {
                if (consultationsFound != null) {
                    return res.status(200).json(consultationsFound);
                }
                else {
                    return res.status(404).json({'error': 'consultations do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the consultations'})
            })
    },
}
