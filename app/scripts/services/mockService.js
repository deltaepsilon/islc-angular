'use strict';

angular.module('islcAngularApp')
  .service('mockService', function mockService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getTransactionTable: function () {
        return {
          thead: {
            rows: [
              [
                {text: 'id'},
                {text: 'date'},
                {text: 'products'}
              ]
            ]
          },
          tbody: {
            rows: []
          },
          tfoot: {
            rows:[]
          }
        };
      },
      getProductsTable: function () {
        return {
          thead: {
            rows: [
              [
                {text: 'id'},
                {text: 'quantity'},
                {text: 'price'},
                {text: 'title'},
                {text: 'type'}
              ]
            ]
          },
          tbody: {
            rows: []
          },
          tfoot: {
            rows:[]
          }
        };
      }

    };

  });
