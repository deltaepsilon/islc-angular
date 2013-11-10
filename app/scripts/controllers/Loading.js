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

    $rootScope.$on('$stateChangeStart', function() {
      $timeout.cancel(timer);
      timer = $timeout($rootScope.showLoader, 1500);
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $timeout.cancel(timer);
      $timeout($rootScope.hideLoader, 500);
    });
    $rootScope.$on('$viewContentLoaded', function () {
      $timeout.cancel(timer);
      $timeout($rootScope.hideLoader, 500);
    });

  });
