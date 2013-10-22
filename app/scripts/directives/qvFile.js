'use strict';

angular.module('islcAngularApp')
  .directive('qvFile', function ($rootScope) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('change', function () {
          $rootScope.$broadcast('fileChange', element.val());

        });
      }
    };
  });
