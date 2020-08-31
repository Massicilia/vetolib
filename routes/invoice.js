var express = require('express');
var router = express.Router();

var InvoiceController = require('../controllers/invoices')

router.route('/')
    .get(InvoiceController.generateInvoices)
router.route('/all')
    .get(InvoiceController.getInvoices)

module.exports = router;