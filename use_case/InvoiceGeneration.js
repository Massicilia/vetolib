var veterinaryController = require('../controllers/veterinary');
var veterinarymodel = require('../models/veterinary')

module.exports = {
    generateInvoices: function(){
        /* var cron = require('cron');
    var cronJob = cron.job("0 0 0 0 * *", function(){*/
        //get a list of veterinaries
        //var veterinaries = veterinaryController.getAllVeterinaries(null, null);
        console.log('veterinaries : '+ veterinaries);
        //for each veterinary get the agenda for this month
        //calcul du montant
        //for each veterinary generate an invoice
        console.log('cron job completed');
    }

}
