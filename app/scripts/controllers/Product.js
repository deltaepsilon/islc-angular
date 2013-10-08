'use strict';

angular.module('islcAngularApp')
  .controller('ProductCtrl', function ($scope, $rootScope, $stateParams, products) {
    if ($stateParams.id) {
      $scope.product = products;
    } else {
      $rootScope.products = products;
    }

  });
