'use strict';

angular.module('islcAngularApp')
  .filter('deSlug', function () {
    return function (input) {
      var HYPHEN_REGEX = /-/g,
        WORD_REGEX = /\w\S*/g;

      input = input.replace(HYPHEN_REGEX, ' ');
      input = input.replace(WORD_REGEX, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      });
      return input;
    };
  });
