'use strict';

angular.module('islcAngularApp')
  .service('pageService', function pageService(Restangular) {

    return {
      get: function (slug) {
        return Restangular.one('page', slug).get();
      }
    };
  });
