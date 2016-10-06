(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'DashboardService'];

  function DashboardController($scope, $rootScope, $routeParams, $location, DashboardService) {

    var dashboardId = $routeParams.dashboardId || 1;
    DashboardService
    .getDashboards()
    .then(function(dashboards) {
      $scope.dashboardData = dashboards.filter(function(d) {
        return d.id === dashboardId;
      })[0];
    });

    $scope.createDashboard = function() {
      $rootScope.$broadcast('enable-edit-mode', { type: 'dashboard' });
      $location.path('editor');
    };

    $scope.createSchema = function() {
      $rootScope.$broadcast('enable-edit-mode', { type: 'schema' });
      $location.path('editor');
    };

  }

})(angular);