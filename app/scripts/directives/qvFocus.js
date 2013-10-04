'use strict';

angular.module('islcAngularApp')
  .directive('qvFocus', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          element[0].focus();
        });

      }
    };
  });
