'use strict';

socialNetwork.factory('authentication', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.Login = function (loginData, success, error) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.Register = function (registerData, success, error) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    }

    service.Logout = function (headers, success) {
        $http.post(serviceUrl + '/logout', null, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            });
    }

    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.GetUsername = function () {
        return localStorage['username'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        return localStorage['accessToken'];
    };

    return service;
});