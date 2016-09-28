(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http'];

  function DashboardService($http) {

    var dashboardsUrl = 'config/dashboards.json';

    this.getDashboards = function() {
      return $http.get(dashboardsUrl);
    }

  }

})(angular);