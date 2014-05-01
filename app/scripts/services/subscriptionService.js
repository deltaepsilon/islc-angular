'use strict';

angular.module('islcAngularApp')
  .service('subscriptionService', function subscriptionService($rootScope, Restangular, cacheService, moment) {
    var cache = cacheService.get(),
      expired = function (subscription) {
        var now = moment(),
          expiration = moment(subscription.expires);
        return expiration.diff(now) < 0 && subscription.reset;
      };

    return {
      get: function (id) {
        if (id) {
          return Restangular.one('subscription', id).get();
        } else {
          return Restangular.all('subscription').getList();

        }

      },

      reset: function (id) {
        return Restangular.one('subscription', id).get('reset');
      },

      clearCache: function () {
        cache.remove('/angular/subscription');
      },

      expired: expired,

      galleryAccess: function (subscriptions) {
        var i = subscriptions.length;
        while (i--) {
          if (!expired(subscriptions[i])) {
            return true;
          }
        }
        return false;
      }
    }
  });
