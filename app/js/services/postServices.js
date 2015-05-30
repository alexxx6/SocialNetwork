'use strict';

socialNetwork.factory('postServices', function ($http, baseServiceUrl) {
    var postServices = {};
    
    var postServicesUrl = baseServiceUrl + "/Posts";

    postServices.PublishPost = function (postsData, headers, success) {
        $http.post(postServicesUrl, postsData, { headers: headers })
            .success(function(data, status, headers, config) {
                success(data);
            });
    };

    postServices.EditPost = function (postId, post, headers, error) {
        $http.put(postServicesUrl + '/' + postId, post, { headers: headers })
            .error(error);
    };

    postServices.DeletePost = function (postId, headers, success, error) {
        $http.delete(postServicesUrl + '/' + postId, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            }).error(error);
    };

    postServices.likePost = function (postId, headers) {
        $http.post(postServicesUrl + '/' + postId + '/likes', null, { headers: headers });
    };

    postServices.unlikePost = function (postId, headers) {
        $http.delete(postServicesUrl + '/' + postId + '/likes', { headers: headers });
    };

    postServices.getPostLikes = function (postId, headers, success) {
        $http.get(postServicesUrl + '/' + postId + '/likes', { headers: headers })
            .success(function(data, status, headers, config) {
                success(data);
            });
    };

    postServices.addPostComment = function (postId, comment, headers, success) {
        $http.post(postServicesUrl + '/' + postId + '/comments', comment, { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    postServices.editPostComment = function(postId, commentId, comment, headers, error) {
        $http.put(postServicesUrl + '/' + postId + '/comments/' + commentId, comment, { headers: headers })
            .error(error);
    };

    postServices.deletePostComment = function (postId, commentId, headers, success) {
        $http.delete(postServicesUrl + '/' + postId + '/comments/' + commentId, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            });
    };

    postServices.likePostComment = function (postId, commentId, headers) {
        $http.post(postServicesUrl + '/' + postId + '/comments/' + commentId + '/likes', null, { headers: headers });
    };

    postServices.unlikePostComment = function (postId, commentId, headers) {
        $http.delete(postServicesUrl + '/' + postId + '/comments/' + commentId + '/likes', { headers: headers });
    };

    postServices.getCommentLikes = function (postId, commentId, headers, success) {
        $http.get(postServicesUrl + '/' + postId + '/comments/' + commentId + '/likes', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    postServices.getAllPostComments = function (postId, headers, success) {
        $http.get(postServicesUrl + '/' + postId + '/comments', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    return postServices;
});