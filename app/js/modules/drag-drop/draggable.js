(function(ng) {

  'use strict';

  ng.module('dashly')

  .directive('draggable', Draggable);

  Draggable.$inject = [];

  function Draggable() {

    var _directive = {};

    _directive.restrict = 'A';
    _directive.scope = {};
    _directive.link = linkFn;

    function linkFn($scope, $element, $attrs) {
      
      var el = $element[0];
      
      el.draggable = true;
      
      el.addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('drag-data', $(this).attr('drag-data'));
        e.dataTransfer.setData('drag-data-type', $(this).attr('drag-data-type'));

        this.classList.add('drag');
        return false;
      }, false);
      
      el.addEventListener('dragend', function(e) {
        this.classList.remove('drag');
        return false;
      }, false);
    }

    return _directive;
  }

})(angular);