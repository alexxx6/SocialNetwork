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

    postServices.EditPost = function (postId, postContent, headers, error) {
        var post = {};
        post.postContent = postContent;
        $http.put(postServicesUrl + '/' + postId, post, { headers: headers })
            .error(error);
    };

    postServices.DeletePost = function (postsId, headers, success, error) {
        $http.delete(postServicesUrl + '/' + postsId, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            }).error(error);
    };

    postServices.likePost = function (postsId, headers) {
        $http.post(postServicesUrl + '/' + postsId + '/likes', null, { headers: headers });
    };

    postServices.unlikePost = function (postsId, headers) {
        $http.delete(postServicesUrl + '/' + postsId + '/likes', { headers: headers });
    };

    return postServices;
});