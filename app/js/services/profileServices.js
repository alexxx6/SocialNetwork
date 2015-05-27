'use strict';

socialNetwork.factory('profileServices', function ($http, baseServiceUrl) {
    var profileServices = {};

    var profileServicesUrl = baseServiceUrl + "/me";

    profileServices.GetUserProfile = function (headers, success) {
        $http.get(profileServicesUrl, { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    }

    profileServices.GetUserFeed = function (headers, success) {
        $http.get(profileServicesUrl + '/feed?StartPostId=&PageSize=5', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    }

    profileServices.GetUserFriendsPreview = function (headers, success) {
        $http.get(profileServicesUrl + '/friends/preview', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    }

    profileServices.GetAllFriends = function (headers, success) {
        $http.get(profileServicesUrl + '/friends', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    }

    profileServices.GetFriendRequests = function (headers, success) {
        $http.get(profileServicesUrl + '/requests', { headers: headers })
            .success(function (data, status, headers, config) {
                success(data);
            });
    }

    profileServices.ApproveFriendRequest = function (requestId, headers, success) {
        $http.put(profileServicesUrl + '/requests/' + requestId + '?status=approved', null, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            });
    };
    profileServices.RejectFriendRequest = function (requestId, headers, success) {
        $http.put(profileServicesUrl + '/requests/' + requestId + '?status=rejected', null, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            });
    };
    profileServices.EditUserProfile = function (editedData, headers, success, erorr) {
        $http.put(profileServicesUrl, editedData, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            }).error(erorr);
    };
    profileServices.ChangePassword = function (passwordData, headers, success, erorr) {
        $http.put(profileServicesUrl + '/changepassword', passwordData, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            }).error(erorr);
    };
    profileServices.SendFriendRequest = function (userName, headers, success, erorr) {
        $http.post(profileServicesUrl + '/requests' + '/' + userName, null, { headers: headers })
            .success(function (data, status, headers, config) {
                success();
            }).error(erorr);
    };

    return profileServices;
});