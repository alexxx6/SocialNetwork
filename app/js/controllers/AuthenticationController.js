'use strict';

socialNetwork.controller('AuthenticationController', function ($scope, $location, $route,
                        authentication, notifyService, profileServices) {

    var headers = authentication.GetHeaders();

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

    $scope.editProfile = function () {
        var editedData = $scope.userData;
        delete editedData.username;
        delete editedData.id;
        profileServices.EditUserProfile(editedData, headers,
            function (serverData) {
                notifyService.showInfo("Successful Profile Edit!");
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Profile Edit!", serverError);
            });
    };

    $scope.changePassword = function () {
        profileServices.ChangePassword($scope.passwordData, headers,
            function () {
                notifyService.showInfo("Successful Password Change!");
                ClearData();
                $location.path('/user/home');
            },
            function (serverError) {
                notifyService.showError("Unsuccessful Password Change!", serverError);
            });
    };

    $scope.logout = function () {
        authentication.Logout(headers,
            function () {
                notifyService.showInfo("Successful Logout!");
                ClearData();
                authentication.ClearCredentials();
                $route.reload();
            });
    };
});