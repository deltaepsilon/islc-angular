'use strict';

angular.module('islcAngularApp')
  .controller('DashboardCtrl', function ($scope, subscriptionService, commentService, subscriptions, comments, galleries, address, transactions, announcements, bookmarkService, $localStorage) {

    $scope.subscriptions = subscriptions;
    $scope.comments = commentService.sanitize(comments);
    $scope.galleries = galleries;
    $scope.address = address;
    $scope.transactions = transactions;
    $scope.announcements = announcements;
    $scope.expired = subscriptionService.expired;
    $scope.$storage = $localStorage;

    $scope.getActiveAnnouncements = function (announcements) {
      var keys = Object.keys(announcements),
        i = keys.length,
        result = [];

      while (i--) {
        if (announcements[keys[i]].active) {
          result.push(announcements[keys[i]]);
        }
      }

      return result;
    };

    $scope.goToBookmark = bookmarkService.goToBookmark;
    $scope.goToLastPage = bookmarkService.goToLastPage;

  });
