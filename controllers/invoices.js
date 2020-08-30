var handler = require('../handlers/crudHandlers');
var invoiceService = require('../services/invoices');
var model = require('../models')
var veterinarymodel = model.veterinary;
var appointmentmodel = model.appointment;
module.exports = {

    /**
     *
     * @param req
     * @param res
     */

 /*   generateInvoices: function (req, res) {
        veterinarymodel.findAll({})
            .then(function (veterinariesFound) {
                if (veterinariesFound == null) {
                    res.status(404).json({'error':'No veterinary found'})
                } else {
                    veterinariesFound.forEach(veterinary => {
                        console.log('else');
                        appointmentmodel.findAll({
                            where: {
                                veterinary_nordinal: nordinal
                            }
                        })
                            .then(function (appointmentsFound) {
                                console.log(appointmentsFound);
                                let invoicesAmount = appointmentsFound.length + 1;
                                console.log('getall : ' + invoicesAmount);
                                invoiceService.create(req, res, invoicesAmount, veterinary.nordinal)
                            })
                            .catch(function (err) {
                                return res.status(500).json({'error': 'Unable to get the appointments'})
                            })
                    })
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the veterinaries'})
            })
    }*/


    generateInvoices: function (req, res) {
        veterinarymodel.findAll({})
            .then(function (veterinariesFound) {
                if (veterinariesFound == null) {
                    res.status(404).json({'error':'No veterinary found'})
                } else {
                    veterinariesFound.forEach(veterinary => {
                        console.log('nordinal : '+ veterinary.nordinal);
                        console.log('else');
                        appointmentmodel.findAll({
                            where: {
                                veterinary_nordinal: veterinary.nordinal
                            }
                        })
                            .then(function (appointmentsFound) {
                                console.log(appointmentsFound);
                                let invoicesAmount;
                                if(appointmentsFound == null){
                                    invoicesAmount = 1;
                                }else {
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
    }
}
