'use strict';

angular.module('islcAngularApp')
  .controller('LoginCtrl', function ($scope, $state, $stateParams, $timeout) {
    var SLUG_REGEX = /:(\w+)/g,
      getUrl = function (url, params) {
        var matches = url.match(SLUG_REGEX),
          i = matches ? matches.length : 0,
          TEMP_REGEX;

        while (i--) {
          TEMP_REGEX = new RegExp(matches[i]);
          url = url.replace(TEMP_REGEX, params[matches[i].substring(1)]);
        }
        return url;
      };

    $timeout(function () {
      var url = '/';

      if ($scope.$previousState && $scope.$previousState.url && $scope.$previousStateParams) {
        url = getUrl($scope.$previousState.url, $scope.$previousStateParams);
      }
      $scope.redirect = '#!' + url;
      $scope.origin = '#!' + ($state.current.url || '/');
      $scope.token = $stateParams.token;
    });


  });
