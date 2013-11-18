'use strict';

angular.module('islcAngularApp')
  .service('assetService', function assetService(Restangular) {

    return {
      getImages: function (prefix) {
        return Restangular.one('images', prefix.replace(/\//g, '|')).get();
      }
    }
  });
