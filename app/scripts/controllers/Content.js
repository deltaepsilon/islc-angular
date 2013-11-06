'use strict';

angular.module('islcAngularApp')
  .controller('ContentCtrl', function ($rootScope, $scope, $state, $stateParams, pages) {
    $scope.pages = pages;

    if (!$stateParams.pageSlug) {
      $state.go('content.subscription.page', { pageSlug: $scope.pages[0].slug });
    }

  });
