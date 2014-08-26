'use strict';

angular.module('islcAngularApp')
  .controller('PageCtrl', function ($scope, page, _, bookmarkService, $localStorage, $state) {
    $scope.page = page;

    var pages = _.clone($scope.pages),
      i = pages.length;

    pages.reverse();
    while (i--) {
      if (pages[i].id === $scope.page.id) {
        $scope.nextPage = pages[i - 1];
        $scope.previousPage = pages[i + 1];
        break;
      }
    }

    bookmarkService.setLastPage($scope.page.title);

    $scope.setBookmark = bookmarkService.setBookmark;

    $scope.$storage = $localStorage;

    $scope.pageSlug = $state.params.pageSlug;


  });
