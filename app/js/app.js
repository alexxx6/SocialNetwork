'use strict';

var socialNetwork = angular.module('SocialNetwork', ['ngRoute', 'xeditable', 'ngDialog', 'nsPopover']);

socialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');
//socialNetwork.constant('baseServiceUrl', 'http://localhost:49399/api');

socialNetwork.run(function (editableOptions, $location) {
    editableOptions.theme = 'bs3';

    if ($location.path() === '/') {
        $location.path('/user/home');
    }
});


socialNetwork.config(function ($routeProvider, ngDialogProvider, $httpProvider, $provide) {

    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'MainController'
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'MainController'
        })
        .when('/user/home', {
            templateUrl: 'partials/home.html',
            controller: 'MainController'
        })
        .when('/user/edit/profile', {
            templateUrl: 'partials/editProfile.html',
            controller: 'MainController'
        })
        .when('/user/edit/password', {
            templateUrl: 'partials/changePassword.html',
            controller: 'MainController'
        })
        .when('/user/friends', {
            templateUrl: 'partials/friendsPage.html',
            controller: 'MainController'
        })
        .when('/user/:userName', {
            templateUrl: 'partials/userWall.html',
            controller: 'MainController'
        })
        .when('/user/:userName/friends', {
            templateUrl: 'partials/friendsPage.html',
            controller: 'UserController'
        })
        .otherwise({ redirectTo: '/user/home' });

    ngDialogProvider.setDefaults({
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false
    });

    $provide.factory('HttpInterceptor', function ($q, $location, notifyService) {
        return {
            responseError: function (rejection) {

                if (rejection.status === 401 && $location.path() !== '/') {
                    localStorage.clear();
                    $location.path('/');
                    notifyService.showError('Please login first');
                }

                return $q.reject(rejection);
            }
        };
    });

    $httpProvider.interceptors.push('HttpInterceptor');
});