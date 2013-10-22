'use strict';

angular.module('islcAngularApp')
  .service('galleryService', function galleryService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id, force) {
        if (id) {
          return Restangular.one('gallery', id).get();
        } else if (!force && $rootScope.galleries) {
          return $rootScope.galleries;
        } else {
          return Restangular.one('gallery').get();
        }
      }
    }
  });
