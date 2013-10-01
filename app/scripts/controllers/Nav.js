'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, user, userService) {
    $rootScope.user = user;

    $scope.links = [
      {state: 'root.user', text: 'account'},
      {state: 'root.login', text: 'sign in'},
      {state: 'supplies', text: 'supplies'},
      {state: 'faq', text: 'faqs'},
      {state: 'shop', text: 'shop'}
    ];

    var i = $scope.links.length;
    while (i--) {
      $scope.links[i].href = $state.href($scope.links[i].state);
    }

    $scope.showLink = function (state) {
      var user = !!$rootScope.user;

      switch (state) {
        case 'root.login':
          return !user;
          break;
        case 'root.user':
          return user;
          break;
        case 'logout':
          return user;
          break;
        default:
          return true;
          break;
      }
    }

  });
