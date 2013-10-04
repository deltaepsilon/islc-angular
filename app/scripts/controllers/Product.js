'use strict';

angular.module('islcAngularApp')
  .controller('ProductCtrl', function ($scope, product) {
    $scope.product = product;
    console.log('product', product);
  });
