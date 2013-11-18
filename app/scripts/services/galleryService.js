'use strict';

angular.module('islcAngularApp')
  .service('galleryService', function galleryService($rootScope, Restangular, cacheService) {
    var cache = cacheService.get(),
      cacheClear = function () {
        cache.remove('/angular/gallery')
      };

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
        cache.remove('/angular/gallery/' + id);
        return Restangular.one('gallery', id).all('comment').post({comment: comment});
      }
    }
  });
