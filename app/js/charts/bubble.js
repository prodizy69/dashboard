(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('bubbleChart', BubbleChart);

  BubbleChart.$inject = [];

  function BubbleChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div><h2>{{title}}</h2><canvas id="bubbleChart" width="{{width}}" height="{{height}}"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {
      
      var options = {
        elements: {
          points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
          }
        },
        maintainAspectRatio: true,
        responsive: false
      };

      var ctx = $($ele).find('#bubbleChart')[0].getContext('2d');

      ctx.canvas.width = $scope.width;
      ctx.canvas.height = $scope.height;

      new Chart(ctx, {
        type: 'bubble',
        data: $scope.chartData,
        options: options
      });
    }

    return _directive;
  }

})(angular);