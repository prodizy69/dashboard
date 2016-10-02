(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('ChartService', ChartService);

  ChartService.$inject = ['$http', '$q'];

  function ChartService($http, $q) {

    var chartsUrl = 'config/charts.json';

    this.charts = [];

    this.getCharts = function() {
      var deferred = $q.defer();
      var self = this;

      if(this.charts.length) {
        return $q.when(self.charts);
      } else {
        $http.get(chartsUrl)
        .then(function(res) {
          self.charts = res.data.charts;
          deferred.resolve(res.data.charts);
        });
      }

      return deferred.promise;
    }

  }

})(angular);