'use strict';

angular.module('islcAngularApp')
  .service('transactionService', function transactionService(Restangular, mockService, _, $filter, cacheService) {
    var cache = cacheService.get(),
      clearCache = function () {
        cache.remove('/angular/transaction');
      };
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id) {
        return Restangular.one('transaction', id).get();

      },

      clearCache: clearCache,

      getTable: function (transactions) {
        var table = mockService.getTransactionTable();
        _.map(transactions, function (transaction) {
          table.tbody.rows.push([
            {text: transaction.id, href: '#!/transaction/' + transaction.id},
            {text: $filter('date')(transaction.created)},
            {text: transaction.products.length, href: '#!/transaction/' + transaction.id}
          ]);
        });
        return table;
      }
    }
  });
