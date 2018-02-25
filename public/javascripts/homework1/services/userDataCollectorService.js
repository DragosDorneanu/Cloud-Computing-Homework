angular.module('apisCallflow')
    .factory('userDataCollectorService', ['httpRequestService', 'serverInfo',
        function (request, serverInfo) {
            return {
                getUserData: (userHandler) => {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, `hw1/users/${userHandler}`)
                            .then((response) => resolve(response));
                    });
                }
            }
        }]);
