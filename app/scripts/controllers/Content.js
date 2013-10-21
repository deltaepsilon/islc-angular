'use strict';

angular.module('islcAngularApp')
  .controller('ContentCtrl', function ($rootScope, $scope, $stateParams, pages) {
    $scope.pages = pages;

  });
