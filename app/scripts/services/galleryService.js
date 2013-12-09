'use strict';

angular.module('islcAngularApp')
  .service('galleryService', function galleryService($rootScope, Restangular, cacheService, commentService) {
    var cache = cacheService.get(),
      cacheClear = function (id) {
        if (id) {
          cache.remove('/angular/gallery/' + id);
        }
        cache.remove('/angular/gallery');
      };

    return {
      get: function (id) {
        if (id) {
          return Restangular.one('gallery', id).get();
        } else {
          return Restangular.all('gallery').getList();
        }
      },

      remove: function (id) {
        cacheClear(id);
        commentService.clearCache();
        return Restangular.one('gallery', id).remove();
      },

      addComment: function (id, comment) {
        cacheClear(id);
        commentService.clearCache();
        return Restangular.one('gallery', id).all('comment').post({comment: comment});
      },

      cacheClear: cacheClear
    }
  });
