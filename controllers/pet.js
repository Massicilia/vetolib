var PetService = require('../services/pet');
var handler = require('../handlers/crudHandlers');
var model = require('../models');
var petmodel = model.pet;
module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getPetsByPetowner: (req, res, next) => {
        PetService.pets(req,res,next);
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {any}
     */
    getPetDetails: (req, res, next) => {
        var idpet = req.body.idpet;
        if (idpet == null && idpet.isInteger()) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(idpet, petmodel)
            .then(function (petFound) {
                if (petFound != null) {
                    return res.status(200).json({
                        'idpet': petFound.idpet,
                        'name': petFound.name,
                        'age': petFound.age,
                        'race': petFound.race,
                        'sex': petFound.sex,
                        'weight': petFound.weight,
                        'color': petFound.color,
                        'tatooID': petFound.tatooID,
                        'chipID': petFound.chipID,
                        'sterilized': petFound.sterilized,
                        'assurance': petFound.assurance,
                        'nassurance': petFound.nassurance,
                        'petowner_idpetowner': petFound.petowner_idpetowner
                    });
                }
                else {
                    return res.status(404).json({'error': 'pet not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to get the pet'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    post: (req, res) => {
        var name = req.body.name;
        var age = req.body.age;
        var race = req.body.race;
        var sex = req.body.sex;
        var weight = req.body.weight;
        var color = req.body.color;
        var tatooID = req.body.tatooID;
        var chipID = req.body.chipID;
        var sterilized = req.body.sterilized;
        var assurance = req.body.assurance;
        var nassurance = req.body.nassurance;
        var petowner_idpetowner = req.body.petowner_idpetowner;

        //verifier si les parametres sont non nuls
        if (name == null || age == null || race == null || sex == null || weight == null || color == null || tatooID == null
        || chipID == null || sterilized == null || assurance == null || nassurance == null || petowner_idpetowner == null ) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        handler.getOne({
            where: {
                tatooID: tatooID,
                chipID: chipID,
                petowner_idpetowner: petowner_idpetowner
            }
        }, petmodel)
            .then(function (petFound) {
                if (petFound == null) {
                    handler.create(req, res, petmodel, {
                        name: req.body.name,
                        age: req.body.age,
                        race: req.body.race,
                        sex: req.body.sex,
                        weight: req.body.weight,
                        color: req.body.color,
                        tatooID: req.body.tatooID,
                        chipID: req.body.chipID,
                        sterilized: req.body.sterilized,
                        assurance: req.body.assurance,
                        nassurance: req.body.nassurance,
                        petowner_idpetowner: req.body.petowner_idpetowner
                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Pet already exists"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to verify the pet'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    delete: (req,res) => {

        var idpet = req.query.idpet;

        //if (idpet == null || !Number.isInteger(idpet)) {
        if (idpet == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        console.log('controller');
        handler.delete(req,res,petmodel,{
            where: {
                idpet: idpet }
            })
            .then(function () {
                    return res.status(200).json('Pet deleted');
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to delete the pet'})
            })
    },
    /**
     *
     * @param req
     * @param res
     * @returns {any}
     */
    update: (req,res) => {
        var idpet = req.body.idpet;
        var name = req.body.name;
        var age = req.body.age;
        var race = req.body.race;
        var sex = req.body.sex;
        var weight = req.body.weight;
        var color = req.body.color;
        var tatooID = req.body.tatooID;
        var chipID = req.body.chipID;
        var sterilized = req.body.sterilized;
        var assurance = req.body.assurance;
        var nassurance = req.body.nassurance;
        var petowner_idpetowner = req.body.petowner_idpetowner;


        var selector = {where : { idpet: idpet}};
        var values = {
                name: name,
                age: age,
                sex: sex,
                weight: weight,
                sterilized: sterilized,
                assurance: assurance,
                nassurance: nassurance};
        //if (idpet == null || !Number.isInteger(idpet)) {
        if (idpet == null || name == null || age == null || race == null || sex == null || weight == null || color == null || tatooID == null || chipID == null || sterilized == null || assurance == null || nassurance == null || petowner_idpetowner == null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
        console.log("idpet: "+ idpet);
        console.log("petowner_idpetowner: "+ petowner_idpetowner);
        handler.getOne({
            where: {
                idpet: idpet,
                petowner_idpetowner: petowner_idpetowner
            }
        }, petmodel)
            .then(function (PetFound) {
                console.log('PetFound : ' + PetFound.idpet);
                console.log('ici');

                if (PetFound != null) {
                    console.log('PetFound if : ' + PetFound);
                    handler.update(req,res,petmodel, selector, values)
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Pet not found"
                    });
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'Unable to update the pet'})
            })
    }
}