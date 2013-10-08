'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, _, cartService, productService, notificationService, user, cart) {
    $rootScope.user = user;
    $rootScope.cart = cart;

    $rootScope.$watch('cart', function () {
      var count = 0,
        cart = $rootScope.cart,
        i = cart.products.length;
      while (i--) {
        count += cart.products[i].quantity;
      }
      $rootScope.cart.count = count;

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
        case 'cart':
          return cart.products;
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
