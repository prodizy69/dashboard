(function(ng) {

	'use strict';

	ng.module('dashly')

	.directive('leftNav', LeftNavDirective);

	LeftNavDirective.$inject = ['$rootScope', 'DashboardService'];

	function LeftNavDirective($rootScope, DashboardService) {
        var _directive = {};

        _directive.restrict = 'AE';
        _directive.scope = {};
        _directive.link = linkFn;
        _directive.templateUrl = 'js/modules/leftnav/leftnav.html';

        function linkFn($scope, $element, $attrs) {

            $scope.selectedDashboard = null;

            function getDashboards() {
                DashboardService.getDashboards()
                .then(function(dashboards) {
                    $scope.dashboards = dashboards;
                    $scope.selectedDashboard = dashboards[0];
                    $rootScope.$broadcast('load-dashboard', { data: dashboards[0] });
                });
            }

            $scope.handleNavClick = function(type, data) {
                if(type === 'dashboard') {
                    $scope.selectedDashboard = data;
                    $rootScope.$broadcast('load-dashboard', { data: data });
                }
            };

            getDashboards();

            $scope.$on('dashboard-added', getDashboards);

        }

        return _directive;

	}

})(angular);