var express = require('express');
var router = express.Router();

var MailerController = require('../handlers/mailer')

router.route('/text-mail')
    .post(MailerController.send)

router.route('/attachments-mail')
    .post(MailerController.createdeux)

module.exports = router;