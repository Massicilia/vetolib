var handler = require('../handlers/crudHandlers')
var model = require('../models')
module.exports = {

    getAllVeterinaries: (req, res, next) => {
        console.log('controller veterinary')
        var veterinarymodel = model.veterinary;
        handler.getAll(req,res,next,veterinarymodel);
    },
}
