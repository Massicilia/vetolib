var PetService = require('../services/pet')
module.exports = {


    getByPk: (req, res, next) => {
        PetService.pets(req,res,next);
    },
}
