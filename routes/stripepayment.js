var express = require('express');
var router = express.Router();

var StripePaymentController = require('../controllers/stripepayment')
router.route('')
    .post(StripePaymentController.create)
router.route('')
    .get(StripePaymentController.getAllCreditCards)

module.exports = router;