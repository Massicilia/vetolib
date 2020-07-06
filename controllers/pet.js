var PetService = require('../services/pet')
module.exports = {


    getByPk: (req, res, next) => {
        PetService.pet(req,res,next);
    },
}
