(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('chartistGuageChart', ChartistGuageChart);

  ChartistGuageChart.$inject = [];

  function ChartistGuageChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div gridster-dynamic-height item="chartData"><h2>{{title}}</h2><div id="chartistGuageChart"></div></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {

      var options = {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        total: 200,
        showLabel: false,
        width: $scope.width + 'px',
        height: $scope.height + 'px'
      };

      new Chartist.Pie('#chartistGuageChart', $scope.chartData, options);
    }

    return _directive;
  }

})(angular);