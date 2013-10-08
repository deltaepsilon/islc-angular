'use strict';

angular.module('islcAngularApp')
  .service('productService', function productService($rootScope, $filter, Restangular, mockService, _) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id, force) {
        if (id) {
          return Restangular.one('product', id).get();
        } else if (!force && $rootScope.products) {
          return $rootScope.products;
        } else {
          return Restangular.one('product').get();
        }

      },
      getTable: function (products) {
        var table = mockService.getProductsTable(),
          link;
        _.map(products, function (product) {
          link = '#/product/' + product.id;
          table.tbody.rows.push([
            {text: product.id, href: link},
            {text: product.quantity},
            {text: $filter('currency')(product.price)},
            {text: product.title, href: link},
            {text: product.type, 'class': 'capitalize'}
          ]);
        });
        return table;

      }
    };
  });
