'use strict';

angular.module('islcAngularApp')
  .service('paramsService', function paramsService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (force) {
        if (!force && $rootScope.params) {
          return $rootScope.params;
        } else {
          var promise = Restangular.one('params').get();
          promise.then(function (params) {
            $rootScope.params = params;
          });
          return promise;
        }

      }
    };

  });
