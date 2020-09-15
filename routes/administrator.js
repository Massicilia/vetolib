var express = require('express');
var administratorController = require('../controllers/administrator');

exports.router = (function() {
    var administratorRouter = express.Router();

    administratorRouter.route('/login/').post(administratorController.login);

    return administratorRouter;

})();