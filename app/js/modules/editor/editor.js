(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', '$rootScope', 'DashboardService', '$location'];

  function EditorController($scope, $rootScope, DashboardService, $location) {

    $scope.dInfo = { name: 'New Dashboard', components: [] };
    var _chartType=$scope.dInfo.chart
    $scope.doughnutcomponents= [{
      "type": "chart",
      "subtype": "doughnut",
      "title": "Project - Doughnut",
      "data": {
        "labels": ["Red", "Blue", "Yellow"],
        "datasets": [{
          "data": [150, 505, 160],
          "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"],
          "hoverBackgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
      },
      "width": 600,
      "height": 600
    }];

    $scope.polarcomponents=[{
      "type": "chart",
      "subtype": "polar",
      "title": "Project Beta Progress - Polar",
      "data": {
        "datasets": [{
          "data": [1, 6, 17, 30, 4],
          "backgroundColor": ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
          "label": "Project Beta Progress - Polar"
        }],
        "labels": ["Red", "Green", "Yellow", "Grey", "Blue"]
      },
      "width": 600,
      "height": 600
    }];
    $scope.saveDashboard = function() {
      var dashboard = {};
      if($scope.dInfo.chart==='polar'){
        dashboard.components=$scope.polarcomponents;
      }else if($scope.dInfo.chart==='doughnut'){
        dashboard.components=$scope.doughnutcomponents;
      }
      dashboard.name = $scope.dInfo.name;


      
      DashboardService.addDashboard(dashboard);

      $rootScope.$broadcast('dashboard-added');

      $location.path('/');
    };
    
  }

})(angular);