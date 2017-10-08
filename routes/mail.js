var express = require('express');
var router = express.Router();
var dbContext = require('../data/databaseManager.js');
var nodemailer = require('nodemailer');

let config = {
    pool: true,
    host: 'smtp.example.com', // TODO change here
    port: 465,
    secure: true,
    auth: {
        user: 'username', // TODO change here
        pass: 'password' // TODO change here
    },
    socketTimeout: 5,
    connectionTimeout: 5
};
let transporter = nodemailer.createTransport(config);

/* GET mails */
router.get('/', function(req, res) {
    res.send("we send emails from here");
});

router.post('/send/:to/:subject/:message', function(req, res) {
    var message = {
        from: 'sender@server.com',
        to: req.params.to,
        subject: req.params.subject,
        text: req.params.message
    };
    transporter.sendMail(message, function(error, info){
        if(error){
            res.status(500);
            res.send("rip : "+error);
        }
        else {
            res.send("mail send to"+req.params.to);
        }
    });
});
module.exports = router;
