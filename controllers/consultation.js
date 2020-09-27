var handler = require('../handlers/crudHandlers');
var model = require('../models')
var consultationmodel = model.consultation;
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    getAll: (req,res) => {
        handler.getAll(req, res, consultationmodel, {})
            .then(function (consultationsFound) {
                if (consultationsFound != null) {
                    return res.status(200).json(consultationsFound);
                }
                else {
                    return res.status(404).json({'error': 'consultations do not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the consultations'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    create: (req, res) => {
        var race = req.body.race;
        var symptoms = req.body.symptoms;
        var disease = req.body.disease;
        var idpet = req.body.idpet;
        var idveterinary = req.body.idveterinary;

        //verifier si les parametres sont non nuls
        if (race == null || symptoms == null || disease == null || idpet == null || idveterinary == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        handler.create(req, res, consultationmodel, {
            race: req.body.race,
            symptoms: req.body.symptoms,
            disease: req.body.disease,
            idpet: req.body.idpet,
            idveterinary: req.body.idveterinary
        })
            .then(consultation =>{
                return res.status(200).json(consultation);
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to add a consultation'})
            })
    }
}
