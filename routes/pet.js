var express = require('express');
var router = express.Router();

var PetController = require('../controllers/pet')
router.route('/')
    .get(PetController.getByPk)


module.exports = router;