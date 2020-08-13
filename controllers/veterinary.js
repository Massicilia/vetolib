var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var utils = require('../utils/functions')
var handler = require('../handlers/crudHandlers')
var model = require('../models')
var veterinarymodel = model.veterinary;
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
                                    'nsiret': veterinaryFound.nsiret,
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
}
