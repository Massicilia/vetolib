const express = require('express');
const router = express.Router();

const InvoiceController = require('../controllers/invoice')

router.route('/')
    .get(InvoiceController.getInvoices)

module.exports = router;