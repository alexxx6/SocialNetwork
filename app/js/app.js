'use strict';

var socialNetwork = angular.module('SocialNetwork', ['ngRoute', 'xeditable']);

socialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');
//socialNetwork.constant('baseServiceUrl', 'http://localhost:49399/api');

socialNetwork.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});


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
        .otherwise({ redirectTo: '/user/home' });
});