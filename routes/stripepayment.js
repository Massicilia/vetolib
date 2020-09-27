var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/stripepayment')
router.route('')
    .post(StripePaymentController.create)
router.route('/all')
    .get(StripePaymentController.getAllCreditCards)
router.route('')
    .post(StripePaymentController.register)

module.exports = router;