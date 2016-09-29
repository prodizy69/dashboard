(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$location'];

  function HomeController($scope, $location) {

    $scope.createDashboard = function() {
      $location.path('editor');
    };

    $scope.$on('load-dashboard', function(event, eventData) {
      $scope.dashboardData = eventData.data; 
    });

  }

})(angular);