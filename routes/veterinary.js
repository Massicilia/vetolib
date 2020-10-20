const express = require('express');
const veterinaryController = require('../controllers/veterinary');

exports.router = (function() {
  const veterinaryRouter = express.Router();

  veterinaryRouter.route('/all/').get(veterinaryController.getAllVeterinaries);
  veterinaryRouter.route('/').get(veterinaryController.get);
  veterinaryRouter.route('/login/').post(veterinaryController.login);
  veterinaryRouter.route('/register/').post(veterinaryController.register);
  veterinaryRouter.route('/new').post(veterinaryController.create);
  veterinaryRouter.route('/').put(veterinaryController.update);

  return veterinaryRouter;

})();