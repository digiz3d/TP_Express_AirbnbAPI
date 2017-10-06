var express = require('express');
var router = express.Router();
var dbContext = require('../data/databaseManager.js');

/* GET search results. */
router.get('/:location', function(req, res, next) {
    let city = req.params.location;
    res.send(dbContext.getHousesByCity(city));
});

module.exports = router;