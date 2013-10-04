'use strict';

angular.module('islcAngularApp')
  .service('transactionService', function transactionService(Restangular, mockService, _) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id) {
        return Restangular.one('transaction', id).get();

      },

      getTable: function (transactions) {
        var table = mockService.getTransactionTable();
        _.map(transactions, function (transaction) {
          table.tbody.rows.push([
            {text: transaction.id},
            {text: transaction.created},
            {text: transaction.products.length}
          ]);
        });
        return table;
      }
    }
  });
