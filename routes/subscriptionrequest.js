var express = require('express');
var subscriptionrequestController = require('../controllers/subscriptionrequest');

exports.router = (function() {
    var subscriptionrequestRouter = express.Router();

    subscriptionrequestRouter.route('/').get(subscriptionrequestController.getAll);

    return subscriptionrequestRouter;

})();