var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {
    getAll: (req, res, next, model) => {
        return new Promise((next) => {
            model.findAll()
                .then(data => {
                    res.json(data)
                })
                .catch((err) => console.log(err));
        })
    },
}