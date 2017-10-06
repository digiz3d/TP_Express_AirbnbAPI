var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var dbContext = require('../data/databaseManager.js');
var randomstring = require("randomstring");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function (req, res, next) {
    if (!dbContext.getUser(req.body.userName)) {
        res.status(401).render('login', { title: 'Login', message: 'Wrong username or password' });
    }
    bcrypt.compare(req.body.password, dbContext.getUser(req.body.userName).password, function (err, result) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            if (result) {
                let token = randomstring.generate(20);
                dbContext.setUserToken(req.body.userName, token);
                res.cookie("token",token);
                res.render('home',{ userName: req.body.userName});
            }
            else {
                res.status(401).render('login', { title: 'Login', message: 'Wrong username or password' });
            }
        }
    });
});

module.exports = router;