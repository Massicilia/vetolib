const { Op } = require('sequelize');
const moment = require('moment')
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');
const handler = require('../handlers/crudHandlers');
const model = require('../models')
const veterinaryModel = model.veterinary;
const appointmentModel = model.appointment;

module.exports = {

    /**
     *
     * @param veterinary_nordinal
     * @param customerID
     */
    generateInvoice: function (veterinary_nordinal, customerID) {
        appointmentModel.findAll({
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
                        customer: customerID,
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

        handler.getOne({
            where: {
                nordinal: veterinary_nordinal
            }
        }, veterinaryModel)
            .then(async function (veterinaryFound) {
                if(veterinaryFound != null){
                    return res.send( await stripe.invoices.list({
                        customer: veterinaryFound.customerID,
                    }))
                }else {
                    return res.status(400).json({'error':'Veterinary null'})
                }
            })
            .catch(function (err) {
                console.log(err);
                return res.status(500).json({'error': 'Unable to get the veterinary'})
            })
    }
}
