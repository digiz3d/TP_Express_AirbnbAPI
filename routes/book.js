var express = require('express');
var router = express.Router();
var dbContext = require('../data/databaseManager.js');

/* GET bookings */
router.get('/', function(req, res) {
    res.send(dbContext.getBookings());
});

/* create new booking */
router.get('/:id/:startDate/:endDate', function(req, res) {
    if (dbContext.getHouseById(req.params.id) != null) {
        if (!dbContext.isHouseBooked(req.params.id, req.params.startDate, req.params.endDate)) {
            dbContext.setHouseBooked(req.params.id, req.params.startDate, req.params.endDate)
            res.send("Housing booked :)");
        } else {
            res.status(409);
            res.send("Housing already booked at this date. Change the dates and try again.");
        }
    } else {
        res.status(404);
        res.send("Housing not found");
    }
});

module.exports = router;
