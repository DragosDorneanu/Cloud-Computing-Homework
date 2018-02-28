angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', 'dataCollectorService',
        function ($scope, $routeParams, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;

            $scope.openProblemDialog = function (problem) {

            };

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                $scope.$apply();
            }
        }]);