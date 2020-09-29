const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils')
const utils = require('../utils/functions')
const handler = require('../handlers/crudHandlers');
const veterinaryService = require('../services/veterinary');
const model = require('../models')
const veterinarymodel = model.veterinary;
const subscriptionrequestmodel = model.subscriptionrequest;
const HashMap = require('hashmap');
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getAllVeterinaries: (req, res) => {

        var veterinarymodel = model.veterinary;
        handler.getAll(req,res,veterinarymodel,{});
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    login: (req, res) => {

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
     * CREATE SUBSCRIPTION REQUEST
     * @param req
     * @param res
     * @returns {any}
     */
    register: (req, res) => {
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
            }, veterinarymodel)
                .then(function (veterinaryFound) {
                    if (veterinaryFound == null) {
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
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    get: (req, res) => {
        var nordinal = req.query.nordinal;
        console.log('nordinal : '+ nordinal);
        if (nordinal == null && Number.isInteger(nordinal)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(nordinal, veterinarymodel)
            .then(function (veterinaryFound) {
                if (veterinaryFound != null) {
                    return res.status(200).json({
                        'nordinal': veterinaryFound.nordinal,
                        'name': veterinaryFound.name,
                        'surname': veterinaryFound.surname,
                        'adress': veterinaryFound.adress,
                        'email': veterinaryFound.email,
                        'phonenum': veterinaryFound.phonenum,
                        'clinic_nsiret': veterinaryFound.clinic_nsiret,
                    });
                }
                else {
                    return res.status(404).json({'error': 'veterinary not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the veterinary'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    update: (req, res) => {
        var nordinal = req.body.nordinal;
        var surname = req.body.surname;
        var name = req.body.name;
        var adress = req.body.adress;
        var email = req.body.email;
        var phonenum = req.body.phonenum;
        var password = req.body.password;

        var selector = {where : { nordinal: nordinal}};
        var values = {
            surname: surname,
            name: name,
            adress: adress,
            email: email,
            phonenum: phonenum,
            password: bcrypt.hash(password, 5)
        }

        if (surname == null || name == null || adress == null || email == null || phonenum == null || password == null ) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        handler.getOne({
            where: {
                nordinal: nordinal
            }
        }, veterinarymodel)
            .then(function (VeterinaryFound) {
                console.log('VeterinaryFound : ' + VeterinaryFound.nordinal);
                console.log('ici');

                if (VeterinaryFound != null) {
                    console.log('VeterinaryFound if : ' + VeterinaryFound);
                    handler.update(req,res,veterinarymodel, selector, values)
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Veterinary not found"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to update the veterinary'})
            })
    },
    /**
     * CREATE NEW VETERINARY
     * @param req
     * @param res
     * @returns {any}
     */
    create: (req, res) => {
        var nordinal = req.body.nordinal;
        var customerID = null;

        if (nordinal == null) {
            return res.status(400).json({'error': 'missing or invalide parameters'});
        }

        handler.getOne({
            where: {
                nordinal: nordinal
            }
        }, subscriptionrequestmodel)
            .then(function (subscriptionrequestFound) {
                if(subscriptionrequestFound != null){
                    // params for stripe payment
                    let customerParams = new HashMap();
                    customerParams.put("description", subscriptionrequestFound.surname + " " + subscriptionrequestFound.name);
                    customerParams.put("name", subscriptionrequestFound.surname + " " + subscriptionrequestFound.name);
                    customerParams.put("email", subscriptionrequestFound.email);
                    customerParams.put("phone", subscriptionrequestFound.phonenum);
                    stripe.customers.create(customerParams)
                        .then(function (customer) {
                            customerID = customer.id;
                            veterinaryService.add(req,res,subscriptionrequestFound, customerID)
                        })
                        .catch(function (error) {
                            console.log(error);
                            return res.status(505).json({'error': 'Unable to create a new customer in payment module'})
                        })
                }else{
                    return res.status(400).json({
                        status: 400,
                        message: "No subscription request found"
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                return res.status(500).json({'error': 'Unable to create a new veterinary'})
            })


    },
}
