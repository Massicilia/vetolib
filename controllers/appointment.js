var AppointmentService = require('../services/appointment')
module.exports = {

    create: (req, res, next) => {
        AppointmentService.postAppointment(req, res);
    },
}
// test git commit