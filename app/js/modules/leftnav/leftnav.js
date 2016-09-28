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

            DashboardService.getDashboards()
            .then(function(res) {
                $scope.dashboards = res.data.dashboards;
            });

            $scope.handleNavClick = function(type, data) {
                if(type === 'dashboard') {
                    $rootScope.$broadcast('load-dashboard', { data: data });
                }
            };

        }

        return _directive;

	}

})(angular);