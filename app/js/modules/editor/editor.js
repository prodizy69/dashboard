(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', '$rootScope', 'DashboardService', '$location'];

  function EditorController($scope, $rootScope, DashboardService, $location) {

    var editorEle = $('.dash-editor');

    $scope.editorType = 'dashboard';

    $scope.editData = {};

    $scope.work = { name: 'New Dashboard', components: [] };
    
    var _chartType = $scope.editData.chart;
    
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

      if($scope.editData.chart === 'polar'){
        dashboard.components = $scope.polarcomponents;
      } else if($scope.editData.chart==='doughnut'){
        dashboard.components = $scope.doughnutcomponents;
      }

      dashboard.name = $scope.editData.name;
      
      DashboardService.addDashboard(dashboard);

      $rootScope.$broadcast('dashboard-added');

      $location.path('/');
    };

    $scope.cancel = function() {
      $rootScope.$broadcast('disable-edit-mode');
      $location.path('/');
    };

    $scope.$on('enable-edit-mode', function(event, data) {
        $scope.editorType = data.type;
    });

    $scope.onDrop = function(draggedItemType, draggedItemData) {
      if(draggedItemType === 'dataobject') {
        var dataObject = JSON.parse(draggedItemData);

        createTableForData(dataObject.Metadata);
      }
    };

    function getRowIconClass(column) {
      var className = 'fa fa-font';
      if(column.type === 'int' || column.type === 'int') {
        className = 'fa fa-hashtag';
      } else if(column.type === 'date' || column.type === 'datetime'){
        className = 'fa fa-calendar';
      } else {
        className = 'fa fa-font';
      }

      return className;
    }
    
    function createTableForData(data) {
      var _table = $('<table class="schema-table"><thead><tr><th><span class="table-icon"><i class="fa fa-database" aria-hidden="true"></i></span><span class="table-title">'+data.table+'</span><span class="table-info"><i class="fa fa-info-circle" aria-hidden="true"></i></span></th></tr></thead><tbody></tbody></table>');
      var row, cell;
      ng.forEach(data.columns, function(column, trIndex) {
        _table.find('tbody').append('<tr><td><span class="tr-icon"><i class="'+getRowIconClass(column)+'" aria-hidden="true"></i></span><span class="tr-name">'+column.name+'</span><span class="tr-tools"><i class="fa fa-circle-thin" aria-hidden="true"></i><i class="fa fa-filter" aria-hidden="true"></i></span></td></tr>');
      });
      _table.appendTo(editorEle);
      _table.draggable({ handle: 'thead', cursor: 'crosshair' });
    }
  }

})(angular);