'use strict';

angular.module('islcAngularApp')
  .filter('slug', function () {
    return function (text) {
      text = text.toLowerCase();
      text = text.replace(/[ ]/g, '-');
      return text
    };
  });
