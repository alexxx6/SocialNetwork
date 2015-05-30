'use strict';

socialNetwork.controller('UserController', function ($scope, $location, authentication,
    profileServices, postServices, userServices, $routeParams) {

    if (authentication.isLoggedIn()) {

        var headers = authentication.GetHeaders();
        var startPostId = 0;
        var isLoaded;

        $scope.searchUserByName = function (name) {
            if (name) {
                userServices.searchUserByName(name, headers, function (findPeople) {
                    $scope.findPeople = findPeople;
                });
            }
        };

        $scope.getUserWall = function () {
            var userName = $routeParams.userName;
            if (userName) {
                userServices.getPersonData(userName, headers, function (person) {
                    $scope.person = person;
                    getFriendFriendsPreview();
                });

                function getUserPosts() {
                    userServices.getUserPosts(userName, startPostId, headers, function (postsData) {
                        var posts = [];
                        postsData.forEach(function (post) {
                            post.comments.slice(0, 3);
                            posts.push(post);
                        });
                       
                        if (!$scope.postsData) {
                            $scope.postsData = posts;
                        } else {
                            $.merge($scope.postsData, posts);                            
                        }

                        if (postsData.length) {
                            startPostId = posts[posts.length - 1].id;
                            isLoaded = true;
                        }
                    });
                }

                getUserPosts();
                
                var getFriendFriendsPreview = function () {
                    if ($scope.person.isFriend) {
                        userServices.getFriendFriendsPreview(userName, headers, function (friendFriendsPreview) {
                            $scope.friendFriendsPreview = friendFriendsPreview;
                        });
                    }
                }

                $scope.sendFriendRequest = function () {
                    profileServices.SendFriendRequest(userName, headers, function () {
                        $scope.person.hasPendingRequest = true;
                    });
                };

                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100 && isLoaded) {
                        if ($location.path() === '/user/' + userName) {
                            getUserPosts();
                            isLoaded = false;
                        }
                    }
                });
            }
        }      

        function getFriendFriends() {
            var userName = $routeParams.userName;
            if ($location.path() === '/user/' + userName + '/friends') {
                userServices.getFriendFriends(userName, headers, function (friendFriends) {
                    $scope.friends = friendFriends;
                });
            }
        }

        getFriendFriends();

        $scope.getUserPreview = function (userName) {
            userServices.getUserPreview(userName, headers, function (userPreview) {
                $scope.userPreview = userPreview;
            });
        };

        $scope.inviteFriend = function (userName) {
            profileServices.SendFriendRequest(userName, headers, function () {
                $scope.userPreview.hasPendingRequest = true;

                if ($scope.person) {
                    $scope.person.hasPendingRequest = true;
                }
            });
        };
    }
});