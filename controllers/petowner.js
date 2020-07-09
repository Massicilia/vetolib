var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var handler = require('../handlers/crudHandlers');
var petownerService = require('../services/petowner');
var model = require('../models')

module.exports = {
   /* register: function(req,res) {
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
        var petownermodel = model.petowner;
        handler.getOne({
            where: {
                email: email
            }
        }, petownermodel)
            .then(function (existingPetowner){
                console.log('getOne then');
                if (existingPetowner == null) {
                    console.log('getOne then if not exists');
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        console.log('getOne then if not exists hash function');
                        petownerService.create(req,res,bcryptedPassword)
                    })
                        .then(function (newPetowner) {
                            console.log('getOne then if not exists hash function then create');
                            return res.status(200).json({
                                'idpetowner': newPetowner.idpetowner
                            })
                        })
                        .catch(function (err) {
                            return res.status(400).json({'error': 'Can not add new petowner'})
                        })
                }
                else {
                    return res.status(409).json({'error': 'Petowner already exists'})
                }
            })
            .catch(function(err) {
                return res.status(500).json({'error': 'Unable to verify the petowner'})
            })
    },**/
    register: function(req,res) {
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
        var petownermodel = model.petowner;
        handler.getOne({
            where: {
                email: email
            }
        }, petownermodel)
            .then(function (existingPetowner){

                if(existingPetowner.idpetowner == null){
                    console.log('getONE then');
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        petownerService.create(req,res,bcryptedPassword)
                    })
                        .then(function (newPetowner) {
                            return res.status(200).json({
                                'idpetowner': newPetowner.idpetowner
                            })
                        })
                        .catch(function (err) {
                            return res.status(400).json({'error': 'Can not add new petowner'})
                        })
                }else {
                    console.log('getONE then if');
                    return res.status(400).json({
                        status: 200,
                        message: "Petowner already exists"
                    });
                }
            })
            .catch(function(err) {
                return res.status(500).json({'error': 'Unable to verify the petowner'})
            })
    },
    login: function(req,res){

    }
}