'use strict';

angular.module('islcAngularApp')
  .filter('percentage', function () {
    return function (number, digits) {
      if (!digits || digits < 0) {
        digits = 2;
      } else {
        digits = digits + 2;
      }
      return Math.round(number * Math.pow(10, digits))/Math.pow(10, digits - 2) + '%';

    };
  });
