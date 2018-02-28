angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', 'dataCollectorService',
        function ($scope, $routeParams, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;
            $scope.showingProblem = false;

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);

            $scope.getProblemContent = function (problem) {
                dataCollectorService
                    .getProblemContent($routeParams.contestId, problem.index)
                    .then(getProblemContentCallback);
            };

            function getProblemContentCallback(response) {
                console.log(response.data);
                $scope.showedProblem = response.data;
                $scope.showingProblem = true;
                $scope.$apply();
            }

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                console.log($scope.problems);
                $scope.$apply();
            }
        }]);