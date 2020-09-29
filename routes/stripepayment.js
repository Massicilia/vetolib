var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/example')
router.route('/public-key')
    .get(StripePaymentController.getPublicKey)
router.route('/create-setup-intent')
    .post(StripePaymentController.createSetupIntent)
router.route('/test')
    .get(StripePaymentController.test)

module.exports = router;