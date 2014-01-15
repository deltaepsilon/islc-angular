'use strict';

angular.module('islcAngularApp')
  .controller('MasterCtrl', function ($scope, $rootScope, $filter, $timeout, $location){

    if (typeof window.callPhantom === 'function') {
      $timeout($scope.htmlReady()); //Call htmlReady on first load for PhantomJS renderer's sake
    }

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$previousState = from;
      $rootScope.$previousStateParams = fromParams;
    });


    // Meta stuff
    var SLASH_REGEX = /(^#!\/|\/$|\/:\w+|content\/|\?.+)/g,
      defaultTitle = 'Online Calligraphy Class - The Art of Modern Calligraphy',
      defaultDescription = "I Still Love Calligraphy is an online calligraphy class taught by Melissa Esplin. Melissa's lessons focus on modern calligraphy in the copperplate style.";

    $scope.title = defaultTitle;
    $rootScope.description = defaultDescription;

    $rootScope.$on('$stateChangeSuccess', function() {
      var url = location.hash.replace(SLASH_REGEX, ''),
        parts = url.split('/'),
        first = parts[0],
        title;

      // Manage titles
      switch (first) {
        case '':
          $scope.title = defaultTitle;
          break;
        case 'faq':
          $scope.title = 'FAQ - I Still Love Calligraphy';
          break;
        default:
          if (parts.length > 1 && parts[0] === 'product') {
            parts.shift();
          }

          title = parts.join(' → ');
          $scope.title = $filter('deSlug')(title) + ' - I Still Love Calligraphy';
          break;
      }

      // Manage Descriptions
      switch (first) {
        case 'products':
          $rootScope.description = 'Take our signature Online Calligraphy Course, gift the course to a loved one, or download one of our printables.';
          break;
        case 'supplies':
          $rootScope.description = "These are the supplies that you'll need to start learning calligraphy. Buy from our preferred online store or source them locally.";
          break;
        case 'faq':
          $rootScope.description = "Is the workshop for beginners? Yes! We specialize in beginner and intermediate calligraphy instruction.";
          break;
        case 'register':
          $rootScope.description = "Register for an account with I Still Love Calligraphy.";
          break;
        case 'login':
          $rootScope.description = "Log in to your account with I Still Love Calligraphy.";
          break;
        case 'reset':
          $rootScope.description = "Reset your account password for I Still Love Calligraphy.";
          break;
        default:
          $rootScope.description = defaultDescription;
          break;
      }

      // Manage Canonical Href
      $scope.canonical = $location.absUrl();

    });
  });
