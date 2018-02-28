angular.module('apisCallflow')
    .factory('dataCollectorService', ['httpRequestService', 'serverInfo',
        function (request, serverInfo) {
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
                }
            }
        }]);
