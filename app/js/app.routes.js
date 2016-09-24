(function(ng) {

	'use strict';

	ng.module('dashly')

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

		.when('/', {
			templateUrl: 'js/modules/dashboard/dashboard.html',
			controller: 'DashboardController'
		})

		// .otherwise({
		// 	redirectTo: '/'
		// });

	}]);

})(angular);