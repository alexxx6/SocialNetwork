'use strict';

socialNetwork.controller('PostController', function ($scope, $route, authentication,
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
    $scope.deletePost = function (event, postId) {
        postServices.DeletePost(postId, headers, function () {
            $(event.target).parents().filter('.jumbotron').remove();
            var posts = $scope.postsData;
            var filtredPosts = posts.filter(function(post) {
                return post.id !== postId;
            });
            $scope.postsData = filtredPosts;
        });
    };
    $scope.editPost = function (postId, post) {
        postServices.EditPost(postId, post, headers, function(error) {
            $scope.editableForm.$setError('Post', error.message);
        });
    };
    $scope.checkPostContent = function (content) {
        if (!content) {
            return "Post content should not be empty";
        }
    };
});