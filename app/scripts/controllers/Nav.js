'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, _, user) {
    $rootScope.user = user;

    $scope.links = [
      {state: 'account', text: 'account'},
      {state: 'login', text: 'log in'},
      {state: 'register', text: 'register'},
      {state: 'faq', text: 'faqs'},
      {state: 'supplies', text: 'supplies'},
      {state: 'products', text: 'products'}
    ];

    var i = $scope.links.length;
    while (i--) {
      $scope.links[i].href = $state.href($scope.links[i].state);
    }

    $scope.showLink = function (state) {
      var user = !!$rootScope.user,
        currentState = $state.current.name,
        loginStates = ['login'],
        isLogin = function () {
          return _.indexOf(loginStates, currentState) !== -1
        };

      switch (state) {
        case 'login':
          if (isLogin()) {
            return false;
          } else {
            return !user;
          }
          break;
        case 'register':
          return !user;
          break;
        case 'account':
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
