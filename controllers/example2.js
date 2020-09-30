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
                if(veterinary!=null){
                    customerID = veterinary.customerID;
                    intent = stripe.setupIntents.create({
                        customer: customerID
                    })
                    return res.status(200).json(intent)
                }else{
                    return res.status(400).json({'error':'Veterinary null'})
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': err})
            })
    },
}