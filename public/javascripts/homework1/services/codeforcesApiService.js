angular.module('apisCallflow')
    .factory('codeforcesApiService', ['$http', 'serverInfo',
        function ($http, serverInfo) {
            return {
                get: (userHandler) => {
                    return new Promise((resolve, reject) => {
                        const calledServer = serverInfo.protocol + serverInfo.ip + ':' + serverInfo.port;
                        $http.get(`${calledServer}/hw1/users/${userHandler}`)
                            .then((response) => resolve(response));
                    });
                }
            }
        }]);
