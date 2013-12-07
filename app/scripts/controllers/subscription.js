'use strict';

angular.module('islcAngularApp')
  .controller('SubscriptionCtrl', function ($scope, subscriptionService, subscriptions) {
    $scope.subscriptions = subscriptions;

    $scope.expired = subscriptionService.expired;
  });
