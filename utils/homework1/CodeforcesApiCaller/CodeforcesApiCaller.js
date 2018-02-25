const Client = require('node-rest-client').Client;

function CodeforcesApiCaller() {
    const restClient = new Client;

    this.getUserData = function (userHandler) {
        return new Promise((resolve, reject) => {
            const requestLink = `http://codeforces.com/api/user.info?handles=${userHandler}`;
            restClient.get(requestLink, (data, response) => resolve(data));
        });
    }
}

module.exports = CodeforcesApiCaller;
