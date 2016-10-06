(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', '$rootScope', 'DashboardService', 'SchemaService', '$location', '$http', '$compile', '$timeout', '$routeParams'];

  function EditorController($scope, $rootScope, DashboardService, SchemaService, $location, $http, $compile, $timeout, $routeParams) {

    var editorEle = $('.dash-editor');

    var chartTemplateUrl = 'js/modules/editor/editor-chart-ui.html';
    var tableTemplateUrl = 'js/modules/editor/editor-table-ui.html';

    $scope.editorType = 'dashboard';

    $scope.editData = { schema: { name: '', tables: [] }, dashboard: { name: '', components: [] } };

    $scope.saveDashboard = function() {

      DashboardService.addDashboard($scope.editData.dashboard);

      $rootScope.$broadcast('dashboard-added');

      $rootScope.$broadcast('disable-edit-mode');

      $location.path('/');
    };

    $scope.saveSchema = function() {
      var tables = [];
      var selectedFields = [];
      var conditionalField = '';
      
      ng.forEach($scope.editData.schema.tables, function(table) {

        conditionalField = table.Metadata.columns.filter(function(field) {
          return field.joined;
        })[0].name;
        
        selectedFields = table.Metadata.columns.filter(function(field) {
          return field.selected;
        }).map(function(field) {
          return field.name;
        });

        tables.push({ table: table.Metadata.table, fields: selectedFields, conditionalField: conditionalField });
      });

      SchemaService.addSchema({ name: $scope.editData.schema.name, queryData: tables });

      $rootScope.$broadcast('schema-added');

      $rootScope.$broadcast('enable-edit-mode', { type: 'dashboard' });
    };

    $scope.cancel = function() {
      $rootScope.$broadcast('disable-edit-mode');
    };

    $scope.$on('enable-edit-mode', function(event, data) {
        $scope.editorType = data.type;
    });

    $scope.onDrop = function(draggedItemType, draggedItemData) {
      if(draggedItemType === 'dataobject') {
        createTableForData(JSON.parse(draggedItemData));
      } else if(draggedItemType === 'chart') {
        addChart(JSON.parse(draggedItemData));
      }
    };

    $scope.getRowIconClass = function(column) {
      var className = 'fa fa-font';
      if(column.type === 'int' || column.type === 'number') {
        className = 'fa fa-hashtag';
      } else if(column.type === 'date' || column.type === 'datetime'){
        className = 'fa fa-calendar';
      } else {
        className = 'fa fa-font';
      }

      return className;
    };

    $scope.toggleTableField = function(column) {
      column.selected = !column.selected;
    };

    $scope.addDimensions = function($event) {
      alert('add dimnensions');
    };

    $scope.addMeasure = function() {
      alert('add measure');
    };

    function createTableForData(data) {
      var tableData = ng.copy(data);
      ng.forEach(tableData.Metadata.columns, function(column) {
        column.selected = false;
      });

      $scope.editData.schema.tables.push(tableData);
      
      $http.get(tableTemplateUrl)
      .then(function(res) {
        var _scope = $scope.$new(false);
        _scope.tableData = $scope.editData.schema.tables[$scope.editData.schema.tables.length-1];
        var _table = $compile(res.data)(_scope);
        _table.appendTo(editorEle);
      });

      $timeout(function() {
        editorEle.find('table').draggable({ handle: 'thead' });
      }, 1000);
    }

    function addChart(data) {
      var _scope = null;
      $http.get(chartTemplateUrl)
      .then(function(res) {
        
        _scope = $scope.$new(false);
        _scope.chartData = data;
        _scope.chartData.cIndex = $scope.editData.dashboard.components.length;
        
        var _chart = $compile(res.data)(_scope);
        _chart.appendTo(editorEle);

        _scope.chartData.el = _chart;

        $scope.editData.dashboard.components.push({
          type: 'chart',
          subtype: data.type,
          title: '',
          data: { },
          width: 300,
          height: 300,
          sizeX: 2,
          sizeY: 2,
          row: 0,
          col: 0
        });

        $timeout(function() {
          editorEle.find('.editor-chart-container')
          .draggable()
          .resizable({
            resize: function(event, ui) {
              _scope.chartData.width = ui.size.width;
              _scope.chartData.height = ui.size.height;
            }
          });
        }, 1000);
      });
    }

    $scope.removeChart = function(chartData) {
      $scope.editData.dashboard.components.splice(chartData.cIndex, 1);
      chartData.el.remove();
    };

  }

})(angular);