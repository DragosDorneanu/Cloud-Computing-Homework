angular.module('apisCallflow')
    .controller('mainPageController', ['$scope', '$routeParams', 'userDataCollectorService', 'countriesCollectorService',
        function ($scope, $routeParams, userDataCollectorService, countriesCollectorService) {
            $scope.fetchingUserData = true;
            $scope.countries = [];

            userDataCollectorService
                .getUserData($routeParams.userHandler)
                .then(collectedUserDataCallback);

            countriesCollectorService
                .getWorldCountries()
                .then((countries) => {
                    $scope.countries = countries;
                });

            function collectedUserDataCallback(response) {
                $scope.userData = response.data;
                $scope.fetchingUserData = false;
                $scope.$apply();
            }
        }]);
