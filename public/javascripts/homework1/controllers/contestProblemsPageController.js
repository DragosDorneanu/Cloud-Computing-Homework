angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', '$mdDialog', 'dataCollectorService',
        function ($scope, $routeParams, $mdDialog, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;

            $scope.openProblemDialog = function (event, problem) {
                $mdDialog
                    .show({
                        controller: 'ProblemDialogController',
                        templateUrl: 'html/homework1/templates/problemDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true
                    });
            };

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                console.log($scope.problems);
                $scope.$apply();
            }

            function problemDialogController() {
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        }]);