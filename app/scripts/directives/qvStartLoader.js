'use strict';

angular.module('islcAngularApp')
  .directive('qvStartLoader', function ($rootScope) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on(attrs.qvStartLoader || 'click', $rootScope.startLoader);
      }
    };
  });
