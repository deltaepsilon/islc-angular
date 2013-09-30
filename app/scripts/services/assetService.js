'use strict';

angular.module('islcAngularApp')
  .service('assetService', function assetService($q, Restangular) {
    Restangular.setBaseUrl('/angular');
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getImages: function (prefix) {
        return Restangular.one('images', prefix.replace(/\//g, '|')).get();
      }
    }
  });
