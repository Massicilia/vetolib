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

    getOne: (options,model) => {
        return model.findOne(options)
    },

    findOrCreate : (options,model) => {
        return model.findOrCreate(options)
                .then(([newResult, created]) => {
                    if (created) {
                        return res.status(200).json({
                            status: 200,
                            message: "New record Created"
                        });
                    }else {
                        return res.status(400).json({
                            status: 400,
                            message: "Already existing record"
                        });
                    }
                })
                .catch((err) => next(err))
    },

    create : (options,model) => {
        return model.create(options)
            .then(([newResult, created]) => {
                if (created) {
                    return res.status(200).json({
                        status: 200,
                        message: "New record Created"
                    });
                }else {
                    return res.status(400).json({
                        status: 400,
                        message: "Already existing record"
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


}