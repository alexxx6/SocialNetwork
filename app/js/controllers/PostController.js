'use strict';

socialNetwork.controller('PostController', function ($scope, $route, authentication,
    profileServices, postServices, ngDialog) {

    if (authentication.isLoggedIn()) {

        var headers = authentication.GetHeaders();

        $scope.likePost = function(postId) {
            postServices.likePost(postId, headers);
        };
        $scope.unlikePost = function(postId) {
            postServices.unlikePost(postId, headers);
        };
        $scope.publishPost = function(userName) {
            var post = $scope.newPost;
            post.username = userName;
            postServices.PublishPost(post, headers, function(post) {
                $scope.postsData.splice(0, 0, post);
                $scope.newPost = null;
            });
        };
        $scope.deletePost = function(event, postId) {
            postServices.DeletePost(postId, headers, function() {
                $(event.target).parents().filter('.jumbotron').remove();
                var posts = $scope.postsData;
                var filtredPosts = posts.filter(function(post) {
                    return post.id !== postId;
                });
                $scope.postsData = filtredPosts;
            });
        };
        $scope.editPost = function (postId, postContent) {
            var post = {};
            post.postContent = postContent;
            postServices.EditPost(postId, post, headers, function(error) {
                $scope.editableForm.$setError('Post', error.message);
            });
        };
        $scope.getPostLikes = function(postId) {
            postServices.getPostLikes(postId, headers, function(likesData) {
                $scope.likes = likesData;

                ngDialog.open({
                    template: '/partials/likesView.html',
                    scope: $scope
                });
            });
        };
        $scope.addPostComment = function (postId) {
            var comment = $scope.newComment;
            postServices.addPostComment(postId,comment, headers, function (comment) {
                $scope.postsData.forEach(function(post) {
                    if (post.id === postId) {
                        post.comments.splice(0, 0, comment);
                        post.comments.pop();
                    }
                });
                $scope.newComment = null;
            });
        };

        $scope.editPostComment = function (postId, commentId, commentContent) {
            var comment = {};
            comment.commentContent = commentContent;
            postServices.editPostComment(postId, commentId, comment, headers, function (error) {
                $scope.editableForm.$setError('Comment', error.message);
            });
        };

        $scope.deletePostComment = function (event, postId, commentId) {
            postServices.deletePostComment(postId, commentId, headers, function () {
                $(event.target).parents().filter('.well').remove();
                var posts = $scope.postsData;
                var filtredPosts = [];
                posts.forEach(function (post) {
                    var comments = post.comments;
                    comments = comments.filter(function(comment) {
                        return comment.id !== commentId;
                    });
                    post.comments = comments;
                    filtredPosts.push(post);
                });
                $scope.postsData = filtredPosts;
            });
        };

        $scope.likePostComment = function (postId, commentId) {
            postServices.likePostComment(postId, commentId, headers);
        };
        $scope.unlikePostComment = function (postId, commentId) {
            postServices.unlikePostComment(postId, commentId, headers);
        };
        $scope.getCommentLikes = function (postId, commentId) {
            postServices.getCommentLikes(postId, commentId, headers, function (likesData) {
                $scope.likes = likesData;

                ngDialog.open({
                    template: '/partials/likesView.html',
                    scope: $scope
                });
            });
        };
        $scope.getAllPostComments = function(postId) {
            postServices.getAllPostComments(postId, headers, function (comments) {
                var posts = [];
                $scope.postsData.forEach(function(post) {
                    if (post.id == postId) {
                        post.comments = comments;
                    }
                    posts.push(post);
                });
                $scope.postsData = posts;
            });
        };
        $scope.hidePostCommensts = function(postId) {
            var posts = [];
            $scope.postsData.forEach(function(post) {
                if (post.id == postId) {
                    post.comments = post.comments.slice(0, 3);
                }
                posts.push(post);
            });
            $scope.postsData = posts;       
        };
    }
});