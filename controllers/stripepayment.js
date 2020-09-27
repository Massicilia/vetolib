// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');//process.env.STRIPE_SECRET_KEY
const handler = require('../handlers/crudHandlers');
const model = require('../models');
const veterinarymodel = model.veterinary;
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    create: (req, res) => {
        var veterinary_nordinal = req.query.veterinary_nordinal;
        stripe.customers.create({
            id: veterinary_nordinal
        })
            .then(customer =>
                stripe.setupIntents.create({
                    customer: customer.id
                })
                    .then(intent =>
                        res.render('card_wallet', { client_secret: intent.client_secret })
                        )
                    .catch(error => console.error(error)))
            .catch(error => console.error(error))
    },
    /**
     *
     * @param req
     * @param res
     */
    getAllCreditCards: (req, res) => {
        var veterinary_nordinal = req.query.veterinary_nordinal;
        stripe.setupIntents.list({
            customer: veterinary_nordinal
        })
            .then(intents => res.render(intents))
            .catch(error => console.error(error))
    },
    register: (req, res) => {
        var veterinary_nordinal = req.query.veterinary_nordinal;

        handler.getByPk(veterinary_nordinal, veterinarymodel)
            .then(async function (veterinaryFound) {
                if(veterinaryFound != null){
                    let customerID = veterinaryFound.customerID;
                    const intent =  await stripe.setupIntents.create({
                        customer: customerID,
                    });
                    res.render('card_wallet', { client_secret: intent.client_secret });
                    /*res.send(await stripe.setupIntents.create({
                        customer: customerID
                    }));*/
                }
            })
            .catch(function (error) {
                return res.status(500).json({'error': error})
            })
    }

}