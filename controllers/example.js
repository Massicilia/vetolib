const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');
const stripepk = Stripe('pk_test_51HM2DTGVBJFFbfQT6801jISmTHsxuGPrL9Icrrun7AgBKbobG0MaxcUPm9anfnA60U53L7gX3RTMN0hxdxnFq8tQ00VRODNzsZ'); // use your test publishable key
const model = require('../models');
const veterinarymodel = model.veterinary;
module.exports = {
//app.get("/", (req, res) => {
    get: (req, res) => {
        const path = resolve(process.env.STATIC_DIR + "/index.html");
        res.sendFile(path);
    },

//app.get("/public-key", (req, res) => {
    getPublicKey: (req, res) => {
        res.send({publicKey: stripepk});
    },

//app.post("/create-setup-intent", async (req, res) => {
    createSetupIntent: async (req, res) => {
        handler.getOne({
            where: {
                nordinal: req.query.veterinary_nordinal
            }
        }, veterinarymodel)
            .then(async function (veterinary) {
                res.send(await stripe.setupIntents.create({
                    customer: veterinary.customerID
                }));
            })
            .catch(function (err) {
                console.log('error : '+ err);
            })
    }
}