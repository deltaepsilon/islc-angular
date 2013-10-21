'use strict';

angular.module('islcAngularApp')
  .service('pageService', function pageService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (slug) {
        return Restangular.one('page', slug).get();
      }
    };
  });
