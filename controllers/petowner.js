var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var handler = require('../handlers/crudHandlers');
var petownerService = require('../services/petowner');
var model = require('../models')
var petownermodel = model.petowner;

module.exports = {
    register: function (req, res) {
        var name = req.body.name;
        var surname = req.body.surname;
        var adress = req.body.adress;
        var email = req.body.email;
        var phonenum = req.body.phonenum;
        var username = req.body.username;
        var password = req.body.password;

        //verifier si les parametres sont non nuls
        if (name == null || email == null || surname == null || adress == null || phonenum == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        //TO DO VERIFIER MAIL REGEX
        handler.getOne({
            where: {
                email: email
            }
        }, petownermodel)
            .then(function (petownerFound) {
                if (petownerFound == null) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        petownerService.create(req, res, bcryptedPassword)
                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Petowner already exists"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to verify the petowner'})
            })
    },
    login: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        //TO DO VERIFIER MAIL REGEX
        handler.getOne({
            where: {
                email: email
            }
        }, petownermodel)
            .then(function (petownerFound) {
                if (petownerFound != null) {
                    bcrypt.compare(password, petownerFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'idpetowner': petownerFound.idpetowner,
                                'token': jwtUtils.generateTokenForPetowner(petownerFound)
                            });
                        } else {
                            return res.status(403).json({'error': 'invalid password'});
                        }
                    })
                } else {
                    return res.status(404).json({'error': 'petowner not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to verify the petowner'})
            })
    }

}