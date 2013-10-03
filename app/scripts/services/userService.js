'use strict';

angular.module('islcAngularApp')
  .service('userService', function userService($rootScope, Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      getUser: function (force) {
        if (!force && $rootScope.user) {
          return $rootScope.user;
        } else {
          return Restangular.one('user').get();
        }


      }
    }
  });
