angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', 'dataCollectorService',
        function ($scope, $routeParams, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                $scope.$apply();
            }

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);
        }]);