'use strict';

socialNetwork.controller('PostController', function ($scope, $location, authentication,
    profileServices, postServices) {

    var headers = authentication.GetHeaders();

    $scope.likePost = function (postId) {
        postServices.likePost(postId, headers);
    };
    $scope.unlikePost = function (postId) {
        postServices.unlikePost(postId, headers);
    };
    $scope.publishPost = function () {
        $scope.postData.username = authentication.GetUsername();
        postServices.PublishPost($scope.postData, headers, function() {
            profileServices.GetUserFeed(headers, function (feedData) {
                $scope.feedData = feedData;
            });
        });
    };
});