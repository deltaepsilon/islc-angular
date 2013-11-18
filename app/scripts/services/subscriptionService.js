'use strict';

angular.module('islcAngularApp')
  .service('subscriptionService', function subscriptionService($rootScope, Restangular, cacheService) {
    var cache = cacheService.get();

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
      }
    }
  });
