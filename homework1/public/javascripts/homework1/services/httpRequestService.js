angular.module('apisCallflow')
    .factory('httpRequestService', ['$http', function ($http) {
        return {
            get: function (serverInfo, requestPath, config) {
                let requestUrl = `${serverInfo.protocol + serverInfo.ip}:${serverInfo.port}`;
                if (requestPath[0] !== '/') {
                    requestUrl += '/';
                }
                requestUrl += requestPath;
                return $http.get(requestUrl, config);
            },

            post: function (link, data, config) {
                return $http.post(link, {data}, config);
            }
        }
    }]);