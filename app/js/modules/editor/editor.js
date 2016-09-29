(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', '$rootScope', 'DashboardService', '$location'];

  function EditorController($scope, $rootScope, DashboardService, $location) {

    $scope.dInfo = { name: 'New Dashboard', components: [] };

    $scope.saveDashboard = function() {
      var dashboard = {};
      dashboard.name = $scope.dInfo.name;
      
      DashboardService.addDashboard(dashboard);

      $rootScope.$broadcast('dashboard-added');

      $location.path('/');
    };
    
  }

})(angular);