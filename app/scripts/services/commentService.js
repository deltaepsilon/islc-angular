'use strict';

angular.module('islcAngularApp')
  .service('commentService', function commentService(Restangular, cacheService) {
    var cache = cacheService.get(),
      clearCache = function (id) {
        if (id) {
          cache.remove('/angular/comment/' + id);
        } else {
          cache.remove('/angular/comment');
        }

      };

    return {
      get: function (id) {
        if (id) {
          return Restangular.one('comment', id).get();
        } else {
          return Restangular.all('comment').getList();
        }
      },

      clearCache: clearCache
    }
  });
