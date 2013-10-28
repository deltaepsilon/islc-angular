'use strict';

angular.module('islcAngularApp')
  .controller('ProductCtrl', function ($scope, $rootScope, $stateParams, products) {
    $scope.category = $stateParams.category;

    if ($stateParams.id) {
      $scope.product = products;
    } else {
      $rootScope.products = products;
    }

    $scope.isActive = function (category) {
      return $scope.category === category;
    }

    $scope.filterProducts = function (category) {
      $scope.category = category;
    };

    $scope.selectImage = function (index) {
      var newImage,
        oldImage;

      if ($scope.product && $scope.product.images && index) {
        newImage = $scope.product.images.splice(index, 1);
        newImage = newImage[0];

        oldImage = $scope.product.images.splice(0, 1);
        oldImage = oldImage[0];

        $scope.product.images.unshift(newImage);
        $scope.product.images.splice(index, 0, oldImage);
        console.log($scope.product.images[index]);
      }

    }

  });
