(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {

    $scope.welcomeText = 'Welcome Boris !'

  }

})(angular);