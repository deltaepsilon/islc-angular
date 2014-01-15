'use strict';

angular.module('islcAngularApp')
  .directive('qvHref', function () {
    return {
      restrict: 'A',
      scope: {
        qvHref: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('qvHref', function () {
          element.attr('href', scope.qvHref);
        });
      }
    };
  });
