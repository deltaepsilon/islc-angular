'use strict';

angular.module('islcAngularApp')
  .service('cartService', function cartService(Restangular, $rootScope, Analytics, $state) {

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

        Analytics.trackEvent('cart', $state.current.name, productId + '|' + quantity);

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
        var promise = Restangular.one('stripe/checkout').get();

        promise.then(function (transaction) {
          if (!transaction.error) {
            var affiliate = transaction.user.affiliate ? transaction.user.affiliate.affiliate : '',
              product,
              i = transaction.products.length,
              address = transaction.user.address || {};

            Analytics.addTrans(transaction.id, affiliate, transaction.amount, transaction.tax || 0, transaction.shipping || 0, address.city || '', address.state || '', address.country || '');

            while (i--) {
              product = transaction.products[i];
              Analytics.addItem(transaction.id, product.id, product.title, product.description, product.category || product.type, product.price, product.quantity);
            }

            Analytics.trackTrans();

          }
        });

        return promise
      }
    }
  });
