'use strict';

angular.module('islcAngularApp')
  .service('stripeService', function stripeService($rootScope, $q, Stripe, paramsService, Restangular, cacheService) {
    var cache = cacheService.get();

    var setPK = function () {
        var deferred = $q.defer();
        paramsService.get().then(function (params) {
          deferred.resolve(Stripe.setPublishableKey(params.stripePK));
        });
        return deferred.promise;

      };

    return {
      clearCache: function () {
        cache.remove('/angular/token');
      },
      createToken: function (card) {
        var deferred = $q.defer();
        setPK().then(function () {
          Stripe.card.createToken(card, function (status, response) {
            var result = { status: status, response: response};

            if (response.error) {
              deferred.reject(result);
            } else {
              deferred.resolve(result);
            }
            $rootScope.$apply(); // Must call $apply() because this callback is outside of Angular
          });
        });
        return deferred.promise;

      },

      getToken: function () {
        return Restangular.one('token').get();
      },

      validateCardNumber: function (number) {
        return Stripe.card.validateCardNumber(number);
      },

      validateExpiry: function (expiry) {
        return Stripe.card.validateExpiry(expiry);
      },

      validateCVC: function (cvc) {
        return Stripe.card.validateCVC(cvc);
      },

      cardType: function (number) {
        return Stripe.card.cardType(number);
      },

      saveToken: function (token) {
        return Restangular.all('token').post(token);
      }

    };
  });
