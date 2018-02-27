angular.module('apisCallflow', ['ngRoute', 'angularMoment'])
    .config(($routeProvider) => {
        const loginConfig = {
            controller: 'loginController',
            templateUrl: 'html/homework1/templates/login.html'
        };
        const mainPageConfig = {
            controller: 'mainPageController',
            templateUrl: 'html/homework1/templates/mainPage.html'
        };
        const otherwiseConfig = {
            redirectTo: '/hw1'
        };

        $routeProvider
            .when('/', loginConfig)
            .when('/mainPage/:userHandler', mainPageConfig)
            .otherwise(otherwiseConfig)
    });
