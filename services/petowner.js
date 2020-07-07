var express = require('express');
//const db = require('../models/');
const db = require('../models');

module.exports = {

    create : (req,res,bcryptedPassword) => {
        return new Promise((next) => {
            db.petowner.create(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    adress: req.body.adress,
                    email: req.body.email,
                    phonenum: req.body.phonenum,
                    username: req.body.username,
                    password: bcryptedPassword,
                })
        })
    }
}