(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('radarChart', RadarChart);

  RadarChart.$inject = [];

  function RadarChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div><h2>{{title}}</h2><canvas id="radarChart" width="{{width}}" height="{{height}}"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {
      
      var options = {
        scale: {
          reverse: true,
          ticks: {
            beginAtZero: true
          }
        },// maintainAspectRatio: false,
        responsive: false
      };

      var ctx = $($ele).find('#radarChart')[0].getContext('2d');

      new Chart(ctx, {
        type: 'radar',
        data: $scope.chartData,
        options: options
      });
    }

    return _directive;
  }

})(angular);