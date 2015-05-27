'use strict';

socialNetwork.controller('UserController', function($scope, $location, authentication,
    profileServices, postServices, userServices, $routeParams) {

    var headers = authentication.GetHeaders();  

    $scope.searchUserByName = function (name) {
        if (name) {
            userServices.searchUserByName(name, headers, function(findPeople) {
                $scope.findPeople = findPeople;
            });
        }
    };

    function getUserWall() {
        var userName = $routeParams.userName;
        if (userName) {
            userServices.getPersonData(userName, headers, function (person) {
                $scope.person = person;         
                getFriendFriendsPreview();
            });
            userServices.getUserPosts(userName, headers, function (postsData) {
                $scope.postsData = postsData;
            });

            var getFriendFriendsPreview = function () {
                if ($scope.person.isFriend) {
                    userServices.getFriendFriendsPreview(userName, headers, function(friendFriendsPreview) {
                        $scope.friendFriendsPreview = friendFriendsPreview;
                    });
                }
            }            

            $scope.sendFriendRequest = function() {
                profileServices.SendFriendRequest(userName, headers, function() {
                    $scope.person.hasPendingRequest = true;
                });
            };
        }
    }

    getUserWall();

    function getFriendFriends() {
        var userName = $routeParams.userName;
        if ($location.path() === '/user/'+userName+'/friends') {
            userServices.getFriendFriends(userName, headers, function(friendFriends) {
                $scope.friends = friendFriends;
            });
        }
    }

    getFriendFriends();
});