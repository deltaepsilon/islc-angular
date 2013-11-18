'use strict';

angular.module('islcAngularApp')
  .service('userService', function userService($rootScope, Restangular, cacheService) {
    var cache = cacheService.get(),
      clearCache = function () {
        cache.remove('/angular/user');
      };

    return {
      get: function () {
        return Restangular.one('user').get();

      },

      update: function (user) {
        clearCache();
        return Restangular.all('user').post(user);

      }
    }
  });
