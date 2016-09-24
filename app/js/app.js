(function(ng) {

	'use strict';

	ng.module('dashly', ['ngRoute'])

	.config(['$locationProvider', function($locationProvider) {
		
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

	}])

	.controller('AppController', AppController);

	AppController.$inject = ['$scope'];

	function AppController($scope) {

	}

	(function bootstrapApp() {

		ng.element(document).ready(function() {
      ng.bootstrap(document, ["dashly"], {
          strictDi: true
      });
    });

	})();

})(angular);