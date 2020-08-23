var express = require('express');
var petownerController = require('../controllers/petowner');

exports.router = (function() {
    var petownerRouter = express.Router();

    petownerRouter.route('/register/').post(petownerController.register);
    petownerRouter.route('/login/').post(petownerController.login);
    petownerRouter.route('/all/').get(petownerController.getAll);
    petownerRouter.route('/').get(petownerController.get);

    return petownerRouter;

})();