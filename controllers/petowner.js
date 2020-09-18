var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var utils = require('../utils/functions');
var handler = require('../handlers/crudHandlers');
var petownerService = require('../services/petowner');
var model = require('../models')
var petownermodel = model.petowner;

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
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

        if(utils.validateEmail(email)){
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
        }else{
            res.status(504).json({'error': 'not good email format'});
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    login: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        //TO DO VERIFIER MAIL REGEX
        if(utils.validateEmail(email)){
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
        }else{
            res.status(504).json({'error': 'not good email format'});
        }


    },
    /**
     *
     * @param req
     * @param res
     */
    getAll: (req,res) => {
        handler.getAll(req, res, petownermodel, {})
            .then(function (petownersFound) {
                    return res.status(200).json(petownersFound);
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the petowners'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    get: (req, res) => {
        var idpetowner = req.query.idpetowner;
        console.log('idpetowner : '+ idpetowner);
        if (idpetowner == null && Number.isInteger(idpetowner)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(idpetowner, petownermodel)
            .then(function (petownerFound) {
                if (petownerFound != null) {
                    return res.status(200).json({
                        'idpetowner': petownerFound.idpetowner,
                        'name': petownerFound.name,
                        'surname': petownerFound.surname,
                        'adress': petownerFound.adress,
                        'email': petownerFound.email,
                        'phonenum': petownerFound.phonenum,
                    });
                }
                else {
                    return res.status(404).json({'error': 'petowner not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the petowner'})
            })
    },

}