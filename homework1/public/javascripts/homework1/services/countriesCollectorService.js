angular.module('apisCallflow')
    .factory('countriesCollectorService', ['httpRequestService', 'serverInfo',
        function (request, serverInfo) {
            return {
                getWorldCountries: function () {
                    return new Promise((resolve, reject) => {
                        request.get(serverInfo, 'hw1/countries')
                            .then((response) => resolve(response));
                    });
                }
            }
        }]);
