const express = require('express');
const router = express.Router();
const CountriesCollector = require('../../utils/homework1/contries-collector');

const countriesCollector = new CountriesCollector();

router.get('/', function (request, response) {
    const countries = countriesCollector.getCountriesName();
    response.end(JSON.stringify(countries));
});

module.exports = router;
