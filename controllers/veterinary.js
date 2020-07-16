var handler = require('../handlers/crudHandlers')
var model = require('../models')
module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getAllVeterinaries: (req, res, next) => {
        var veterinarymodel = model.veterinary;
        handler.getAll(req,res,veterinarymodel,{});
    },
}
