angular.module('apisCallflow')
    .controller('mainPageController', ['$scope', '$routeParams', 'codeforcesApiService',
        function ($scope, $routeParams, codeforcesApiService) {
            $scope.fetchingUserData = true;

            codeforcesApiService
                .get($routeParams.userHandler)
                .then(collectedUserDataCallback);

            function collectedUserDataCallback(response) {
                $scope.userData = response.data;
                $scope.fetchingUserData = false;
                $scope.$apply();
            }
        }]);
