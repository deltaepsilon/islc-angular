'use strict';

angular.module('islcAngularApp')
  .service('cartService', function cartService(Restangular, $rootScope) {

    Restangular.setBaseUrl('/angular');

    return {
      get: function (force) {
        if (!force && $rootScope.cart) {
          return $rootScope.cart;
        } else {
          return Restangular.one('cart').get();
        }

      },

      add: function (productId, quantity) {
        var query = {
          product_id: productId,
          quantity: quantity || 1
        }
        return Restangular.all('cart').post(query);
      },

      update: function (productId, quantity) {
        var query = {
          product_id: productId,
          quantity: quantity
        }
        return Restangular.all('cart/update').post(query);
      },

      setDiscount: function (code) {
        return Restangular.all('discount').post({code: code});
      },

      checkout: function () {
        return Restangular.all('stripe/checkout').get();
      }
    }
  });
