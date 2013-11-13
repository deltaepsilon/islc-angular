'use strict';

angular.module('islcAngularApp')
  .controller('AccountCtrl', function ($scope, notificationService, userService, addressService, transactionService, address, transactions) {
    if (address && !address.error) {
      $scope.address = address;
    }

    if (!transactions.error) {
      $scope.transactions = transactions;
      $scope.transactionsTable = transactionService.getTable($scope.transactions);
    }


    $scope.saveUser = function (user) {
      userService.update(user).then(function (res) {
        if (res.error) {
          $scope.userForm.serverError = res.error;
          if (res.field === 'oldpassword') {
            $scope.userForm.oldpassword.serverError = true;
          }
          notificationService.error('User', res.error);
        } else {
          $scope.userForm.serverError = undefined;
          $scope.userForm.oldpassword.serverError = undefined;
          $scope.userForm.verification.$dirty = false;
          $scope.userForm.verification.$pristine = true;

          $scope.user = res;
          notificationService.success('User Saved');
        }

      });
    }

    $scope.saveAddress = function (address) {
      addressService.update(address).then(function (res) {
        if (res.error) {
          $scope.addressForm.serverError = res.error;
          notificationService.error('Address', res.error);
        } else {
          $scope.addressForm.serverError = undefined;
          $scope.address = res;
          notificationService.success('Address Saved');
        }
        console.log('res', res);
      });
    }

  });
