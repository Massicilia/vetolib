var express = require('express');
var router = express.Router();

var PetController = require('../controllers/pet')
router.route('/bypetowner')
    .get(PetController.getPetsByPetowner)
router.route('/details')
    .get(PetController.getPetDetails)
router.route('/')
    .post(PetController.post)


module.exports = router;