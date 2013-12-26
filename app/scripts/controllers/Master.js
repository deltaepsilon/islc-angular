'use strict';

angular.module('islcAngularApp')
  .controller('MasterCtrl', function ($scope, $rootScope, $filter){

    var SLASH_REGEX = /(^#!\/|\/$|\/:\w+|content\/|\?.+)/g,
      defaultTitle = 'I Still Love Calligraphy - Learn The Art of Modern Calligraphy Online!',
      defaultDescription = 'I Still Love Calligraphy is an online calligraphy workshop created and taught by Melissa Esplin. I Still Love Calligraphy focuses on modern calligraphy through a serious of online classes and additional downloadable content.';

    $scope.title = defaultTitle;
    $rootScope.description = defaultDescription;

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
          $scope.title = 'FAQ - I Still Love Calligraphy';
          break;
        default:
          title = parts.join(' → ');
          $scope.title = $filter('deSlug')(title) + ' - I Still Love Calligraphy';
          break;
      }

      //Manage Descriptions
      switch (first) {
        case 'products':
          $rootScope.description = 'Take our signature Online Calligraphy Course, gift the course to a loved one, or download one of our printables.';
          break;
        case 'supplies':
          $rootScope.description = "These are the supplies that you'll need to start learning calligraphy. Buy from our preferred online store or source them locally. ";
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

    });
  });
