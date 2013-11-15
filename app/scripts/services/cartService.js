'use strict';

angular.module('islcAngularApp')
  .service('cartService', function cartService(Restangular, $rootScope, Analytics, $state, cacheService) {
    var cache = cacheService.get(),
      clearCache = function () {
        cache.remove('/angular/cart');
      };

    Restangular.setBaseUrl('/angular');

    return {
      get: function () {
        return Restangular.one('cart').get();

      },

      add: function (productId, quantity) {
        clearCache();
        var query = {
          product_id: productId,
          quantity: quantity || 1
        }

        Analytics.trackEvent('cart', $state.current.name, productId + '|' + quantity);

        return Restangular.all('cart').post(query);
      },

      update: function (productId, quantity) {
        clearCache();
        var query = {
          product_id: productId,
          quantity: quantity
        }
        return Restangular.all('cart/update').post(query);
      },

      clearCache: clearCache,

      setDiscount: function (code) {
        clearCache();
        return Restangular.all('discount').post({code: code});
      },

      checkout: function () {
        clearCache();
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
              Analytics.addItem(transaction.id, product.id, product.title, product.category || product.type, product.price, product.quantity);
            }

            Analytics.trackTrans();

          }
        });

        return promise
      }
    }
  });
