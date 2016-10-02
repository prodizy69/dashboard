(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('droppable', Droppable);

  Droppable.$inject = [];

  function Droppable() {

    var _directive = {};

    _directive.restrict = 'A';
    _directive.scope = { 'onDrop': '&' };
    _directive.link = linkFn;

    function linkFn($scope, $element, $attrs) {
      var el = $element[0];
      
      el.addEventListener('dragover', function(e) {
        e.dataTransfer.dropEffect = 'move';
        if (e.preventDefault) {
          e.preventDefault();
        }
        this.classList.add('over');
        return false;
      }, false);
      
      el.addEventListener('dragenter', function(e) {
        this.classList.add('over');
        return false;
      }, false);
      
      el.addEventListener('dragleave', function(e) {
        this.classList.remove('over');
        return false;
      }, false);
      
      el.addEventListener('drop', function(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
          
        this.classList.remove('over');
        
        var itemType = e.dataTransfer.getData('drag-data-type');
        var itemData = e.dataTransfer.getData('drag-data');
        // item.classList.remove('drag');
        // this.appendChild(item);
        
        $scope.$apply(function(scope) {
          var fn = scope.onDrop();
          if ('undefined' !== typeof fn) {            
            fn(itemType, itemData);
          }
        });
          
        return false;
      }, false);
    }

    return _directive;
  }

})(angular);