'use strict';

angular.module('islcAngularApp')
  .controller('IFrameCtrl', function ($scope, $rootScope) {
    $scope.iFrameLoad = function (target) {
      $rootScope.$broadcast('iFrameLoad', target);
    };
  });
