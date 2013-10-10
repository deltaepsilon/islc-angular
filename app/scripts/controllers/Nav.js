'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, _, cartService, productService, notificationService, user, cart) {
    $rootScope.user = user;
    $rootScope.cart = cart;

    var error = location.href.match(/error=([^&]+)/);
    if (error && error.length >= 2 ) {
      notificationService.error('Error', decodeURIComponent(error[1]));
    }

    var notification = location.href.match(/notification=([^&]+)/);
    if (notification && notification.length >= 2 ) {
      notificationService.info('Notification', decodeURIComponent(notification[1]));
    }

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$previousState = from;
    });

    $rootScope.$watch('cart', function () {
      var count = 0,
        total = 0,
        cart = $rootScope.cart,
        i = cart.products.length,
        product;
      while (i--) {
        product = cart.products[i];
        count += product.quantity;
        total += product.quantity * product.price;
      }
      $rootScope.cart.count = count;
      $rootScope.cart.total = total;

    });

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

    $rootScope.addToCart = function (id, quantity) {
      cartService.add(id, quantity).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else if (cart.products) {
          $rootScope.cart = cart;

          //Force update the products list. This is critical to capture any changes resulting from the cart transaction.
          productService.get(undefined, true).then(function (products) {
            if (products.error) {
              notificationService.error('Products', products.error);
            } else {
              $rootScope.products = products;
            }
          });
        }

      });
    }

  });
