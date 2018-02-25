angular.module('apisCallflow')
    .controller('mainPageController', ['$scope', '$routeParams', 'codeforcesApiService',
        function ($scope, $routeParams, codeforcesApiService) {
            $scope.fetchingUserData = true;

            codeforcesApiService
                .get($routeParams.userHandler)
                .then(collectedUserDataCallback);

            function collectedUserDataCallback(response) {
                $scope.userData = JSON.stringify(response.data, undefined, 2);
                $scope.fetchingUserData = false;
                $scope.$apply();
            }
        }]);
