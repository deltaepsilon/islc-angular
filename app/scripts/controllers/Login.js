'use strict';

angular.module('islcAngularApp')
  .controller('LoginCtrl', function ($scope, $state, $stateParams) {
    $scope.redirect = '#' + ($scope.$previousState || '/');
    $scope.origin = '#' + ($state.current.url || '/');
    $scope.token = $stateParams.token;

  });
