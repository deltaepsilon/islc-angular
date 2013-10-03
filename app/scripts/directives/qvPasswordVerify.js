'use strict';

angular.module('islcAngularApp')
  .directive('qvPasswordVerify', function () {
    return {
      restrict: 'A',
      scope: {
        qvPasswordVerify: '=',
        formVerification: '=',
        passwordVerification: '='
      },
      link: function postLink(scope, element, attrs) {
        var verify = function () {
          if (scope.formVerification.$dirty) {
            if (element.val() !== scope.qvPasswordVerify) {
              scope.formVerification.$error.verify = true;
            } else {
              scope.formVerification.$error.verify = undefined;
              scope.$apply();
            }

          }

        };

        scope.$watch('qvPasswordVerify', verify);
        element.on('keyup', verify);
        element.on('keyup', function () {
          scope.passwordVerification = element.val();
        });

      }
    };
  });
