var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/example2')
router.route('/createsetupintent')
    .post(StripePaymentController.createSetupIntent2)

module.exports = router;