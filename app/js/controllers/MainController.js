'use strict';

socialNetwork.controller('MainController', function ($scope, $location, authentication,
                    profileServices, postServices, userServices) {

    $scope.username = authentication.GetUsername();
    if ($scope.username) {
        var headers = authentication.GetHeaders();
        profileServices.GetUserProfile(headers, function (userData) {
            $scope.userData = userData;
            $scope.userData.gender = $scope.userData.gender == 0 ? 'Male' : $scope.userData.gender == 1 ? 'Female' : 'Other';
        });
        profileServices.GetUserFeed(headers, function (feedData) {
            $scope.feedData = feedData;
        });

        function getUserFriendsPreview() {
            profileServices.GetUserFriendsPreview(headers, function (frindsPreview) {
                $scope.frindsPreview = frindsPreview;
            });
        }

        getUserFriendsPreview();

        $scope.likePost = function (postId) {
            postServices.likePost(postId, headers);
        };
        $scope.unlikePost = function (postId) {
            postServices.unlikePost(postId, headers);
        };
        $scope.searchUserByName = function (name) {
            userServices.searchUserByName(name, headers, function (findPeople) {
                $scope.findPeople = findPeople;
            });
        };

        function getFriendRequests() {
            profileServices.GetFriendRequests(headers, function(friendRequests) {
                $scope.friendRequests = friendRequests;
            });
        }

        getFriendRequests();

        $scope.ApproveFriendRequest = function(requestId) {
            profileServices.ApproveFriendRequest(requestId, headers, function() {
                getUserFriendsPreview();
                getFriendRequests();
            });
        };
        $scope.RejectFriendRequest = function (requestId) {
            profileServices.RejectFriendRequest(requestId, headers,function() {
                getFriendRequests();
            });
        };
        $scope.LoadHomePage = function() {
            $location.path('/user/home');
        };
        $scope.LoadEditProfilePage = function() {
            $location.path('/user/edit/profile');
        };
        $scope.uploadFile = function() {
            $http.post('server.php', $scope.image)
                .success(function(res) {
                    alert('View file ' + res + '  ?');
                    $window.location.assign(res);
                });
        };
        $("#uploadProfileImgBtn").click(function () {
            $("#profileImgFile").trigger('click');
        });
        $("#uploaCoverImgdBtn").click(function () {
            $("#coverImgFile").trigger('click');
        });
    }
    var path = $location.path();
    if ((path.indexOf("user") !== -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});