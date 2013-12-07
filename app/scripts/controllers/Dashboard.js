'use strict';

angular.module('islcAngularApp')
  .controller('DashboardCtrl', function ($scope, subscriptionService, subscriptions, comments, galleries, address, transactions) {
    $scope.subscriptions = subscriptions;
    $scope.comments = comments;
    $scope.galleries = galleries;
    $scope.address = address;
    $scope.transactions = transactions;

    $scope.expired = subscriptionService.expired;

  });
