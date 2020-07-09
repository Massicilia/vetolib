var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {
    pets: (req,res,next) => {
        return new Promise((next) => {
            db.pet.findAll({where : {petowner_idpetowner : req.query.petowner_idpetowner }})
                .then(data => {
                    res.json(data)
                })
                .catch((err) => console.log(err));
        })
    },
}
