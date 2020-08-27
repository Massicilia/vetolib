var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var utils = require('../utils/functions')
var handler = require('../handlers/crudHandlers');
var veterinaryService = require('../services/veterinary');
var model = require('../models')
var veterinarymodel = model.veterinary;
var subscriptionrequestmodel = model.subscriptionrequest;
module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getAllVeterinaries: (req, res, next) => {
        var veterinarymodel = model.veterinary;
        handler.getAll(req,res,veterinarymodel,{});
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
        console.log('email ' + email);
        console.log('password ' + password);

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        //TO DO VERIFIER MAIL REGEX
        if(utils.validateEmail(email)){
            handler.getOne({
                where: {
                    email: email
                }
            }, veterinarymodel)
                .then(function (veterinaryFound) {
                    if (veterinaryFound != null) {
                          bcrypt.compare(password, veterinaryFound.password, function (errBycrypt, resBycrypt) {
                            if (resBycrypt) {
                                return res.status(200).json({
                                    'nordinal': veterinaryFound.nordinal,
                                    'token': jwtUtils.generateTokenForVeterinary(veterinaryFound)
                                });
                            } else {
                                return res.status(403).json({'error': 'invalid password'});
                            }
                        })
                    } else {
                        return res.status(404).json({'error': 'veterinary not exist in DB'});
                    }
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'Unable to verify the veterinary'})
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
    register: function (req, res) {
        var nordinal = req.body.nordinal;
        var name = req.body.name;
        var surname = req.body.surname;
        var adress = req.body.adress;
        var email = req.body.email;
        var phonenum = req.body.phonenum;
        var clinic_nsiret = req.body.clinic_nsiret;
        var username = req.body.username;
        var password = req.body.password;

        //verifier si les parametres sont non nuls
        if (nordinal == null || name == null || email == null || surname == null || adress == null || phonenum == null || clinic_nsiret == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if(utils.validateEmail(email)){
            handler.getOne({
                where: {
                    nordinal: nordinal,
                    email: email
                }
            }, subscriptionrequestmodel)
                .then(function (subscriptionrequestFound) {
                    if (subscriptionrequestFound == null) {
                        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                            veterinaryService.create(req, res, bcryptedPassword)
                        })
                    } else {
                        return res.status(400).json({
                            status: 400,
                            message: "Veterinary already exists"
                        });
                    }
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'Unable to verify the veterinary'})
                })
        }else{
            res.status(504).json({'error': 'not good email format'});
        }
    },
}
