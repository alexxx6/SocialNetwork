'use strict';

socialNetwork.factory('postServices', function ($http, baseServiceUrl) {
    var postServices = {};
    
    var postServicesUrl = baseServiceUrl + "/Posts";

    postServices.PublishPost = function (postsData, headers, success, error) {
        $http.post(postServicesUrl, postsData, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    postServices.GetPostById = function (postsId, headers, success) {
        $http.get(postServicesUrl + '/' + postsId,
            {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    postServices.EditPost = function (currentAd, headers, success, error) {
        $http.put(postServicesUrl + '/' + currentAd.id, currentAd, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    postServices.DeletePost = function (postsId, headers, success, error) {
        $http.delete(postServicesUrl + '/' + postsId, { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    postServices.likePost = function (postsId, headers) {
        $http.post(postServicesUrl + '/' + postsId + 'likes', { headers: headers });
    };

    postServices.unlikePost = function (postsId, headers, success) {
        $http.delete(postServicesUrl + '/' + postsId + 'likes', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    return postServices;
});