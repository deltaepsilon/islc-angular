'use strict';

angular.module('islcAngularApp')
  .service('galleryService', function galleryService($rootScope, Restangular, cacheService, commentService) {
    var cache = cacheService.get(),
      cacheClear = function () {
        cache.remove('/angular/gallery')
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
        cacheClear();
        commentService.clearCache();
        return Restangular.one('gallery', id).remove();
      },

      addComment: function (id, comment) {
        cacheClear();
        commentService.clearCache();
        return Restangular.one('gallery', id).all('comment').post({comment: comment});
      },

      cacheClear: cacheClear
    }
  });
