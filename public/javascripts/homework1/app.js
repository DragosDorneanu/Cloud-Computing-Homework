angular.module('apisCallflow', ['ngRoute'])
    .config(($routeProvider) => {
        const routeConfig = {
            controller: 'LoginController',
            templateUrl: 'html/homework1/templates/login.html'
        };
        const otherwiseConfig = {
            redirectTo: '/hw1'
        };

        $routeProvider
            .when('/hw1', routeConfig)
            .otherwise(otherwiseConfig)
    });
