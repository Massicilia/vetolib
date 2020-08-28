var express = require('express');
var clinicController = require('../controllers/clinic');

exports.router = (function() {
    var clinicRouter = express.Router();

    clinicRouter.route('/').post(clinicController.post);
    clinicRouter.route('/').get(clinicController.get);
    clinicRouter.route('/all').get(clinicController.getAll);

    return clinicRouter;

})();