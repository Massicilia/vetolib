const cron = require("node-cron");
const veterinaryController = require('../controllers/veterinary');
const invoiceController = require('../controllers/invoice');

module.exports = {
    /**
     * cron-job
     * 30 days interval
     */
    generateInvoices: function(){
        cron.schedule('* * 30 * *',
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
    }
}
