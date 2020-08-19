var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {
    /**
     *
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
    }
}
