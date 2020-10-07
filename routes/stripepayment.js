var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/stripepayment')
router.route('/createsetupintent')
    .post(StripePaymentController.createSetupIntent2)
router.route('/webhook')
    .post(StripePaymentController.webhookHandler)
router.route('/getcreditcard')
    .get(StripePaymentController.getCreditCard)

module.exports = router;