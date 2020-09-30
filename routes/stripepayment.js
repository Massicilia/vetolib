var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/example')
router.route('/public-key')
    .get(StripePaymentController.getPublicKey)
router.route('/create-setup-intent')
    .post(StripePaymentController.createSetupIntent)
router.route('/create')
    .post(StripePaymentController.create)
router.route('/webhook')
    .post(StripePaymentController.webhookHandler)

module.exports = router;