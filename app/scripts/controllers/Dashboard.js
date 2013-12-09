'use strict';

angular.module('islcAngularApp')
  .controller('DashboardCtrl', function ($scope, subscriptionService, commentService, subscriptions, comments, galleries, address, transactions) {

    $scope.subscriptions = subscriptions;
    $scope.comments = commentService.sanitize(comments);
    $scope.galleries = galleries;
    $scope.address = address;
    $scope.transactions = transactions;

    $scope.expired = subscriptionService.expired;

  });
