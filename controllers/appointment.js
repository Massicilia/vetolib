var AppointmentService = require('../services/appointment')
module.exports = {
    /* getAppointments: async function (req, res, next) {
        // Validate request parameters, queries using express-validator

        try {
            var appointments = await AppointmentService.getAppointments({})
            return res.status(200).json({
                status: 200,
                data: appointments,
                message: "Succesfully Appointments Retrieved"
            });
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message});
        }
    }, **/

    create: (req, res, next) => {
        const appoint = AppointmentService.postAppointment(req, res);
        if(appoint){
            return res.status(200).json({
                status: 200,
                message: "Succesfully Appointment Created"
            });
        }else {
            return res.status(400).json({
                status: 400,
                message: "Veterinary not available"
            });
        }
    },
}
// test git commit