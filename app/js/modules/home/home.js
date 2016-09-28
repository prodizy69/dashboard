(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {

    $scope.$on('load-dashboard', function(event, eventData) {
      $scope.dashboardData = eventData.data; 
    });

  }

})(angular);