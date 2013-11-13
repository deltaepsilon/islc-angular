'use strict';

angular.module('islcAngularApp')
  .service('userService', function userService($rootScope, Restangular, cacheService) {
    var cache = cacheService.get();

    Restangular.setBaseUrl('/angular');

    return {
      get: function () {
        return Restangular.one('user').get();

      },

      update: function (user) {
        var promise = Restangular.all('user').post(user);

        promise.then(function (user) {
          cache.remove('/angular/user');
        });

        return promise;
      }
    }
  });
