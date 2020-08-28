var PetService = require('../services/pet');
var handler = require('../handlers/crudHandlers');
var model = require('../models');
var clinicmodel = model.clinic;

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    get: (req, res, next) => {
        var nsiret = req.query.nsiret;
        console.log('nsiret : '+ nsiret);
        if (nsiret == null && Number.isInteger(nsiret)) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(nsiret, clinicmodel)
            .then(function (clinicFound) {
                if (clinicFound != null) {
                    return res.status(200).json({
                        'nsiret': clinicFound.nsiret,
                        'name': clinicFound.name,
                        'adress': clinicFound.adress,
                        'email': clinicFound.email,
                        'phonenum': clinicFound.phonenum
                    });
                }
                else {
                    return res.status(404).json({'error': 'clinic not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the clinic'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getAll: (req,res,next) => {
        handler.getAll(req, res, clinicmodel, {})
            .then(function (clinicsFound) {
                console.log('controller 1');
                if (clinicsFound != null) {
                    console.log('controller 2');
                    return res.status(200).json(clinicsFound);
                }
                else {
                    console.log('controller 3');
                    return res.status(404).json({'error': 'clinics do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the clinics'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    post: (req, res) => {
        var nsiret = req.body.nsiret;
        var name = req.body.name;
        var adress = req.body.adress;
        var phonenum = req.body.phonenum;
        var email = req.body.email;

        //verifier si les parametres sont non nuls
        if (nsiret == null || name == null || adress == null || phonenum == null || email == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        handler.getOne({
            where: {
                nsiret: nsiret
            }
        }, clinicmodel)
            .then(function (clinicFound) {
                if (clinicFound == null) {
                    handler.create(req, res, clinicmodel, {
                        nsiret: req.body.nsiret,
                        name: req.body.name,
                        adress: req.body.adress,
                        phonenum: req.body.phonenum,
                        email: req.body.email
                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Clinic already exists"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to verify the clinic'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    update: (req,res) => {
        var nsiret = req.body.nsiret;
        var name = req.body.name;
        var adress = req.body.adress;
        var email = req.body.email;
        var phonenum = req.body.phonenum;

        var selector = {where : { nsiret: nsiret}};
        var values = {
            name: name,
            adress: adress,
            email: email,
            phonenum: phonenum
        }
        if (nsiret == null || name == null || adress == null || email == null || phonenum == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        handler.getOne({
            where: {
                nsiret: nsiret
            }
        }, clinicmodel)
            .then(function (ClinicFound) {
                console.log('ClinicFound : ' + ClinicFound.nsiret);
                console.log('ici');

                if (ClinicFound != null) {
                    console.log('ClinicFound if : ' + ClinicFound);
                    handler.update(req,res,clinicmodel, selector, values)
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Clinic not found"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to update the clinic'})
            })
    }
}