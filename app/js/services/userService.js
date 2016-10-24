(function(ng) {

  'use strict';

  ng.module('dashly')

  .service('UserService', UserService);

  UserService.$inject = ['$http', '$q'];

  function UserService($http, $q) {

    var usersUrl = 'config/users.json';

    this.users = [];

    this.getUsers = function() {
      var deferred = $q.defer();
      var self = this;

      if(this.users.length) {
        return $q.when(self.users);
      } else {
        $http.get(usersUrl)
        .then(function(res) {
          self.users = res.data.users;
          deferred.resolve(res.data.users);
        });
      }

      return deferred.promise;
    }

  }

})(angular);