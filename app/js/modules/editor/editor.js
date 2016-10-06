(function(ng) {

  'use strict';

  ng.module('dashly')

  .controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', '$rootScope', 'DashboardService', 'SchemaService', '$location', '$http', '$compile', '$timeout', '$routeParams'];

  function EditorController($scope, $rootScope, DashboardService, SchemaService, $location, $http, $compile, $timeout, $routeParams) {

    var editorEle = $('.dash-editor');
    var linkLine = editorEle.find('#link-line');

    var chartTemplateUrl = 'js/modules/editor/editor-chart-ui.html';
    var tableTemplateUrl = 'js/modules/editor/editor-table-ui.html';

    $scope.editorType = 'dashboard';

    $scope.editData = { schema: { tables: [] }, charts: [] };

    $scope.saveDashboard = function() {

      var dashboard = {};

      dashboard.name = $scope.editData.name;
      
      DashboardService.addDashboard(dashboard);

      $rootScope.$broadcast('dashboard-added');

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

      SchemaService.addSchema({ name: $scope.editData.name, queryData: tables });

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
        createChart(JSON.parse(draggedItemData));
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

    $scope.handleLinkMouseEvent = function(eventType, column) {
      if(eventType === 'click') {
        column.joined = !column.joined;
      }
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

    function createChart(data) {
      $http.get(chartTemplateUrl)
      .then(function(res) {
        var _scope = $scope.$new(false);
        _scope.chartData = data;
        var _table = $compile(res.data)(_scope);
        _table.appendTo(editorEle);
      });

      $timeout(function() {
        editorEle.find('.editor-chart-container')
        .draggable()
        .resizable();
      }, 1000);
    }

  }

})(angular);