(function(ng) {

	'use strict';

	ng.module('dashly')

	.directive('leftNav', LeftNavDirective);

	LeftNavDirective.$inject = ['$rootScope', '$routeParams', 'DashboardService', 'SchemaService', 'ChartService', 'DataObjectService', '$location', '$timeout'];

	function LeftNavDirective($rootScope, $routeParams, DashboardService, SchemaService, ChartService, DataObjectService, $location, $timeout) {
        var _directive = {};

        _directive.restrict = 'AE';
        _directive.scope = {};
        _directive.link = linkFn;
        _directive.templateUrl = 'js/modules/leftnav/leftnav.html';

        function linkFn($scope, $element, $attrs) {

            $scope.selectedDashboard = null;
            $scope.selectedSchema = null;

            function getDashboards() {
                DashboardService.getDashboards()
                .then(function(dashboards) {
                    $scope.dashboards = dashboards;
                    $scope.selectedDashboard = dashboards[0];
                    // $location.path('/dashboard/' + dashboards[0].id);
                });
            }

            function getDataObjects() {
                DataObjectService.getDataObjects()
                .then(function(dataObjects) {
                    $scope.dataObjects = dataObjects;
                });
            }

            function getSchemas() {
                SchemaService.getSchemas()
                .then(function(schemas) {
                    $scope.schemas = schemas;
                });
            }

            function getCharts() {
                ChartService.getCharts()
                .then(function(charts) {
                    $scope.charts = charts;
                });
            }

            $scope.showUsers = function() {
                $location.path('/users');
            };

            $scope.showDashboard = function(data) {
                $scope.selectedDashboard = data;
                $location.path('/dashboard/' + data.id).search({});
            };

            $scope.enableSchemaEditMode = function() {
                $rootScope.$broadcast('enable-edit-mode', { type: 'schema' })
                $location.path('editor/schema');
            };

            getDashboards();
            getSchemas();
            getCharts();
            getDataObjects();

            $scope.routeUsers= function () {
                $location.path('users.html');
            }

            $scope.$on('dashboard-added', getDashboards);
            $scope.$on('schema-added', getSchemas);

            $scope.$on('enable-edit-mode', function(event, data) {
                $scope.editType = data.type || $routeParams.type;
                $scope.editMode = true;
            });

            $scope.$on('disable-edit-mode', function(event, data) {
                $location.search({});
                $scope.editMode = false;
                $scope.showDashboard($scope.dashboards[0]);
            });

            $timeout(function() {
                ng.element('#side-menu').metisMenu();
            }, 1000);
        }

        return _directive;

	}

})(angular);
