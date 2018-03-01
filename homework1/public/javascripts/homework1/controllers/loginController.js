angular.module('apisCallflow')
    .controller('loginController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.userHandler = '';

            $scope.loginUser = (event, userHandler) => {
                if (event.type === 'click' || event.keyCode === 13) {
                    $location.path(`/mainPage/${userHandler}`);
                }
            }
        }]);
