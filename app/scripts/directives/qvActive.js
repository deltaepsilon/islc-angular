'use strict';

angular.module('islcAngularApp')
  .directive('qvActive', function ($rootScope, $state, $stateParams, $timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function () {
          var sref = attrs.uiSref,
            condition = attrs.csActive || '',
            parts = condition.split('|'),
            key = parts[0],
            value = parts[1],
            evaluate = function () {
              if (!condition.length && $state.is(sref)) {
                element.addClass('active');
              } else if (condition.length && $stateParams[key] === value) {
                element.addClass('active');
              } else {
                element.removeClass('active');
              }

            };

          evaluate();

          $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            evaluate();
          });
        });

      }
    };
  });
