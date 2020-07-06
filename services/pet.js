var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {
    pet: (req,res,next) => {
        return new Promise((next) => {
            db.pet.findAll({where : {idpet : req.query.idpet }})
                .then(data => {
                    res.json(data)
                })
                .catch((err) => console.log(err));
        })
    },
}
