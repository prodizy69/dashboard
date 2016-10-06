(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('doughnutChart', DoughnutChart);

  DoughnutChart.$inject = [];

  function DoughnutChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div gridster-dynamic-height item="chartData"><h2>{{title}}</h2><canvas id="doughnutChart" width="{{width}}" height="{{height}}" style="max-width: {{width}}px; max-height: {{height}}px;"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {
      
      var options = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        maintainAspectRatio: true,
        responsive: true
      };

      var ctx = $($ele).find('#doughnutChart')[0].getContext('2d');

      ctx.canvas.width = $scope.width;
      ctx.canvas.height = $scope.height;

      new Chart(ctx, {
        type: 'doughnut',
        data: $scope.chartData,
        options: options
      });
    }

    return _directive;
  }

})(angular);