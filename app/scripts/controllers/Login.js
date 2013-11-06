'use strict';

angular.module('islcAngularApp')
  .controller('LoginCtrl', function ($scope, $state, $stateParams, $timeout) {
    $timeout(function () {
      $scope.redirect = '#!' + ($scope.$previousState ? $scope.$previousState.url : '/');
      $scope.origin = '#!' + ($state.current.url || '/');
      $scope.token = $stateParams.token;
    });


  });
