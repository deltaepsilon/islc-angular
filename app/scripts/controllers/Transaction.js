'use strict';

angular.module('islcAngularApp')
  .controller('TransactionCtrl', function ($scope, transactionService, productService, transaction) {
    $scope.transaction = transaction;
    $scope.productsTable = productService.getTable($scope.transaction.products);

  });
