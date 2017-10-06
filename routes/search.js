var express = require('express');
var router = express.Router();
var dbContext = require('../data/databaseManager.js');

/* GET search results. */
router.get('/:location', function (req, res, next) {
    let city = req.params.location;
    res.type('application/json');
    res.send(dbContext.getHouses(
        city, req.query.beds,
        req.query.priceMin,
        req.query.priceMax,
        req.query.startDate,
        req.query.endDate));
    
});

module.exports = router;