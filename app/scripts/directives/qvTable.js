'use strict';
angular.module('islcAngularApp')
  .directive('qvTable', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/directives/qv-table.html',
      scope: {
        table: '=qvTable'
      }
    };
  });