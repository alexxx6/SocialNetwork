'use strict';

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

socialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(function ($routeProvider) {
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
            templateUrl: 'partials/userHome.html',
            controller: 'MainController'
        })
        .when('/user/ads', {
            templateUrl: 'templates/user-ads.html',
            controller: 'MainController'
        })
        .when('/user/profile', {
            templateUrl: 'templates/edit-user.html',
            controller: 'MainController'
        })
        .when('/user/ads/publish', {
            templateUrl: 'templates/publish-ad.html',
            controller: 'MainController'
        })
        .when('/user/ads/edit/:id', {
            templateUrl: 'templates/edit-ad.html',
            controller: 'MainController'
        })
        .when('/user/ads/delete/:id', {
            templateUrl: 'templates/delete-ad.html',
            controller: 'MainController'
        })
        .when('/admin/home', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'MainController'
        })
        .when('/admin/ads', {
            templateUrl: 'templates/user-ads.html',
            controller: 'MainController'
        })
        .when('/admin/profile', {
            templateUrl: 'templates/edit-user.html',
            controller: 'MainController'
        })
        .when('/admin/ads/publish', {
            templateUrl: 'templates/publish-ad.html',
            controller: 'MainController'
        })
        .when('/admin/ads/edit/:id', {
            templateUrl: 'templates/edit-ad.html',
            controller: 'MainController'
        })
        .when('/admin/ads/delete/:id', {
            templateUrl: 'templates/delete-ad.html',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });

});