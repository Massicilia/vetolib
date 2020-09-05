var express = require('express');
var consultationController = require('../controllers/consultation');

exports.router = (function() {
    var consultationRouter = express.Router();

    consultationRouter.route('/').get(consultationController.getAll);

    return consultationRouter;

})();