(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$rootScope', '$location'];

  function HomeController($scope, $rootScope, $location) {

    $scope.gridsterOptions = {
      margins: [20, 20],
      outerMargin: false,
      pushing: true,
      floating: true,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false,
        handles: ['n', 'e', 's', 'w', 'se', 'sw']
      }
    };

    $scope.standardItems = [
      { sizeX: 2, sizeY: 1, row: 0, col: 0 },
      { sizeX: 2, sizeY: 2, row: 0, col: 2 },
      { sizeX: 2, sizeY: 1, row: 2, col: 1 },
      { sizeX: 1, sizeY: 1, row: 2, col: 3 },
      { sizeX: 1, sizeY: 1, row: 2, col: 4 },
      { sizeX: 1, sizeY: 1, row: 0, col: 4 },
      { sizeX: 1, sizeY: 1, row: 0, col: 5 },
      { sizeX: 2, sizeY: 1, row: 1, col: 0 },
      { sizeX: 1, sizeY: 1, row: 1, col: 4 },
      { sizeX: 1, sizeY: 2, row: 1, col: 5 },
      { sizeX: 1, sizeY: 1, row: 2, col: 0 }
    ];

    $scope.createDashboard = function() {
      $rootScope.$broadcast('enable-edit-mode', { type: 'dashboard' });
      $location.path('editor');
    };

    $scope.createSchema = function() {
      $rootScope.$broadcast('enable-edit-mode', { type: 'schema' });
      $location.path('editor');
    };

    $scope.$on('load-dashboard', function(event, eventData) {
      $scope.dashboardData = eventData.data; 
    });

  }

})(angular);