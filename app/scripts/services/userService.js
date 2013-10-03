'use strict';

angular.module('islcAngularApp')
  .service('userService', function userService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (force) {
        if (!force && $rootScope.user) {
          return $rootScope.user;
        } else {
          return Restangular.one('user').get();
        }

      },

      update: function (user) {
        return Restangular.all('user').post(user);
      }
    }
  });
