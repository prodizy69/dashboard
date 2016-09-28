(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('polarChart', PolarChart);

  PolarChart.$inject = [];

  function PolarChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div><h2>{{title}}</h2><canvas id="polarChart" width="{{width}}" height="{{height}}"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {
      
      var polarOptions = {
        scaleShowLabelBackdrop: true,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: true,
        scaleBackdropPaddingY: 1,
        scaleBackdropPaddingX: 1,
        scaleShowLine: true,
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
      };

      var ctx = $($ele).find('#polarChart')[0].getContext('2d');

      new Chart(ctx, {
        type: 'polarArea',
        data: $scope.chartData,
        options: polarOptions
      });
    }

    return _directive;
  }

})(angular);