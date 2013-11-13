'use strict';

angular.module('islcAngularApp')
  .directive('qvDisable', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          var selector = attrs.qvDisable,
            body = angular.element(document.body);

          element.on('click', function () {
            body.find(selector).addClass('disabled').attr('disabled', true);
            element.attr('disabled', true);

          });

          if (attrs.stopPropagation || attrs.preventDefault) {
            element.on('click', function (e) {
              e.preventDefault();
              e.target.stopPropagation();
            });
          }

        });

      }
    };
  });
