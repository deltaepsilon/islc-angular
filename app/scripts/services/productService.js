'use strict';

angular.module('islcAngularApp')
  .service('productService', function productService($rootScope, $filter, Restangular, mockService, _, cacheService) {
    var cache = cacheService.get();

    Restangular.setBaseUrl('/angular');

    return {
      get: function (slug) {
        if (slug) {
          return Restangular.one('product', slug).get();
        } else {
          return Restangular.one('product').get();
        }

      },

      clearCache: function (slug) {
        if (!slug) {
          cache.remove('/angular/product');
        } else {
          cache.remove('/angular/product/' + slug);
        }

      },

      getTable: function (products) {
        var table = mockService.getProductsTable(),
          link;
        _.map(products, function (product) {
          link = '#!/product/' + product.id;
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
