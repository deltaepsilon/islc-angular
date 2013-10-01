'use strict';

angular.module('islcAngularApp')
  .service('assetService', function assetService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      getImages: function (prefix) {
        return Restangular.one('images', prefix.replace(/\//g, '|')).get();
      }
    }
  });
