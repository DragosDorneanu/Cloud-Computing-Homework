angular.module('apisCallflow', ['ngRoute', 'angularMoment', 'ngAria', 'ngAnimate', 'ngMessages', 'ngMaterial'])
    .config(($routeProvider) => {
        const loginConfig = {
            controller: 'loginController',
            templateUrl: 'html/homework1/templates/login.html'
        };
        const mainPageConfig = {
            controller: 'mainPageController',
            templateUrl: 'html/homework1/templates/mainPage.html'
        };
        const contestProblemsPageConfig = {
            controller: 'contestProblemsPageController',
            templateUrl: 'html/homework1/templates/contestProblemsPage.html'
        };
        const otherwiseConfig = {
            redirectTo: '/hw1'
        };

        $routeProvider
            .when('/', loginConfig)
            .when('/mainPage/:userHandler', mainPageConfig)
            .when('/contests/:contestId/problems', contestProblemsPageConfig)
            .otherwise(otherwiseConfig)
    });
