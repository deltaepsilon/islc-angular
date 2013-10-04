'use strict';

angular.module('islcAngularApp')
  .service('productService', function productService($filter, Restangular, mockService, _) {
    Restangular.setBaseUrl('/angular');

    return {
      get: function (id) {
        return Restangular.one('product', id).get();

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
