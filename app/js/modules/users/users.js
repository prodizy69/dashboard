/**
 * Created by Sateesh on 9/29/2016.
 */
(function(ng) {

    'use strict';

    ng.module('dashly')

    .controller('UserController', UserController);

    UserController.$inject = ['$scope', 'UserService'];

    function UserController($scope, UserService) {

        function getUsers() {
            UserService.getUsers()
            .then(function(users) {
                $scope.users = users;
            });
        }

        getUsers();
    }

})(angular);