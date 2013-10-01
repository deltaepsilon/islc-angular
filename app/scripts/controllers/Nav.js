'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, user) {
    $rootScope.user = user;
    console.log(user);
    $scope.links = [
      {state: 'supplies', text: 'supplies'},
      {state: 'faq', text: 'faqs'},
      {state: 'shop', text: 'shop'},
      {state: 'signIn', text: 'sign in'}
    ];

    var i = $scope.links.length;
    while (i--) {
      $scope.links[i].href = $state.href($scope.links[i].state);
    }
  });
