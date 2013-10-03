'use strict';

angular.module('islcAngularApp')
  .controller('AccountCtrl', function ($scope, userService) {

    $scope.saveUser = function (user) {
      userService.update(user).then(function (res) {
        if (res.error) {
          $scope.accountForm.serverError = res.error;
        } else {
          $scope.accountForm.serverError = undefined;
          $scope.user = user;
        }
        console.log('res', res);
      });
    }

  });
