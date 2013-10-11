'use strict';

angular.module('islcAngularApp')
  .controller('CartCtrl', function ($scope, $rootScope, cartService, notificationService, moment, cart) {
    if (!$rootScope.cart) {
      $rootScope.cart = cart;
    }


    var i =  10,
      year = moment().year(),
      year = moment().year(),
      setDefaults = function () {
        $scope.newCard = {
          year: $scope.years[0],
          month: 0
        };

      };
    $scope.years = [];
    while (i--) {
      $scope.years.unshift(i + year);
    }

    $scope.months = ['January (1)', 'February (2)', 'March (3)', 'April (4)', 'May (5)', 'June (6)', 'July (7)', 'August (8)', 'September (9)', 'October (10)', 'November (11)', 'December (12)'];
    setDefaults();

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
    };

    $scope.setCode = function (code) {
      cartService.setDiscount(code).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else {
          $rootScope.cart = cart;
        }
      });
    };

    $scope.setCard = function (card) {
      console.log('setting card', card);
    };

    $scope.checkout = function (cart) {
      console.log('cart', cart);
    };

  });
