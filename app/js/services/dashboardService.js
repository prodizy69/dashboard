(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http', '$q'];

  function DashboardService($http, $q) {

    var dashboardsUrl = 'config/dashboards.json';

    this.dashboards = [];

    this.getDashboards = function() {
      var deferred = $q.defer();
      var self = this;

      if(this.dashboards.length) {
        return deferred.resolve(self.dashboards);
      } else {
        $http.get(dashboardsUrl)
        .then(function(res) {
          self.dashboards = res.data.dashboards;
          deferred.resolve(res.data.dashboards);
        });
      }

      return deferred.promise;
    }

    this.addDashboard = function(dashboard) {
      this.dashboards.push(dashboard);
    }

  }

})(angular);