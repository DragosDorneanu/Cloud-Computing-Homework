angular.module('apisCallflow')
    .controller('mainPageController', ['$scope', '$routeParams', 'userDataCollectorService', 'countriesCollectorService', 'moment',
        function ($scope, $routeParams, userDataCollectorService, countriesCollectorService, moment) {
            $scope.fetchingUserData = true;
            $scope.countries = [];
            $scope.locationDetails = {};
            $scope.codeforcesProfile = {};
            $scope.codeforcesContests = [];

            $scope.getFormattedTime = function (seconds) {
                const date = moment().seconds(seconds);
                if (typeof date !== 'object') {
                    return undefined;
                }
                return date.format('DD/MM/YYYY hh:mm:ss A');
            };

            userDataCollectorService
                .getUserData($routeParams.userHandler)
                .then(collectedUserDataCallback);

            countriesCollectorService
                .getWorldCountries()
                .then((countries) => {
                    $scope.countries = countries;
                });

            function collectedUserDataCallback(response) {
                $scope.locationDetails = response.data.locationDetails;
                $scope.codeforcesProfile = response.data.codeforcesProfile;
                $scope.codeforcesContests = response.data.codeforcesContests;
                $scope.fetchingUserData = false;
                $scope.$apply();
            }
        }]);
