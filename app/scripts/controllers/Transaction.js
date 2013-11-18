'use strict';

angular.module('islcAngularApp')
  .controller('TransactionCtrl', function ($scope, transactionService, productService, transaction) {
    $scope.transaction = transaction;
//    $scope.productsTable = productService.getTable($scope.transaction.products);

    if ($scope.transaction && $scope.transaction.products) {
      var i = $scope.transaction.products.length,
        product;

      while (i--) {
        product = $scope.transaction.products[i];
        if (product.type === 'subscription') {
          $scope.productSlug = product.slug;
          break;
        }
      }

    }


  });
