(function(ng) {

    'use strict';

    ng.module('dashly')

    .directive('gridsterDynamicHeight', GridsterDynamicHeight);

    GridsterDynamicHeight.$inject = [];

    function GridsterDynamicHeight() {

        var directive = {
            restrict: 'A',
            scope: { item: "=" },
            link: linkFn
        };
        
        function linkFn(scope, element, attrs) {

            scope.$watch(function() {

                return element[0].scrollHeight;
            },
            function(newVal, oldVal) { 

                var rowHeightOption = 75; // Change this value with your own rowHeight option
                var height = rowHeightOption * scope.item.sizeY;
                if(newVal > height){

                    var div = Math.floor(newVal / rowHeightOption);
                    div++;
                    scope.item.sizeY = div; 
                }
            });
        }

        return directive;
    }

})(angular);