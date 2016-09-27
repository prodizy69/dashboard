(function(ng) {

	'use strict';

	ng.module('dashly')

	.directive('leftNav', LeftNavDirective);

	LeftNavDirective.$inject = [];

	function LeftNavDirective() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = {};
    _directive.link = linkFn;
    _directive.templateUrl = 'js/modules/leftnav/leftnav.html';

    function linkFn($scope, $element, $attrs) {

    }

    return _directive;

	}

})(angular);