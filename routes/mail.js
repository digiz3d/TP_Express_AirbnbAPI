var express = require('express');
var router = express.Router();
var dbContext = require('../data/databaseManager.js');
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.gmail.com', // TODO change here
    port: 587,
    secure: false,
    auth: {
        user: 'cpe.development.global@gmail.com', // TODO change here
        pass: '6@Z*!LKu=Lns`.Gdnzi8k"*wyr$.Y*' // TODO change here
    }
};

var transporter = nodemailer.createTransport(config);

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
            res.send("mail send to "+req.params.to);
        }
    });
});
module.exports = router;
