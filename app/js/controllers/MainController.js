'use strict';

socialNetwork.controller('MainController', function ($scope, $location, authentication,
                    profileServices, postServices, $route) {

    $scope.username = authentication.GetUsername();
    if ($scope.username) {
        var headers = authentication.GetHeaders();
        profileServices.GetUserProfile(headers, function (userData) {
            $scope.userData = userData;
        });
        profileServices.GetUserFeed(headers, function(feedData) {
            $scope.feedData = feedData;
        });
        profileServices.GetUserFriendsPreview(headers, function(frindsPreview) {
            $scope.frindsPreview = frindsPreview;
        });
        $scope.likePost=function(postId) {
            postServices.likePost(postId, headers);
        }
    }
    var path = $location.path();
    if ((path.indexOf("user") !== -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});