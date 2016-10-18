(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('chartistLineChart', ChartistLineChart);

  ChartistLineChart.$inject = [];

  function ChartistLineChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div gridster-dynamic-height item="chartData"><h2>{{title}}</h2><div id="chartistLineChart"></div></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {

      var options = {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        width: $scope.width + 'px',
        height: $scope.height + 'px'
      };

      var ele = $($ele).find('#chartistLineChart');

      new Chartist.Line('#chartistLineChart', $scope.chartData, options);
    }

    return _directive;
  }

})(angular);