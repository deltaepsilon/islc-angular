'use strict';

angular.module('islcAngularApp')
  .service('addressService', function addressService(Restangular, cacheService) {
    var cache = cacheService.get(),
      clearCache = function () {
        cache.remove('/angular/address');
      };

    return {
      get: function () {
        return Restangular.one('address').get();

      },

      update: function (address) {
        clearCache();
        return Restangular.all('address').post(address);
      },

      clearCache: clearCache
    }

  });
