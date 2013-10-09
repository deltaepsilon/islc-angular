'use strict';

angular.module('islcAngularApp')
  .controller('LoginCtrl', function ($scope, $state) {
    $scope.redirect = '#' + ($scope.$previousState || '/');
    $scope.origin = '#' + ($state.current.url || '/');

    console.log($scope.registerForm);
  });
