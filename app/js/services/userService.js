'use strict';

socialNetwork.factory('userServices', function($http, baseServiceUrl) {
    var userServices = {};

    var userServicesUrl = baseServiceUrl + "/users";

    userServices.searchUserByName = function(searchName,headers,success) {
        $http.get(userServicesUrl + '/search?searchTerm=' + searchName, { headers: headers })
            .success(function (findPeople) {
                success(findPeople);
        });
    };

    return userServices;
});