/**
 * Created by Sateesh on 9/29/2016.
 */
(function(ng) {

    'use strict';

    ng.module('dashly')

        .controller('userController', userController);

    userController.$inject = ['$scope', '$location'];

    function userController($scope) {

        $scope.users={users:[{'name':'Lenin','role':'End User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'},
            {'name':'Shekar','role':'End User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'},
            {'name':'Suhesh','role':'Super User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'},
            {'name':'Boris','role':'Super User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'},
            {'name':'Michel','role':'End User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'},
            {'name':'John','role':'Super User','check1':'Can update User Privileges','check2':'Can create Data Model','check3':'Can create Dashboard','check4':'View Only'}]}

    }

})(angular);