(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('doughnutChart', DoughnutChart);

  DoughnutChart.$inject = [];

  function DoughnutChart() {
    var _directive = {};

    _directive.restrict = 'AE';
    _directive.scope = { chartData: '=', title: '=', width: '=', height: '=' };
    _directive.template = '<div><h2>{{title}}</h2><canvas id="doughnutChart" width="{{width}}" height="{{height}}"></canvas></div>'
    _directive.link = linkFn;

    function linkFn($scope, $ele, $attrs) {
      
      var doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
      };

      var doughnutData = $scope.data || [
        {
          value: 300,
          color: "#a3e1d4",
          highlight: "#1ab394",
          label: "App"
        },
        {
          value: 50,
          color: "#dedede",
          highlight: "#1ab394",
          label: "Software"
        },
        {
          value: 100,
          color: "#A4CEE8",
          highlight: "#1ab394",
          label: "Laptop"
        }
      ];

      new Chart($($ele).find('#doughnutChart')[0].getContext('2d'))
          .Doughnut(doughnutData, doughnutOptions);
    }

    return _directive;
  }

})(angular);