(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('SchemaService', SchemaService);

  SchemaService.$inject = ['$http', '$q'];

  function SchemaService($http, $q) {

    var schemasUrl = 'config/schema.json';

    this.schemas = [];

    this.getSchemas = function() {
      var deferred = $q.defer();
      var self = this;

      if(this.schemas.length) {
        return $q.when(self.schemas);
      } else {
        $http.get(schemasUrl)
        .then(function(res) {
          self.schemas = res.data.schemas;
          deferred.resolve(res.data.schemas);
        });
      }

      return deferred.promise;
    }

    this.addSchema = function(schema) {
      schema.id = this.schemas.length + 1;
      this.schemas.push(schema);
    }

  }

})(angular);