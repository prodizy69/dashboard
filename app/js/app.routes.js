(function(ng) {

	'use strict';

	ng.module('dashly')

	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

		.when('/', {
			templateUrl: 'js/modules/home/home.html',
			controller: 'HomeController',
            controllerAs: 'homeCtrl'
		})

		// .otherwise({
		// 	redirectTo: '/'
		// });

	}]);

})(angular);