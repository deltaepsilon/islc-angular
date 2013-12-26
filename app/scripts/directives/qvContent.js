'use strict';

angular.module('islcAngularApp')
  .directive('qvContent', function () {
    return {
      restrict: 'A',
      scope: {
        qvContent: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('qvContent', function () {
          element.attr('content', scope.qvContent);
        });
      }
    };
  });
