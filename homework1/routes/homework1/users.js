const express = require('express');
const router = express.Router();
const CodeforcesApiCaller = require('../../utils/homework1/codeforces-api-caller');
const GoogleGeocodingApiCaller = require('../../utils/homework1/google-geocoding-api-caller');

const codeforces = new CodeforcesApiCaller();
const geocode = new GoogleGeocodingApiCaller();

router.get('/:userHandler', function (request, response) {
    const requestSource = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    geocode.getLocationByIp(requestSource)
        .then((locationDetails) => {
            const activePromises = [
                codeforces.getContests(locationDetails.country),
                codeforces.getUserData(request.params.userHandler)
            ];
            const promiseResolver = (resolvedValues) => {
                const responseBody = {
                    "locationDetails": locationDetails,
                    "codeforcesContests": resolvedValues[0],
                    "codeforcesProfile": resolvedValues[1],
                };
                response.end(JSON.stringify(responseBody));
            };
            Promise
                .all(activePromises)
                .then(promiseResolver);
        });
});

module.exports = router;
