(function(ng) {

	'use strict';

	ng.module('dashly')

	.directive('leftNav', LeftNavDirective);

	LeftNavDirective.$inject = ['$rootScope', 'DashboardService', 'SchemaService', 'ChartService', '$location'];

	function LeftNavDirective($rootScope, DashboardService, SchemaService, ChartService, $location) {
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
                    $rootScope.$broadcast('load-dashboard', { data: dashboards[0] });
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

            $scope.handleNavClick = function(type, data) {
                $location.path('/');
                if(type === 'dashboard') {
                    $scope.selectedDashboard = data;
                    $rootScope.$broadcast('load-dashboard', { data: data });
                }
            };

            getDashboards();
            getSchemas();
            getCharts();

            $scope.routeUsers= function () {
                $location.path('users.html');
            }

            $scope.$on('dashboard-added', getDashboards);

        }

        return _directive;

	}

})(angular);