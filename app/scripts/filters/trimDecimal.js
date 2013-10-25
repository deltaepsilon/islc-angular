'use strict';

angular.module('islcAngularApp')
  .filter('trimDecimal', function () {
    var REGEX = /\.\w+$/
    return function (input) {
      return input.replace(REGEX, '');

    };
  });
