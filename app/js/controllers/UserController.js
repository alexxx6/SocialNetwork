'use strict';

socialNetwork.controller('UserController', function($scope, $location, authentication,
    profileServices, postServices, userServices, $routeParams) {

    var headers = authentication.GetHeaders();

    $scope.searchUserByName = function (name) {
        if (name) {
            userServices.searchUserByName(name, headers, function(findPeople) {
                $scope.findPeople = findPeople;
            });
        }
    };

    function getUserWall() {
        var userName = $routeParams.userName;
        if (userName) {
            userServices.getPersonData(userName, headers, function (person) {
                $scope.person = person;
            });
            userServices.getUserPosts(userName, headers, function(wallData) {
                $scope.postsData = wallData;
            });
        }
    }

    getUserWall();
});