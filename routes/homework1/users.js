const express = require('express');
const router = express.Router();
const CodeforcesApiCaller = require('../../utils/homework1/CodeforcesApiCaller');

const codeforces = new CodeforcesApiCaller();

router.get('/:userHandler', function (request, response) {
    codeforces
        .getUserData(request.params.userHandler)
        .then((data) => response.end(data))
});

module.exports = router;
