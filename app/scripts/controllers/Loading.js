'use strict';

angular.module('islcAngularApp')
  .controller('LoadingCtrl', function ($scope, $rootScope, $timeout) {
    var timer;

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

    $rootScope.$on('$stateChangeStart', $rootScope.startLoader);
    $rootScope.$on('$stateChangeSuccess', $rootScope.startLoader);
    $rootScope.$on('$viewContentLoaded', $rootScope.cancelLoader);

  });
