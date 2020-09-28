const handler = require('../handlers/crudHandlers');
const model = require('../models');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'vetolibmailer@gmail.com',
        pass: 'Vetolib#',
    },
    secure: true,
});

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param mailBody
     */
    sendToPetowner: function (req, res, mailBody) {
        console.log('test');
        const {to, mailSubject, mailText} = mailBody;
        handler.getByPk(to, model.petowner)
            .then(function (petownerFound) {
                if (petownerFound != null) {
                    const mailData = {
                        from: 'vetolibmailer@gmail.com',
                        to: petownerFound.email,
                        subject: mailSubject,
                        text: mailText,
                        html: mailText,
                    };
                    transporter.sendMail(mailData, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        res.status(200).send({message: "Mail send", message_id: info.messageId});
                    })
            }})
            .catch(function (err) {
                console.log('error : '+ err);
            })
    },
    /**
     *
     * @param req
     * @param res
     * @param mailBody
     */
    sendToVeterinary: function (req, res, mailBody) {
        const {to, mailSubject, mailText} = mailBody;
        console.log(' to : '+ to);
        console.log(' mailSubject : '+ mailSubject);
        console.log(' mailText : '+ mailText);
        const mailData = {
            from: 'vetolibmailer@gmail.com',
            to: to,
            subject: mailSubject,
            text: mailText,
            html: mailText,
        };
        transporter.sendMail(mailData, (error, info) => {
            console.log(' to : '+ to);
            console.log(' mailSubject : '+ mailSubject);
            console.log(' mailText : '+ mailText);
            if (error) {
                return console.log(error);
            }
            res.status(200).send({message: "Mail send", message_id: info.messageId});
        })
    },
    createdeux: function (req, res) {
        const {to, subject, text} = req.body;
        const mailData = {
            from: 'youremail@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
            attachments: [
                {   // file on disk as an attachment
                    filename: 'nodemailer.png',
                    path: 'nodemailer.png'
                },
                {   // file on disk as an attachment
                    filename: 'text_file.txt',
                    path: 'text_file.txt'
                }
            ]
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({message: "Mail send", message_id: info.messageId});
        });
    },
}