angular.module('apisCallflow')
    .controller('mainPageController', ['$scope', '$routeParams', '$location', 'dataCollectorService', 'countriesCollectorService', 'moment',
        function ($scope, $routeParams, $location, dataCollectorService, countriesCollectorService, moment) {
            $scope.fetchingUserData = true;
            $scope.countries = [];
            $scope.locationDetails = {};
            $scope.codeforcesProfile = {};
            $scope.codeforcesContests = [];
            $scope.fetchingContests = false;
            $scope.contestTableHeads = [
                'id', 'name', 'type', 'phase', 'durationSeconds', 'preparedBy',
                'description', 'difficulty', 'kind', 'country', 'city'
            ];

            const toColumnTitle = function (propertyName) {
                let spacedPropertyName = propertyName.replace(/([A-Z])/g, " $1");
                let columnTitle = spacedPropertyName.charAt(0).toUpperCase() + spacedPropertyName.substr(1);
                return columnTitle;
            };

            $scope.searchForContests = function (country) {
                $scope.fetchingContests = true;
                dataCollectorService
                    .getContests(country)
                    .then((response) => {
                        $scope.codeforcesContests = response.data;
                        $scope.fetchingContests = false;
                        $scope.$apply();
                    });
            };

            $scope.getFormattedTime = function (seconds) {
                const date = moment().seconds(seconds);
                if (typeof date !== 'object') {
                    return undefined;
                }
                return date.format('DD/MM/YYYY hh:mm:ss A');
            };

            $scope.getContestTableHeader = function (heads) {
                let columnName;
                let tableHeader = [];
                for (let index in heads) {
                    columnName = toColumnTitle(heads[index]);
                    tableHeader.push(columnName);
                }
                return tableHeader;
            };

            $scope.getContestInfo = function (contest) {
                let head;
                let info = [];

                for (let index in $scope.contestTableHeads) {
                    head = $scope.contestTableHeads[index];
                    info.push(contest[head]);
                }
                return info;
            };
            $scope.getContestProblems = function (contest) {
                $location.path(`/contests/${contest.id}/problems`);
            };

            dataCollectorService
                .getUserData($routeParams.userHandler)
                .then(collectedUserDataCallback);

            countriesCollectorService
                .getWorldCountries()
                .then((response) => $scope.countries = response.data);

            function collectedUserDataCallback(response) {
                $scope.locationDetails = response.data.locationDetails;
                $scope.codeforcesProfile = response.data.codeforcesProfile;
                $scope.codeforcesContests = response.data.codeforcesContests;
                $scope.contestsLocation = $scope.locationDetails.country;
                $scope.fetchingUserData = false;
                $scope.$apply();
            }
        }]);
