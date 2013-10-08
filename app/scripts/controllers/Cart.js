'use strict';

angular.module('islcAngularApp')
  .controller('CartCtrl', function ($scope, $rootScope, cartService, notificationService, cart) {
    if (!$rootScope.cart) {
      $rootScope.cart = cart;
    }

    $scope.updateCart = function (id, quantity) {
      cartService.update(id, quantity || 0).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else {
          $rootScope.cart = cart;
        }
      });
    };

    $scope.updateCartProduct = function (product) {
      if (product.id && product.quantity) {
        $scope.updateCart(product.id, product.quantity);
      }
    }

    $scope.checkout = function (cart) {
      console.log('cart', cart);
    };

  });
