'use strict';

angular.module('islcAngularApp')
  .controller('LoadingCtrl', function ($scope, $rootScope, $timeout, $location) {
    var timer,
      FRAGMENT_REGEX = /phantomjs/,
      matches = location.search.match(FRAGMENT_REGEX);

    $rootScope.showLoader = function () {
      $scope.hide = false;
    };

    $rootScope.hideLoader = function () {
      $scope.hide = true;
    };

    $rootScope.startLoader = function () {
      $timeout.cancel(timer);
      timer = $timeout($rootScope.showLoader, 1000);
    };

    $rootScope.cancelLoader = function () {
      $timeout.cancel(timer);
      $timeout($rootScope.hideLoader, 500);
    };

    if (!matches) {
      $rootScope.$on('$stateChangeStart', $rootScope.startLoader);
      $rootScope.$on('$stateChangeSuccess', $rootScope.startLoader);
      $rootScope.$on('$viewContentLoaded', $rootScope.cancelLoader);
    } else {
      $scope.hide = true;
    }

  });
