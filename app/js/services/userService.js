'use strict';

socialNetwork.factory('userServices', function ($http, baseServiceUrl) {
    var userServices = {};

    var userServicesUrl = baseServiceUrl + "/users";

    userServices.searchUserByName = function (searchName, headers, success) {
        $http.get(userServicesUrl + '/search?searchTerm=' + searchName, { headers: headers })
            .success(function (findPeople) {
                success(findPeople);
            });
    };
    userServices.getUserPosts = function (userName, startPostId, headers, success) {
        startPostId = startPostId || '';
        $http.get(userServicesUrl + '/' + userName + '/wall?StartPostId=' + startPostId + '&PageSize=5', { headers: headers })
            .success(function (wallData) {
                success(wallData);
            });
    };
    userServices.getPersonData = function (userName, headers, success) {
        $http.get(userServicesUrl + '/' + userName, { headers: headers })
            .success(function (person) {
                success(person);
            });
    };
    userServices.getFriendFriendsPreview = function (userName, headers, success) {
        $http.get(userServicesUrl + '/' + userName + '/friends/preview', { headers: headers })
            .success(function (friendFriendsPreview) {
                success(friendFriendsPreview);
            });
    };
    userServices.getFriendFriends = function (userName, headers, success) {
        $http.get(userServicesUrl + '/' + userName + '/friends', { headers: headers })
            .success(function (friendFriends) {
                success(friendFriends);
            });
    };
    userServices.getUserPreview = function (userName, headers, success) {
        $http.get(userServicesUrl + '/' + userName + '/preview', { headers: headers })
            .success(function (userPreview) {
                success(userPreview);
            });
    };

    return userServices;
});