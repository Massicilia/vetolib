const handler = require('../handlers/crudHandlers');
const model = require('../models');
const veterinarymodel = model.veterinary;
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');
module.exports = {

    createSetupIntent2: (req, res) => {
        var nordinal = req.body.veterinary_nordinal;
        handler.getOne({
            where: {
                nordinal: nordinal
            }
        }, veterinarymodel)
            .then(function (veterinary) {
                intent = stripe.setupIntents.create({
                    customer: veterinary.customerID
                })
                return res.status(200).json(intent)

            })
            .catch(function (err) {
                return res.status(500).json({'error': err})
            })
    },
}