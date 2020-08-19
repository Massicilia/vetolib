var express = require('express');
var veterinaryController = require('../controllers/veterinary');

exports.router = (function() {
  var veterinaryRouter = express.Router();

  veterinaryRouter.route('/login/').post(veterinaryController.login);
  veterinaryRouter.route('/all/').get(veterinaryController.getAllVeterinaries);
  veterinaryRouter.route('/register/').post(veterinaryController.register);

  return veterinaryRouter;

})();