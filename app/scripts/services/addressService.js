'use strict';

angular.module('islcAngularApp')
  .service('addressService', function addressService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function () {
        return Restangular.one('address').get();

      },

      update: function (address) {
        return Restangular.all('address').post(address);
      }
    }

  });
