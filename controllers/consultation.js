var handler = require('../handlers/crudHandlers');
var model = require('../models')
module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getAll: (req, res) => {
        var consultationmodel = model.consultation;
        handler.getAll(req,res,consultationmodel,{});
    }
}
