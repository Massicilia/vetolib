var express = require('express');
var router = express.Router();

var VeterinaryController = require('../controllers/veterinary')
router.route('/')
    .get(VeterinaryController.getAllVeterinaries)


module.exports = router;




/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
/*
router.get('/', function(req, res, next) {
  db.veterinary.findAll().then(veterinary => {
    res.send(veterinary);
  })
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});**/

/**
 * @POST /veterinary/

router.post('/', function(req, res, next) {
  const {
    nordinal,
    name,
    surname,
    adress,
    email,
    phonenum,
    clinic_nsiret,
    username,
    password
  } = req.body;

  db.veterinary.create({
    nordinal: nordinal,
    name: name,
    surname: surname,
    adress: adress,
    email: email,
    phonenum: phonenum,
    clinic_nsiret: clinic_nsiret,
    username: username,
    password: password
  })
  .then(veterinary => res.status(201).json({
    error: false,
    data: veterinary,
    message: 'New veterinary created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});*/
module.exports = router;
