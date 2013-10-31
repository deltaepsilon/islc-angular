'use strict';

angular.module('islcAngularApp')
  .directive('qvSanitize', function ($timeout, $sanitize) {
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          var sanitized = $sanitize(element.text());
          element.text(sanitized);
        });

      }
    };
  });
