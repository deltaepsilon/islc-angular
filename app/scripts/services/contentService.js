'use strict';

angular.module('islcAngularApp')
  .service('contentService', function contentService(Restangular, cacheService, subscriptionService) {
    var cache = cacheService.get(),
      cacheClear = function (slug) {
        cache.remove('/angular/content/' + slug);
      };

    return {
      get: function (slug) {
        subscriptionService.clearCache();
        return Restangular.one('content', slug).get();
      }
    };
  });
