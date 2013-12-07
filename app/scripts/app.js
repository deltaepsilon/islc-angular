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
  .run(function (cacheService, notificationService, Analytics) {
    cacheService.config(restangularProvider);

    var error = location.href.match(/error=([^&#]+)/);
    if (error && error.length >= 2 ) {
      notificationService.error('Error', decodeURIComponent(error[1]));
    }

    var notification = location.href.match(/notification=([^&#]+)/);
    if (notification && notification.length >= 2 ) {
      notificationService.info('Notification', decodeURIComponent(notification[1]));
    }

    var tracking = location.href.match(/tracking=([^&#]+)/);
    if (tracking && tracking.length >= 2 ) {
      Analytics.trackEvent('tracking', 'pageview', tracking[1], tracking[1]);
    }

  })
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, AnalyticsProvider, RestangularProvider) {
    var enableAnalytics = location.host === 'istilllovecalligraphy.com';

    restangularProvider = RestangularProvider
    RestangularProvider.setBaseUrl('/angular');

    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    if (enableAnalytics) {
      AnalyticsProvider.setAccount('UA-6859272-12');
      AnalyticsProvider.trackPages(true);
      AnalyticsProvider.setDomainName(location.hostname);
      AnalyticsProvider.setPageEvent('$stateChangeSuccess');
      AnalyticsProvider.trackPrefix('#!');
      AnalyticsProvider.setRemoveRegExp(new RegExp(/\/\d+?$/));

      // Use analytics.js
      AnalyticsProvider.useAnalytics(true);
      AnalyticsProvider.useECommerce(true);
      //Enable eCommerce module for analytics.js
      AnalyticsProvider.useEnhancedLinkAttribution(true);
      //Enable analytics.js experiments
//      AnalyticsProvider.setExperimentId('QxfXFS8_TTOsCBG9mQlsIQ');
    }




    var secureRoutes = ['gallery', 'content', 'subscriptions', 'account', 'transaction'],
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
        templateUrl: function () {
          var variations = [
           'views/partials/rootA.html',
            'views/partials/rootB.html'
          ],
          variation = 0;

          if (enableAnalytics && window.cxApi) {
            variation = window.cxApi.chooseVariation();
          }
          return variations[variation];

        },
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
      .state('dashboard', {
        url: '/dashboard',
        views: {
          nav: nav,
          body: {
            controller: 'DashboardCtrl',
            templateUrl: 'views/partials/dashboard.html',
            resolve: {
              subscriptions: function (subscriptionService) {
                return subscriptionService.get();
              },
              comments: function (commentService) {
                return commentService.get();
              },
              galleries: function (galleryService) {
                return galleryService.get();
              },
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
              },
              address: function (addressService) {
                return addressService.get();
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
              },
              subscriptions: function (subscriptionService) {
                return subscriptionService.get();
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
