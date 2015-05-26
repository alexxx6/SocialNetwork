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
    $scope.publishPost = function (userName) {
        var post = $scope.newPost;
        post.username = userName;
        postServices.PublishPost(post, headers, function (post) {
            $scope.postsData.splice(0, 0, post);
            $scope.newPost = null;
        });
    };
});