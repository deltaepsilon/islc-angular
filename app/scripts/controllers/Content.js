'use strict';

angular.module('islcAngularApp')
  .controller('ContentCtrl', function ($rootScope, $scope, $state, $stateParams, pages, $timeout) {
    $scope.pages = pages;

    $timeout(function () {
      var matches = location.hash.match(/#!\/content\/.+?\/(.+)/);

      if (!matches || matches.length < 2) {
        $state.go('content.subscription.page', { pageSlug: $scope.pages[0].slug });
      }
    });


  });
