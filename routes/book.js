var express = require('express');
var router = express.Router();

/* GET bookings */
router.get('/', function(req, res, next) {
    res.send('booking list');
});
/* create new booking */
router.get('/:id/:startDate/:endDate', function(req, res, next) {
    res.send('ok');
});

module.exports = router;