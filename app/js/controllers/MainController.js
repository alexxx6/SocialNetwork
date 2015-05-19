'use strict';

socialNetwork.controller('MainController', function ($scope, $location, authentication) {

    $scope.username = authentication.GetUsername();
    if ($scope.username) {
        authentication.GetUserProfile(function(serverData) {
            $scope.userData = serverData;
        });
    }
    var path = $location.path();
    if ((path.indexOf("user") !== -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});