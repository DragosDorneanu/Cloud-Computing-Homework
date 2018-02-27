const express = require('express');
const router = express.Router();

const CodeforcesApiCaller = require('../../utils/homework1/codeforces-api-caller');

const codeforces = new CodeforcesApiCaller();

router.get('/:country', function (request, response) {
    codeforces
        .getContests(request.params.country)
        .then((contests) => response.end(JSON.stringify(contests)))
        .catch((error) => console.error(error));
});

module.exports = router;
