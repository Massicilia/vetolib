var PetService = require('../services/pet');
var handler = require('../handlers/crudHandlers');
var model = require('../models');
var petmodel = model.pet;
module.exports = {

    getPetsByPetowner: (req, res, next) => {
        PetService.pets(req,res,next);
    },
    getPetDetails: (req, res, next) => {
        var idpet = req.body.idpet;
        if (idpet == null && idpet.isInteger()) {
            return res.status(400).json({'error': 'missing parameters'})
        }

        handler.getByPk(idpet, petmodel)
            .then(function (petFound) {
                console.log('test');
                if (petFound != null) {
                    console.log('name:');
                    console.log('name:'+ petFound.name);
                    console.log('surname:'+ petFound.surname);
                    console.log('age:'+ petFound.age);
                    console.log('race:'+ petFound.race);
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
    }
}