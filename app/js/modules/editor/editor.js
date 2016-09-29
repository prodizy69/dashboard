(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope'];

  function EditorController($scope) {

    $scope.dInfo = { name: 'New Dashboard' };
    
  }

})(angular);