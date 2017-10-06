var fs = require('fs');
var clone = require('clone');
var usersDb = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
var housesDb = JSON.parse(fs.readFileSync('./data/housing.json', 'utf8'));
//leandre.daumont@gmail.com
module.exports = {
    getUser: function (userName) {
        return usersDb[userName] || null;
    },
    setUserToken: function (userName, token) {
        usersDb[userName].token = token;
    },
    getHousesByCity: function (city) {
        let arr = [];
        for (let x in housesDb) {
            if (housesDb[x].city.toUpperCase() === city.toUpperCase()) {
                arr.push(housesDb[x]);
            }
        }
        return arr;
    },
    getHouses: function (city = null, beds = null, priceMin = null, priceMax = null, startDate = null, endDate = null) {
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
        }
        return arrCopy;
    }
}