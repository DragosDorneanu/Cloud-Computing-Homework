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

router.get('/:contestId/problems', function (request, response) {
    codeforces
        .getContestProblemsList(request.params.contestId)
        .then((problemsList) => response.end(JSON.stringify(problemsList)))
        .catch((error) => console.error(error));
});

router.get(`/:contestId/problems/:problemIndex`, function (request, response) {
    codeforces
        .getProblemContent(request.params.contestId, request.params.problemIndex)
        .then((problemContent) => response.end(JSON.stringify(problemContent)))
        .catch((error) => response.end(JSON.stringify(error)));
});

module.exports = router;
