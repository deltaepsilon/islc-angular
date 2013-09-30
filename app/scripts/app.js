'use strict';

angular.module('islcAngularApp', ['restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/root');

    var nav = {
      templateUrl: 'views/partials/nav.html',
      controller: 'NavCtrl'
    }

    $stateProvider
      .state('nav', {
        abstract: true
      })
      .state('root', {
        url: '',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/root.html',
            controller: 'RootCtrl',
            resolve: {
              melissa: function (assetService) {
                return assetService.getImages('calligraphy/assets/melissa');
              },
              studentWork: function (assetService) {
                return assetService.getImages('calligraphy/assets/student-work');
              }
            }
          }
        }
      })
      .state('signIn', {
        url: '/sign-in',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/sign-in.html',
            controller: 'SignInCtrl'
          }
        }
      })
      .state('shop', {
        url: '/shop',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/shop.html',
            controller: 'ShopCtrl'
          }
        }
      })
      .state('faq', {
        url: '/faq',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/faq.html'
          }
        }
      })
      .state('supplies', {
        url: '/supplies',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/supplies.html'
          }
        }
      });

  });
