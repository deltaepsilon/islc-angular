'use strict';

angular.module('islcAngularApp')
  .service('userService', function userService(Restangular) {
    Restangular.setBaseUrl('/angular');

    return {
      getUser: function () {
        return Restangular.one('user').get();

      }
    }
  });
