'use strict';

angular.module('islcAngularApp')
  .directive('qvDisable', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          var selector = attrs.qvDisable,
            reactivate = attrs.qvDisableReactivate,
            body = angular.element(document.body);

          element.on('click', function () {
            body.find(selector).addClass('disabled').attr('disabled', true);
            element.attr('disabled', true);

          });

          if (reactivate) {
            scope.$on(reactivate, function () {
              body.find(selector).removeClass('disabled').removeAttr('disabled');
              element.removeAttr('disabled');
            });
          }



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
