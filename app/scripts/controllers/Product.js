'use strict';

angular.module('islcAngularApp')
  .controller('ProductCtrl', function ($scope, $rootScope, $stateParams, products, cartService, productService, notificationService) {
    $scope.category = $stateParams.category;

    if ($stateParams.slug) {
      $scope.product = products;
      console.log('product', products);
      if ($scope.product.available === undefined) {
        $scope.infiniteAvailable = true;
      } else if ($scope.product.available === 0) {
        $scope.outOfStock = true;
      }
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

    $rootScope.addToCart = function (id, quantity) {
      cartService.clearCache();
      cartService.add(id, quantity).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else if (cart.products) {
          $rootScope.cart = cart;

          //Force update the products list. This is critical to capture any changes resulting from the cart transaction.
          productService.clearCache($stateParams.slug);
          productService.get($stateParams.slug).then(function (res) {
            if (res.error) {
              notificationService.error('Products', res.error);
            } else {
              if ($stateParams.slug) {
                $scope.product = res;
              } else {
                $scope.products = res;
              }

            }
          });
        }

      });
    }

    $scope.isOutOfStock = function (product) {
      if (product.available === undefined) {
        return false;
      } else if (product.available === 0) {
        return true;
      }
      return false;
    }

  });
