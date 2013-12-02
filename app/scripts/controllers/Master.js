'use strict';

angular.module('islcAngularApp')
  .controller('MasterCtrl', function ($scope, $rootScope, $filter){

    var SLASH_REGEX = /(^#!\/|\/$|\/:\w+|content\/)/g,
      defaultTitle = 'I Still Love Calligraphy - Learn The Art of Calligraphy Online!';

    $scope.title = defaultTitle;

    $rootScope.$on('$stateChangeSuccess', function() {
      var url = location.hash.replace(SLASH_REGEX, ''),
        parts = url.split('/'),
        first = parts[0],
        title;

      switch (first) {
        case '':
          $scope.title = defaultTitle;
          break;
        case 'faq':
          $scope.title = 'ISLC: Frequently Asked Question';
          break;
        default:
          title = parts.join(' → ');
          $scope.title = 'ISLC: ' + $filter('deSlug')(title);
          break;
      }

    });
  });
