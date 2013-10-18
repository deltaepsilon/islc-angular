'use strict';

angular.module('islcAngularApp')
  .service('contentService', function contentService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (slug) {
        return Restangular.one('content', slug).get();
      },

      getPage: function (slug) {
        return Restangular.one('page', slug).get();
      }
    };
  });
