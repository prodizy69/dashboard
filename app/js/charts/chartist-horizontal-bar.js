(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('chartistHorizontalBarChart', ChartistHorizontalBarChart);

  ChartistHorizontalBarChart.$inject = [];

  function ChartistHorizontalBarChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div gridster-dynamic-height item="chartData"><h2>{{title}}</h2><div id="chartistHorizontalBarChart"></div></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {

      var options = {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        },
        width: $scope.width + 'px',
        height: $scope.height + 'px'
      };

      new Chartist.Bar('#chartistHorizontalBarChart', $scope.chartData, options);
    }

    return _directive;
  }

})(angular);