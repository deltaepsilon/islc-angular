'use strict';

angular.module('islcAngularApp')
  .directive('qvFile', function ($rootScope) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('change onload', function () {
          $rootScope.$broadcast(attrs.qvFile, element.val());

        });

      }
    };
  });
