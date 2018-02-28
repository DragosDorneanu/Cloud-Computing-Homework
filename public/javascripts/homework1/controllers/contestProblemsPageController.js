angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', 'dataCollectorService',
        function ($scope, $routeParams, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;
            $scope.showingProblem = false;
            $scope.problemNotAvailable = false;

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);

            $scope.getProblemContent = function (problem) {
                $scope.problemNotAvailable = false;
                dataCollectorService
                    .getProblemContent($routeParams.contestId, problem.index)
                    .then(getProblemContentCallback);
            };

            $scope.exitProblem = function () {
                $scope.showingProblem = false;
                $scope.$apply();
            };

            function getProblemContentCallback(response) {
                $scope.showedProblem = response.data;
                try {
                    $scope.showedProblem.sampleTest = zip($scope.showedProblem.sampleTest.input, $scope.showedProblem.sampleTest.output);
                    $scope.showingProblem = true;
                } catch (error) {
                    $scope.problemNotAvailable = true;
                } finally {
                    $scope.$apply();
                }
            }

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                $scope.$apply();
            }

            function zip(array1, array2) {
                if (array1.length !== array2.length) {
                    throw new Error('Arrays must have same size');
                }
                let zipArray = [];
                for (let index = 0; index < array1.length; ++index) {
                    zipArray.push([array1[index], array2[index]]);
                }
                return zipArray;
            }
        }]);