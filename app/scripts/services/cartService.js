'use strict';

angular.module('islcAngularApp')
  .service('cartService', function cartService(Restangular, $rootScope) {

    Restangular.setBaseUrl('/angular');

    return {
      get: function () {
        return Restangular.one('cart').get();
      },

      add: function (productId, quantity) {
        var query = {
          product_id: productId,
          quantity: quantity || 1
        }
        return Restangular.all('cart').post(query);
      }
    }
  });
