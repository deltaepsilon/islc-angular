'use strict';

angular.module('islcAngularApp')
  .service('stripeService', function stripeService($q, Stripe, paramsService) {
    var setPK = function () {
        var deferred = $q.defer();
        paramsService.get().then(function (params) {
          Stripe.setPublishableKey(params.stripePK, deferred.resolve);
        });
        return deferred.promise;

      };

    return {
      createToken: function (card) {
        var deferred = $q.defer();
        setPK.then(function () {
          Stripe.card.createToken(card, function (status, response) {
            var result = { status: status, response: response};

            if (response.error) {
              deferred.reject(result);
            } else {
              deferred.resolve(result);
            }
          });
        });
        return deferred;

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
      }

    };
  });
