var PetService = require('../services/pet')
module.exports = {

    getPetsByPetowner: (req, res, next) => {
        PetService.pets(req,res,next);
    },
}
