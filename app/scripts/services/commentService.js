'use strict';

angular.module('islcAngularApp')
  .service('commentService', function commentService(Restangular, cacheService, $sanitize) {
    var cache = cacheService.get(),
      clearCache = function (id) {
        if (id) {
          cache.remove('/angular/comment/' + id);
        } else {
          cache.remove('/angular/comment');
        }

      },
      LINEFEED_REGEX = /&#10;/g;

    return {
      get: function (id) {
        if (id) {
          return Restangular.one('comment', id).get();
        } else {
          return Restangular.all('comment').getList();
        }
      },

      clearCache: clearCache,

      sanitize: function (comments) {
        var i = comments.length;
        while (i--) {
          comments[i].comment = $sanitize(comments[i].comment);
          comments[i].comment = comments[i].comment.replace(LINEFEED_REGEX, "\n");
        }
        return comments;
      }

    }

  });
