var express = require('express');
var router = express.Router();

var InvoiceController = require('../controllers/invoices')

router.route('/')
    .get(InvoiceController.generateInvoices)

module.exports = router;