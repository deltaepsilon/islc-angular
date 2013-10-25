'use strict';

angular.module('islcAngularApp')
  .controller('ProductCtrl', function ($scope, $rootScope, $stateParams, products) {
    $scope.category = undefined;

    if ($stateParams.id) {
      $scope.product = products;
    } else {
      $rootScope.products = products;
    }

    $scope.isActive = function (category) {
      return $scope.category === category;
    }

    $scope.filterProducts = function (category) {
      console.log('setting', category);
      $scope.category = category;
    };

  });
