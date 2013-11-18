'use strict';

var restangularProvider;

angular.module('islcAngularApp', [
    'restangular',
    'notifications',
    'ui.router',
    'angular-markdown',
    'ngSanitize',
    'angular-google-analytics',
    'seo',
    'jmdobry.angular-cache'
  ])
  .run(function (cacheService) {
    cacheService.config(restangularProvider);

  })
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, AnalyticsProvider, RestangularProvider) {

    restangularProvider = RestangularProvider
    RestangularProvider.setBaseUrl('/angular');

    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    AnalyticsProvider.setAccount('UA-6859198-11');
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.setDomainName(location.hostname);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

    // Use analytics.js
//    AnalyticsProvider.useAnalytics(true);
//    AnalyticsProvider.useECommerce(true);



    var secureRoutes = ['gallery', 'content', 'subscriptions', 'account'],
      nav = {
        templateUrl: 'views/partials/nav.html',
        controller: 'NavCtrl',
        resolve: {
          user: function (userService) {
            return userService.get();
          },
          cart: function (cartService) {
            return cartService.get();
          },
          subscriptions: function (subscriptionService) {
            return subscriptionService.get();
          }
        }
      },
      body = {
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

    $stateProvider
      .state('nav', {
        abstract: true
      })
      .state('root', {
        url: '/',
        views: {
          nav: nav,
          body: body
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
      })
      .state('login', {
        url: '/login',
        views: {
          nav: nav,
          body: {
            controller: 'LoginCtrl',
            templateUrl: 'angular/login.html'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          nav: nav,
          body: {
            controller: 'LoginCtrl',
            templateUrl: 'angular/register.html'
          }
        }
      })
      .state('reset', {
        url: '/reset',
        views: {
          nav: nav,
          body: {
            controller: 'LoginCtrl',
            templateUrl: 'angular/reset.html'
          }
        }
      })
      .state('resetForm', {
        url: '/reset/form/:token',
        views: {
          nav: nav,
          body: {
            controller: 'LoginCtrl',
            templateUrl: function ($stateParams) {
              return 'angular/resetting.html/' + $stateParams.token;
            }
          }
        }
      })
      .state('account', {
        url: '/account',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/account.html',
            controller: 'AccountCtrl',
            resolve: {
              address: function (addressService) {
                return addressService.get();
              },
              transactions: function (transactionService) {
                return transactionService.get();
              }
            }
          }
        }
      })
      .state('transaction', {
        url: '/transaction/:id',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/transaction.html',
            controller: 'TransactionCtrl',
            resolve: {
              transaction: function ($stateParams, transactionService) {
                return transactionService.get($stateParams.id);
              }
            }
          }
        }
      })
      .state('product', {
        url: '/product/:slug',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/product.html',
            controller: 'ProductCtrl',
            resolve: {
              products: function ($stateParams, productService) {
                return productService.get($stateParams.slug);
              }
            }
          }
        }
      })
      .state('cart', {
        url: '/cart',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/cart.html',
            controller: 'CartCtrl',
            resolve: {
              cart: function (cartService) {
                return cartService.get();
              },
              token: function (stripeService) {
                return stripeService.getToken();
              }
            }
          }
        }
      })
      .state('products', {
        url: '/products/:category',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/products.html',
            controller: 'ProductCtrl',
            resolve: {
              products: function (productService) {
                return productService.get();
              }
            }
          }
        }
      })
      .state('subscriptions', {
        url: '/subscriptions',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/subscriptions.html',
            controller: 'SubscriptionCtrl',
            resolve: {
              subscriptions: function (subscriptionService) {
                return subscriptionService.get();
              }
            }
          }
        }
      })
      .state('content', {
        url: '/content',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/content.html'
          }
        }
      })
      .state('content.subscription', {
        url: '/:productSlug',
        views: {
          subscription: {
            templateUrl: 'views/partials/subscription.html',
            controller: 'ContentCtrl',
            resolve: {
              pages: function (contentService, $stateParams) {
                return contentService.get($stateParams.productSlug);
              }
            }
          }
        }
      })
      .state('content.subscription.page', {
        url: '/:pageSlug',
        views: {
          page: {
            templateUrl: 'views/partials/page.html',
            controller: 'PageCtrl',
            resolve: {
              page: function (pageService, $stateParams) {
                return pageService.get($stateParams.pageSlug);
              }
            }
          }
        }
      })
      .state('gallery', {
        url: '/gallery',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/galleries.html',
            controller: 'GalleriesCtrl',
            resolve: {
              galleries: function (galleryService) {
                return galleryService.get();
              }
            }
          }
        }
      })
      .state('gallery.view', {
        url: '/:id',
        views: {
          galleryView: {
            templateUrl: 'views/partials/gallery.html',
            controller: 'GalleryCtrl',
            resolve: {
              gallery: function (galleryService, $stateParams) {
                return galleryService.get($stateParams.id);
              }
            }
          }
        }
      });

  });
