var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var utils = require('../utils/functions');
var handler = require('../handlers/crudHandlers');
var model = require('../models')
var administratormodel = model.administrator;

module.exports = {
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
            }, administratormodel)
                .then(function (administratorFound) {
                    console.log('administratorFound + '+ administratorFound)
                    if (administratorFound != null) {
                        console.log('password : ' + password);
                        console.log('administratorFound.password : ' + administratorFound.password);
                        bcrypt.compare(password, administratorFound.password, function (errBycrypt, resBycrypt) {
                            if (resBycrypt) {
                                return res.status(200).json({
                                    'idadministrator': administratorFound.idadministrator,
                                    'token': jwtUtils.generateTokenForPetowner(administratorFound)
                                });
                            } else {
                                return res.status(403).json({'error': 'invalid password'});
                            }
                        })
                    } else {
                        return res.status(404).json({'error': 'administrator not exist in DB'});
                    }
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'Unable to verify the administrator'})
                })
        }else{
            res.status(504).json({'error': 'not good email format'});
        }


    },

}