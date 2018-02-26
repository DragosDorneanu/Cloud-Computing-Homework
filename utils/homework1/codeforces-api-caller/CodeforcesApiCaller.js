const Client = require('node-rest-client').Client;
const {JSDOM} = require('jsdom');

function CodeforcesApiCaller() {
    const restClient = new Client;

    const get = function (link) {
        return new Promise((resolve, reject) => {
            restClient.get(link, (data, response) => {
                if (response.statusCode !== 200) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });
    };

    this.getUserData = function (userHandler) {
        return new Promise((resolve, reject) => {
            const requestLink = `http://codeforces.com/api/user.info?handles=${userHandler}`;
            restClient.get(requestLink, (data, response) => {
                data.result = data.result[0];
                resolve(data)
            });
        });
    };

    this.getContests = function (country) {
        return new Promise((resolve, reject) => {
            const gymContestsLink = 'http://codeforces.com/api/contest.list?gym=true';
            const notGymContestsLink = 'http://codeforces.com/api/contest.list?gym=false';
            const activePromises = [
                get(gymContestsLink),
                get(notGymContestsLink)
            ];
            const promiseResolver = (resolvedData) => {
                let contests = [];
                for (let index = 0; index < resolvedData.length; ++index) {
                    contests = contests.concat(resolvedData[index].result);
                }
                if (country) {
                    contests = contests.filter((contest) => contest.country === country);
                }
                resolve(contests);
            };
            Promise
                .all(activePromises)
                .then(promiseResolver)
                .catch((error) => reject(error));
        });
    };

    this.getContestProblemsList = function (contestId) {
        return new Promise((resolve, reject) => {
            const requestLink = `http://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=5&showUnofficial=true`;
            get(requestLink)
                .then((data) => resolve(data.result.problems))
                .catch((error) => reject(error));
        });
    };

    // extract content by class name: input-specification, output-specification, sample-tests, note
    this.getProblemContent = function (contestId, problemIndex) {
        return new Promise((resolve, reject) => {
            const requestLink = `http://codeforces.com/problemset/problem/${contestId}/${problemIndex}`;
            const resolveProblemContent = (dom) => {
                const problemStatement = dom.window.document.getElementsByClassName('problem-statement');
                resolve(problemStatement[0].textContent);
            };
            JSDOM.fromURL(requestLink)
                .then((dom) => resolveProblemContent(dom))
                .catch((error) => console.error(error));
        });
    };
}

module.exports = CodeforcesApiCaller;
