'use strict';

angular.module('islcAngularApp')
  .service('galleryService', function galleryService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id) {
        if (id) {
          return Restangular.one('gallery', id).get();
        } else {
          return Restangular.one('gallery').get();
        }
      },

      remove: function (id) {
        return Restangular.one('gallery', id).remove();
      },

      addComment: function (id, comment) {
        return Restangular.one('gallery', id).all('comment').post({comment: comment});
      }
    }
  });
