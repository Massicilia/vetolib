const handler = require('../handlers/crudHandlers');
const model = require('../models');
const veterinarymodel = model.veterinary;
const webhookKey = 'whsec_eB8qwXuZOpWlBnOY00fyKB9HWnkNgHEY';
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
                    });
                    console.log('intent : '+intent.id);
                    return res.send(intent)
                }else{
                    return res.status(400).json({'error':'Veterinary null'})
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': err})
            })
    },
    // Webhook handler for asynchronous events.
    webhookHandler: async (req, res) => {
        let data;
        let eventType;

        // Check if webhook signing is configured.
        if (webhookKey) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            let signature = req.headers["stripe-signature"];

            try {
                event = await stripe.webhooks.constructEvent(
                    req.rawBody,
                    signature,
                    webhookKey
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`);
                return res.sendStatus(400);
            }
            // Extract the object from the event.
            data = event.data;
            eventType = event.type;
        } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data;
            eventType = req.body.type;
        }

        if (eventType === "setup_intent.created") {
            console.log(`🔔  A new SetupIntent is created. ${data.object.id}`);
        }

        if (eventType === "setup_intent.setup_failed") {
            console.log(`🔔  A SetupIntent has failed to set up a PaymentMethod.`);
        }

        if (eventType === "setup_intent.succeeded") {
            console.log(
                `🔔  A SetupIntent has successfully set up a PaymentMethod for future use.`
            );
        }

        if (eventType === "payment_method.attached") {
            console.log(
                `🔔  A PaymentMethod ${data.object.id} has successfully been saved to a Customer ${data.object.customer}.`
            );

            // At this point, associate the ID of the Customer object with your
            // own internal representation of a customer, if you have one.

            // Optional: update the Customer billing information with billing details from the PaymentMethod
            const customer = await stripe.customers.update(
                data.object.customer,
                {email: data.object.billing_details.email},
                () => {
                    console.log(
                        `🔔  Customer successfully updated.`
                    );
                }
            );

        }

        res.sendStatus(200);
    }
}