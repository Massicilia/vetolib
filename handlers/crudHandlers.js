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
     * @param options
     * @param model
     * @returns {Promise<T | void>}
     */
    getOne: (options,model) => {
        return model.findOne(options)
            .then(function(data) {
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
   /** create : (options,model) => {
        return new Promise((next) => {
            var newRecord = model.create(options)
                .then(function(newRecord) {
                    return newRecord
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    },*/
    /**
     *
     * @param req
     * @param res
     * @param next
     * @param model
     * @param options
     * @returns {Promise<unknown>}
     */
    getAll: (req, res, model,options) => {
        return new Promise((next) => {
            console.log('handler step 1');
            model.findAll(options)
                .then(data => {
                    console.log('handler step 2');
                    res.json(data)
                })
                .catch((err) => console.log(err));
        })
    },
    /**
     *
     * @param req
     * @param res
     * @param model
     * @param options
     * @returns {Promise<unknown>}
     */
    create : (req,res,model,options) => {
        return new Promise((next) => {
            model.create(options)
                .then(function(newRecord) {
                    return res.status(201).json({ newRecord })
                })
                .catch(function(err){
                    return res.status(500).json({'error': 'Can not add a new record'})
                })
        })
    },
    /**
     *
     * @param req
     * @param res
     * @param model
     * @param options
     * @returns {Promise<unknown>}
     */
    delete : (req,res,model,options) => {
        return new Promise((next) => {
            console.log('before  promise : '+ req.params.idpet);
            model.destroy(options)
                .then(function(rowDeleted) {
                    console.log('after then');
                    console.log('rowdeleted: '+ rowDeleted);
                    if (rowDeleted === 1) {
                        console.log('deleted');
                        res.status(200).json({message: "Deleted successfully"});
                    } else {
                        res.status(404).json({message: "record not found"})
                    }
                })
                .catch((err) => console.log(err));
                });
    },
    /**
     *
     * @param req
     * @param res
     * @param model
     * @param selector
     * @param values
     * @returns {Promise<unknown>}
     */
    update : (req,res,model,selector,values) => {
        return new Promise((next) => {
            console.log('update ser handler')
            model.update(values, selector)
                .then((affectedRows) => {
                    console.log('update ser handler then '+ affectedRows);
                    if (affectedRows == 1) {
                        res.status(200).json({message: "Updated successfully"});
                    } else {
                        res.status(404).json({message: "less or more than one record affected"})
                    }
                })
                .catch((err) => console.log(err));
        })
    }
}
