var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/example2')
router.route('/createsetupintent')
    .post(StripePaymentController.createSetupIntent2)
router.route('/webhook')
    .post(StripePaymentController.webhookHandler)

module.exports = router;