const handler = require('../handlers/crudHandlers');
const invoiceService = require('../services/invoices');
const model = require('../models')
const veterinarymodel = model.veterinary;
const appointmentmodel = model.appointment;
const invoicemodel = model.invoice;
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    generateInvoices: function (req, res) {
        veterinarymodel.findAll({})
            .then(function (veterinariesFound) {
                if (veterinariesFound == null) {
                    res.status(404).json({'error': 'No veterinary found'})
                } else {
                    veterinariesFound.forEach(veterinary => {
                        console.log('nordinal : ' + veterinary.nordinal);
                        console.log('else');
                        appointmentmodel.findAll({
                            where: {
                                veterinary_nordinal: veterinary.nordinal
                            }
                        })
                            .then(function (appointmentsFound) {
                                console.log(appointmentsFound);
                                let invoicesAmount;
                                if (appointmentsFound == null) {
                                    invoicesAmount = 1;
                                } else {
                                    invoicesAmount = appointmentsFound.length + 1;
                                }
                                console.log('getall : ' + invoicesAmount);
                                invoiceService.create(req, res, invoicesAmount, veterinary.nordinal)
                            })
                            .catch(function (err) {
                                res.status(501).json({'error': 'Unable to get the appointments'})
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
     * @param req
     * @param res
     * @returns {any}
     */
    getInvoices: function (req, res) {
        var veterinary_nordinal = req.query.veterinary_nordinal;
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
