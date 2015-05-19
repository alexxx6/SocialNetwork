'use strict';

socialNetwork.controller('AuthenticationController', function ($scope, $location, $route,
                        authentication, notifyService) {

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.Login($scope.loginData,
            function (serverData) {
                //notifyService.showInfo("Successful Login!");
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Login!", serverError);
            });
    };

    $scope.register = function () {
        authentication.Register($scope.registerData,
            function (serverData) {
                notifyService.showInfo("Successful Register!");
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Register!", serverError);
            });
    };

    $scope.editUser = function () {
        authentication.EditUserProfile($scope.userData,
            function (serverData) {
                notifyService.showInfo("Successful Profile Edit!");
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Profile Edit!", serverError)
            });
    };

    $scope.changePassword = function () {
        authentication.ChangePassword($scope.passwordData,
            function () {
                notifyService.showInfo("Successful Password Change!");
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Password Change!", serverError)
            });
    };

    $scope.logout = function () {
        notifyService.showInfo("Successful Logout!");
        ClearData();
        authentication.ClearCredentials();
        $route.reload();
    };
});