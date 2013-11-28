'use strict';

angular.module('islcAngularApp')
  .service('productService', function productService($rootScope, $filter, Restangular, mockService, _, cacheService) {
    var cache = cacheService.get(),
      clearCache = function (slug) {
        if (!slug) {
          cache.remove('/angular/product');
        } else {
          cache.remove('/angular/product/' + slug);
        }
      },
      clearCacheAll = function () {
        var REGEX = /product/,
          keys = cache.keys(),
          i = keys.length;
        while (i--) {
          if (keys[i].match(REGEX)) {
            cache.remove(keys[i]);
          }
        }
      };

    return {
      get: function (slug) {
        if (slug) {
          return Restangular.one('product', slug).get();
        } else {
          return Restangular.one('product').get();
        }

      },

      clearCache: clearCache,
      clearCacheAll: clearCacheAll,

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
