const countryList = require('country-list')();

function CountriesCollector() {
    this.getCountriesName = function () {
        return countryList.getNames();
    }
}

module.exports = CountriesCollector;
