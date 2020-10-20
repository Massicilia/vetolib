const handler = require('../handlers/crudHandlers');
const invoiceService = require('../services/invoices');
const model = require('../models')
const veterinarymodel = model.veterinary;
const appointmentmodel = model.appointment;
const invoicemodel = model.invoice;
const { Op } = require('sequelize');
const moment = require('moment')
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    generateInvoicesTest: function (req, res) {
        veterinarymodel.findAll({})
            .then(function (veterinariesFound) {
                if (veterinariesFound == null) {
                    res.status(404).json({'error': 'No veterinary found'})
                } else {
                    veterinariesFound.forEach(veterinary => {
                        let customerID = veterinary.customerID;
                        appointmentmodel.findAll({
                            where: {
                                veterinary_nordinal: veterinary.nordinal,
                                date: {
                                    [Op.gte]: moment().subtract(30, 'days').toDate()
                                }
                            }
                        })
                            .then(async function (appointmentsFound) {
                                console.log(appointmentsFound);
                                let invoicesAmount;
                                if (appointmentsFound == null) {
                                    invoicesAmount = 1;
                                } else {
                                    invoicesAmount = appointmentsFound.length + 1;
                                }
                                await stripe.invoiceItems.create({
                                    customer: customerID,
                                    currency: 'eur',
                                    amount: invoicesAmount,
                                });
                                await stripe.invoices.create({
                                    customer: customerID,
                                    auto_advance: true,
                                    collection_method: 'charge_automatically',
                                });
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    })
                }
            })
            .catch(function (err) {
                res.status(500).json({'error': 'Unable to get the veterinaries'})
            })
    },
    /**
     *
     * @param veterinary_nordinal
     * @param customerID
     */
    generateInvoice: function (veterinary_nordinal, customerID) {
        appointmentmodel.findAll({
            where: {
                veterinary_nordinal: veterinary_nordinal,
                date: {
                    [Op.gte]: moment().subtract(30, 'days').toDate()
                }
            }
        })
            .then(async function (appointmentsFound) {
                let invoicesAmount;
                if (appointmentsFound == null) {
                    invoicesAmount = 1;
                } else {
                    invoicesAmount = appointmentsFound.length + 1;
                }
                console.log('amount : '+ invoicesAmount);
                if(customerID != null){
                    await stripe.invoiceItems.create({
                        customer: customerID,
                        currency: 'eur',
                        amount: invoicesAmount*100,
                    });
                    await stripe.invoices.create({
                        customer: 'cus_I60VoCMdHDgV7S', // customerID,
                        auto_advance: true,
                        collection_method: 'charge_automatically',

                    });
                }
                console.log('invoices created for : '+ veterinary_nordinal);
            })
            .catch(function (err) {
                console.log(err);
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    getInvoices: function (req, res) {
        const veterinary_nordinal = req.query.veterinary_nordinal;
        if (veterinary_nordinal == null && !Number.isInteger(veterinary_nordinal)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getAll(req, res, invoicemodel, {
            where: {
                veterinary_nordinal: veterinary_nordinal
            }
        })
            .then(function (invoicesFound) {
                if (invoicesFound != null) {
                    return res.status(200).json(invoicesFound);
                } else {
                    return res.status(404).json({'error': 'invoices do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the invoices'})
            })
    }
}
