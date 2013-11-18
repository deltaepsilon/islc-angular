'use strict';

angular.module('islcAngularApp')
  .service('paramsService', function paramsService($rootScope, $q, Restangular) {

    return {
      get: function () {
          return Restangular.one('params').get();
        }

    };

  });
