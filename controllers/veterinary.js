const bcrypt = require('bcrypt');
const HashMap = require('hashmap');
const jwtUtils = require('../utils/jwt.utils')
const utils = require('../utils/functions')
const handler = require('../handlers/crudHandlers');
const veterinaryService = require('../services/veterinary');
const model = require('../models')
const veterinaryModel = model.veterinary;
const subscriptionRequestModel = model.subscriptionrequest;
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');

module.exports = {

    /**
     *
     * @param req
     * @param res
     */
    getAllVeterinaries: (req, res) => {
        console.log('getallveterinaries');
        var veterinaryModel = model.veterinary;
        handler.getAll(req,res,veterinaryModel,{});
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
            }, veterinaryModel)
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
                    console.log(err);
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
            }, veterinaryModel)
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
                    console.log(err);
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
    get: (req, res) => {
        var nordinal = req.query.nordinal;
        console.log('nordinal : '+ nordinal);
        if (nordinal == null && Number.isInteger(nordinal)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(nordinal, veterinaryModel)
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
                console.log(err);
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
        const nordinal = req.body.nordinal;
        const surname = req.body.surname;
        const name = req.body.name;
        const adress = req.body.adress;
        const email = req.body.email;
        const phonenum = req.body.phonenum;
        const password = req.body.password;

        const selector = {where : { nordinal: nordinal}};
        const values = {
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
        }, veterinaryModel)
            .then(function () {
                    handler.update(req,res,veterinaryModel, selector, values)
            })
            .catch(function (err) {
                console.log(err);
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
        const nordinal = req.body.nordinal;
        let customerID = null;

        if (nordinal == null) {
            return res.status(400).json({'error': 'missing or invalide parameters'});
        }

        handler.getOne({
            where: {
                nordinal: nordinal
            }
        }, subscriptionRequestModel)
            .then(function (subscriptionRequestFound) {
                if(subscriptionRequestFound != null){
                    // params for stripe payment
                    let customerParams = new HashMap();
                    customerParams.put("description", subscriptionRequestFound.surname + " " + subscriptionRequestFound.name);
                    customerParams.put("name", subscriptionRequestFound.surname + " " + subscriptionRequestFound.name);
                    customerParams.put("email", subscriptionRequestFound.email);
                    customerParams.put("phone", subscriptionRequestFound.phonenum);
                    stripe.customers.create(customerParams)
                        .then(function (customer) {
                            customerID = customer.id;
                            veterinaryService.add(req,res,subscriptionRequestFound, customerID)
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
    /**
     *
     * @returns {Promise<[] | void>}
     */
    getVeterinariesIDs: () => {
        return veterinaryModel.findAll()
                .then(data => {
                    console.log(data[1]['dataValues']['nordinal']);
                    let vetArray = [];
                    for(let i = 0; i<data.length; i++){
                        let veterinariesIDs = new HashMap();
                        veterinariesIDs[data[i]['dataValues']['nordinal']] = data[i]['dataValues']['customerID'];
                        vetArray.push(veterinariesIDs);
                    }
                    return vetArray;
                })
                .catch((err) => console.log(err));
    }
}

