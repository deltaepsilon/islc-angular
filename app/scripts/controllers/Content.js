'use strict';

angular.module('islcAngularApp')
  .controller('ContentCtrl', function ($rootScope, $scope, $state, $stateParams, pages) {
    var matches = location.hash.match(/#!\/content\/.+?\/(.+)/);
    $scope.pages = pages;

    if (!matches || matches.length < 2) {
      $state.go('content.subscription.page', { pageSlug: $scope.pages[0].slug });
    }

  });
