angular.module('apisCallflow')
    .factory('dataCollectorService', ['httpRequestService', 'serverInfo', 'textRazor',
        function (request, serverInfo, textRazor) {
            return {
                getUserData: (userHandler) => {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, `hw1/users/${userHandler}`)
                            .then((response) => resolve(response));
                    });
                },

                getContests: (country) => {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, `hw1/contests/${country}`)
                            .then((response) => resolve(response));
                    });
                },

                getContestProblems: (contestId) => {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, `hw1/contests/${contestId}/problems`)
                            .then((response) => resolve(response));
                    });
                },

                getProblemContent: (contestId, problemIndex) => {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, `hw1/contests/${contestId}/problems/${problemIndex}`)
                            .then((response) => resolve(response));
                    });
                },

                getTextHyperlinks: (text) => {
                    return new Promise((resolve, reject) => {
                        request
                            .post('hw1/razor', text)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error))
                    });
                }
            }
        }]);
