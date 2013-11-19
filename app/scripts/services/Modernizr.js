'use strict';

angular.module('islcAngularApp')
  .factory('Modernizr', function Modernizr($window) {
    return $window.Modernizr;
  });
