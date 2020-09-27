const db = require('../models');
const handler = require('../handlers/crudHandlers');
const subscriptionrequestmodel = db.subscriptionrequest;
module.exports = {
    /**
     * CREATE A SUBSCRIPTION REQUEST
     * @param req
     * @param res
     * @param bcryptedPassword
     * @returns {Promise<unknown>}
     */
    create : (req,res,bcryptedPassword) => {
        return new Promise((next) => {
            db.subscriptionrequest.create(
                {
                    nordinal: req.body.nordinal,
                    name: req.body.name,
                    surname: req.body.surname,
                    adress: req.body.adress,
                    email: req.body.email,
                    phonenum: req.body.phonenum,
                    clinic_nsiret: req.body.clinic_nsiret,
                    username: req.body.username,
                    password: bcryptedPassword
                })
                .then(function(newSubscriptionrequest) {
                    return res.status(201).json({
                        'idsubscriptionrequest': newSubscriptionrequest.idsubscriptionrequest,
                        'nordinal': newSubscriptionrequest.nordinal,
                        'name': newSubscriptionrequest.name,
                        'surname': newSubscriptionrequest.surname,
                        'adress': newSubscriptionrequest.adress,
                        'email': newSubscriptionrequest.email,
                        'phonenum': newSubscriptionrequest.phonenum,
                        'clinic_nsiret': newSubscriptionrequest.clinic_nsiret,
                        'username': newSubscriptionrequest.username,
                        'password': newSubscriptionrequest.password,
                    })
                })
                .catch(function(err){
                    console.log('err : '+ err);
                    return res.status(500).json({'error': 'Can not send a new subscription request'})
                })
        })
    },
    /**
     * ADD A NEW VETERINAY BY THE ADMINISTRATOR
     * @param req
     * @param res
     * @param bcryptedPassword
     * @returns {Promise<unknown>}
     */
    add : (req,res,subscriptionrequest, customerID) => {
        console.log(veterinary.nordinal);
        return new Promise((next) => {
            db.veterinary.create(
                {
                    nordinal: subscriptionrequest.nordinal,
                    name: subscriptionrequest.name,
                    surname: subscriptionrequest.surname,
                    adress: subscriptionrequest.adress,
                    email: subscriptionrequest.email,
                    phonenum: subscriptionrequest.phonenum,
                    clinic_nsiret: subscriptionrequest.clinic_nsiret,
                    username: subscriptionrequest.username,
                    password: subscriptionrequest.password,
                    customerID: customerID
                })
                .then(function(newVeterinary) {
                    handler.delete(req,res,subscriptionrequestmodel,{
                        where : {
                            nordinal : veterinary.nordinal
                        }
                    })
                    return res.status(201).json({
                        'nordinal': newVeterinary.nordinal,
                        'name': newVeterinary.name,
                        'surname': newVeterinary.surname,
                        'adress': newVeterinary.adress,
                        'email': newVeterinary.email,
                        'phonenum': newVeterinary.phonenum,
                        'clinic_nsiret': newVeterinary.clinic_nsiret,
                        'username': newVeterinary.username,
                        'password': newVeterinary.password,
                        'customerID': newVeterinary.customerID,
                    })
                })
                .catch(function(err){
                    console.log('err : '+ err);
                    return res.status(500).json({'error': 'Can not create a new veterinary'})
                })
        })
    }
}
