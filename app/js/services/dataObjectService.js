(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('DataObjectService', DataObjectService);

  DataObjectService.$inject = ['$http', '$q'];

  function DataObjectService($http, $q) {

    var dataObjectsUrl = 'config/dataobjects.json';

    this.dataObjects = [];

    this.getDataObjects = function() {
      var deferred = $q.defer();
      var self = this;

      if(this.dataObjects.length) {
        return $q.when(self.charts);
      } else {
        $http.get(dataObjectsUrl)
        .then(function(res) {
          self.dataObjects = res.data.dataObjects;
          deferred.resolve(res.data.dataObjects);
        });
      }

      return deferred.promise;
    }

  }

})(angular);