'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope) {
    $scope.links = [
      {state: 'signIn', text: 'sign in'},
      {state: 'shop', text: 'shop'},
      {state: 'faq', text: 'faqs'},
      {state: 'supplies', text: 'supplies'}
    ];
  });
