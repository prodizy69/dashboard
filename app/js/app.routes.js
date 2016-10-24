(function(ng) {

	'use strict';

	ng.module('dashly')

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

		.when('/', {
			templateUrl: 'js/modules/home/home.html',
			controller: 'HomeController'
		})

		.when('/dashboard/:dashboardId', {
			templateUrl: 'js/modules/dashboard/dashboard.html',
			controller: 'DashboardController'
		})

		.when('/editor', {
			templateUrl: 'js/modules/editor/editor.html',
			controller: 'EditorController'
		})

		.when('/users', {
			templateUrl: 'js/modules/users/users.html',
			controller: 'UserController'
		})
		
		.otherwise({
			redirectTo: '/'
		});

	}]);

})(angular);