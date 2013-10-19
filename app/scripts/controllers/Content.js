'use strict';

angular.module('islcAngularApp')
  .controller('ContentCtrl', function ($scope, pages) {
    $scope.pages = pages;

    console.log($scope.pages);
    //TODO The content endpoint doesn't appear to be finding any pages. Fix this.
  });
