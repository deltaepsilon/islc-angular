'use strict';

angular.module('islcAngularApp')
  .service('paramsService', function paramsService($rootScope, $q, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (force) {
        if (!force && $rootScope.params) {
          var deferred = $q.defer();
          deferred.resolve($rootScope.params);
          return deferred.promise;
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
