(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('barChart', BarChart);

  BarChart.$inject = [];

  function BarChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div gridster-dynamic-height item="chartData"><h2>{{title}}</h2><canvas id="barChart" width="{{width}}" height="{{height}}" style="max-width: {{width}}px; max-height: {{height}}px;"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {

      var options = {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        maintainAspectRatio: true,
        responsive: true
      };

      var ctx = $($ele).find('#barChart')[0].getContext('2d');

      ctx.canvas.width = $scope.width;
      ctx.canvas.height = $scope.height;

      new Chart(ctx, {
        type: 'bar',
        data: $scope.chartData,
        options: options
      });
    }

    return _directive;
  }

})(angular);