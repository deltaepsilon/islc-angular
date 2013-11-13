'use strict';

angular.module('islcAngularApp')
  .service('paramsService', function paramsService($rootScope, $q, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function () {
          Restangular.one('params').get();
        }

    };

  });
