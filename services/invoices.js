var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param amountinvoice
     * @param veterinary_nordinal
     * @returns {Promise<unknown>}
     */
    create : (req,res,amountinvoice, veterinary_nordinal) => {
        return new Promise((next) => {
            res.header = null;
            console.log('service invoices');
            console.log('amountinvoice : '+amountinvoice);
            console.log('veterinary_nordinal : '+veterinary_nordinal);
            console.log('new Date() : '+new Date());
            db.invoice.create(
                {
                    date: new Date(),
                    veterinary_nordinal: veterinary_nordinal,
                    amountinvoice: amountinvoice
                })
                .then(function(newInvoice) {
                    console.log('service invoice then');
                    return res.status(201).json({
                        'idinvoice': newInvoice.idinvoice
                    })
                })
                .catch(function(err){
                })
        })
    },
}