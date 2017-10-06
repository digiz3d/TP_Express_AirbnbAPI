var fs = require('fs');
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
    getHouse: function(city=null, beds=null, priceMin=null, priceMax=null, startDate=null, endDate=null) {
        let arr = housesDb;
        for (let x in housesDb) {
            if (city && housesDb[x].city.toUpperCase() !== city.toUpperCase()) {
                arr.splice(x, 1);
                continue;
            }
            if (beds && housesDb[x].beds !== beds) {
                arr.splice(x, 1);
                continue;
            }
        }
        return arr;
    }
}