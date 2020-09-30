var express = require('express');
var veterinaryController = require('../controllers/veterinary');

exports.router = (function() {
  var veterinaryRouter = express.Router();

  veterinaryRouter.route('/login/').post(veterinaryController.login);
  veterinaryRouter.route('/register/').post(veterinaryController.register);
  veterinaryRouter.route('/').put(veterinaryController.update);
  veterinaryRouter.route('/all/').get(veterinaryController.getAllVeterinaries);
  veterinaryRouter.route('/new').post(veterinaryController.create);
  veterinaryRouter.route('/').get(veterinaryController.get);
  veterinaryRouter.route('/create').get(veterinaryController.createtest);

  return veterinaryRouter;

})();