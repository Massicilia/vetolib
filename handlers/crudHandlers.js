var express = require('express');
var router = express.Router();
const db = require('../models');

module.exports = {
    /**
     *
     * @param option
     * @param model
     * @returns {Promise<T | void>}
     */
    getByPk: (option, model) => {
        return model.findByPk(option)
                .then(function(data) {
                    return data;
                })
                .catch((err) => console.log(err));
    },
    /**
     * @param req
     * @param res
     * @param next
     * @param model
     * @returns {Promise<unknown>}
     */
    getAll: (req, res, next, model) => {
        return new Promise((next) => {
            model.findAll()
                .then(data => {
                    res.json(data)
                })
                .catch((err) => console.log(err));
        })
    },
    /**
     * @param options
     * @param model
     * @returns {Promise<T | void>}
     */
    getOne: (options,model) => {
        return model.findOne(options)
            .then(function(data) {
                console.log("inside then function"+data);
                return data;
            })
            .catch((err) => console.log(err));
    },
    /**
     *
     * @param options
     * @param model
     * @returns {Promise<[Model, boolean]>}
     */
    findOrCreate : (options,model) => {
        return model.findOrCreate(options)
                .then(([newResult, created]) => {
                    console.log('findorcreate fucntion');
                    if (created) {
                        console.log('findorcreate fucntion if');
                        return res.status(200).json({
                            status: 200,
                            message: "New record Created"
                        });
                    }else {
                        console.log('findorcreate fucntion else');
                        return res.status(400).json({
                            status: 400,
                            message: "Already existing record"
                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
    },
    /**
     *
     * @param options
     * @param model
     * @returns {Promise<unknown>}
     */
    create : (options,model) => {
        return new Promise((next) => {
            var newRecord = model.create(options)
                .then(function(newRecord) {
                    return newRecord
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    }
}