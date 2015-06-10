'use strict';

socialNetwork.controller('MainController', function ($scope, $location, authentication,
                    profileServices, postServices, userServices, notifyService) {

    $scope.username = authentication.GetUsername();
    var startPostId = 0;
    var isLoaded;    

    if (authentication.isLoggedIn()) {
        var headers = authentication.GetHeaders();

        profileServices.GetUserProfile(headers, function(userData) {
            $scope.userData = userData;
        });

        function getFeed() {
            if ($location.path() === '/user/home') {
                profileServices.GetUserFeed(headers, startPostId, function(postsData) {

                    if (!$scope.postsData) {
                        $scope.postsData = postsData;
                    } else {
                        $.merge($scope.postsData, postsData);
                    }

                    if (postsData.length) {
                        startPostId = postsData[postsData.length - 1].id;
                        isLoaded = true;
                    }
                });
            }
        };

        getFeed();

        function getUserFriendsPreview() {
            profileServices.GetUserFriendsPreview(headers, function(friendsPreview) {
                $scope.friendsPreview = friendsPreview;
            });
        }

        getUserFriendsPreview();


        profileServices.GetAllFriends(headers, function(friends) {
            $scope.friends = friends;
        });

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
        $scope.RejectFriendRequest = function(requestId) {
            profileServices.RejectFriendRequest(requestId, headers, function() {
                getFriendRequests();
            });
        };
        $scope.LoadHomePage = function() {
            $location.path('/user/home');
        };
        $scope.LoadEditProfilePage = function() {
            $location.path('/user/edit/profile');
        };
        $("#uploadProfileImgBtn").click(function() {
            $("#profileImgFile").trigger('click');
        });
        (function uploadImages() {
            var MAX_SISE_OF_PROFILE_IMG = 131072;
            var MAX_SISE_OF_COVER_IMG = 1048576;
            var reader = new FileReader();

            $('#profileImgFile').change(function() {
                var profileImg = this.files[0];
                if (profileImg.type.match(/image\/jpeg/) && profileImg.size <= MAX_SISE_OF_PROFILE_IMG) {
                    reader.onload = function() {
                        $('.profileImg').attr('src', reader.result);
                        $scope.userData.profileImageData = reader.result;
                    };
                    reader.readAsDataURL(profileImg);
                } else {
                    notifyService.showError("Invalid file format or size.");
                }
            });

            $("#uploaCoverImgdBtn").click(function() {
                $("#coverImgFile").trigger('click');
            });
            $('#coverImgFile').change(function() {
                var coverImage = this.files[0];
                if (coverImage.type.match(/image\/.*/) && coverImage.size <= MAX_SISE_OF_COVER_IMG) {
                    reader.onload = function() {
                        $('.coverImage').attr('src', reader.result);
                        $scope.userData.coverImageData = reader.result;
                    };
                    reader.readAsDataURL(coverImage);
                } else {
                    notifyService.showError("Invalid file format or size.");
                }
            });
        })();
        $scope.loadChangePasswordPage = function() {
            $location.path('/user/edit/password');
        };

        $scope.loadFriendsPage = function() {
            $location.path('/user/friends');
        };

        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100 && isLoaded) {
                if ($location.path() === '/user/home') {
                    getFeed();
                    isLoaded = false;
                }
            }
        });
    } else if ($location.path() !== '/register') {
        $location.path('/');
    }
});