'use strict';

angular.module('islcAngularApp', ['restangular', 'notifications', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    var nav = {
      templateUrl: 'views/partials/nav.html',
      controller: 'NavCtrl',
      resolve: {
        user: function (userService) {
          return userService.get();
        },
        cart: function (cartService) {
          return cartService.get();
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
        url: '',
        views: {
          nav: nav,
          body: body
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
        url: '/product/:id',
        views: {
          nav: nav,
          body: {
            templateUrl: 'views/partials/product.html',
            controller: 'ProductCtrl',
            resolve: {
              products: function ($stateParams, productService) {
                return productService.get($stateParams.id);
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
              }
            }
          }
        }
      })
      .state('products', {
        url: '/products',
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
