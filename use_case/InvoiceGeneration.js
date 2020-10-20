const veterinaryController = require('../controllers/veterinary');
const invoiceController = require('../controllers/invoices');
const cron = require("node-cron");
module.exports = {
    generateInvoices: function(){
        cron.schedule('* * * * *',
            function() {
                console.log('running a task every minute');
                // get a list of veterinaries
                veterinaryController.getVeterinariesIDs()
                    .then(data => {
                        console.log('getVet then');
                        console.log('data.length : '+ data.length);
                        // for each veterinary generate an invoice
                        for (let i = 0; i < data.length; i++) {
                            let veterinary = data[i];
                            invoiceController.generateInvoice( Object.keys(veterinary), Object.values(veterinary));
                        }
                    })
                    .catch((err) => console.log(err));

            },
            { "scheduled": true}
        );
        console.log('cron job completed');
    }

}
