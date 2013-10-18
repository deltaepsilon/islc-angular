'use strict';

angular.module('islcAngularApp')
  .service('subscriptionService', function subscriptionService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id, force) {
        if (id) {
          return Restangular.one('subscription', id).get();
        } else {
          if (!force && $rootScope.subscriptions) {
            return $rootScope.subscriptions;
          } else {
            return Restangular.all('subscription').getList();
          }

        }

      },

      reset: function (id) {
        return Restangular.one('subscription', id).get('reset');
      }
    }
  });
