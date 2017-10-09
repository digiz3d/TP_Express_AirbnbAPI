var fs = require('fs');
var clone = require('clone');
var usersDb = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
var housesDb = JSON.parse(fs.readFileSync('./data/housing.json', 'utf8'));
module.exports = {
    getUserNoPassword: function(username) {
        let user = usersDb[username] || null;
        /* so we don't delete the original password :^) */
        let ret = clone(user);
        if (ret.password) delete ret.password;
        return ret;
    },
    getUser: function(username) {
        return usersDb[username] || null;
    },
    getUsers: function() {
        return usersDb;
    },
    setUserInfo: function(username, key, value = null) {
        usersDb[username][key] = value;
    },
    setUserToken: function(username, token) {
        usersDb[username].token = token;
    },
    getHousesByCity: function(city) {
        let arr = [];
        for (let x in housesDb) {
            if (housesDb[x].city.toUpperCase() === city.toUpperCase()) {
                arr.push(housesDb[x]);
            }
        }
        return arr;
    },
    getHouses: function(city = null, beds = null, priceMin = null, priceMax = null, startDate = null, endDate = null) {
        let arrCopy = clone(housesDb);
        for (let x in arrCopy) {
            if (city && arrCopy[x].city.toUpperCase() !== city.toUpperCase()) {
                delete arrCopy[x];
                continue;
            }
            if (beds && parseInt(arrCopy[x].beds) !== parseInt(beds)) {
                delete arrCopy[x];
                continue;
            }
            if (priceMin && parseInt(arrCopy[x].price) < parseInt(priceMin)) {
                delete arrCopy[x];
                continue;
            }
            if (priceMax && parseInt(arrCopy[x].price) > parseInt(priceMax)) {
                delete arrCopy[x];
                continue;
            }
            if (startDate && endDate) {
                for (let dateTuple in arrCopy[x].bookedDates) {
                    if ((Date.parse(startDate) >= Date.parse(arrCopy[x].bookedDates[dateTuple].start) &&
                            Date.parse(endDate) <= Date.parse(arrCopy[x].bookedDates[dateTuple].end)) ||
                        (Date.parse(startDate) <= Date.parse(arrCopy[x].bookedDates[dateTuple].start) &&
                            Date.parse(endDate) >= Date.parse(arrCopy[x].bookedDates[dateTuple].start)) ||
                        (Date.parse(startDate) <= Date.parse(arrCopy[x].bookedDates[dateTuple].end) &&
                            Date.parse(endDate) >= Date.parse(arrCopy[x].bookedDates[dateTuple].end))) {
                        delete arrCopy[x];
                        break;
                    }
                }
            }
        }
        return arrCopy;
    },
    isHouseBooked: function(id, startDate, endDate) {
        //TODO check real booking status
        return false;
    },
    setHouseBooked: function(id, startDate, endDate) {
        if (!housesDb[id].bookedDates) {
            housesDb[id].bookedDates = [];
        }
        housesDb[id].bookedDates.push({
            start: startDate,
            end: endDate
        });
    },
    getHouseById: function(id) {
        if (housesDb[id]) {
            return housesDb[id];
        } else {
            return null;
        }
    },
    getBookings() {
        let bookings = [];
        for (let h in housesDb) {
            if (housesDb[h].bookedDates) {
                bookings.push(housesDb[h]);
            }
        }
        return bookings;
    }
}
