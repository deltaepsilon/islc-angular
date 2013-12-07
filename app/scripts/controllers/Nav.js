'use strict';

angular.module('islcAngularApp')
  .controller('NavCtrl', function ($scope, $state, $rootScope, $q, $timeout, _, cartService, productService, notificationService, subscriptionService, user, cart, subscriptions, Analytics) {
    //Basic route security... you wouldn't want users to get hung up if they hit the wrong page
    var secureRoutes = ['gallery', 'content', 'subscriptions', 'account', 'transaction', 'dashboard'];
    if (!user) { // Secured routes redirect
      if (~_.indexOf(secureRoutes, $state.current.name)) {
        $state.go('root');
      }
    } else { // Dashboard redirect
      if ($state.current.name === 'root') {
        $state.go('dashboard');
      }
    }

    $rootScope.user = user;
    $rootScope.cart = cart;


    if (typeof window.callPhantom === 'function') {
      $timeout($scope.htmlReady()); //Call htmlReady on first load for PhantomJS renderer's sake
    }

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$previousState = from;
      $rootScope.$previousStateParams = fromParams;
    });

    $rootScope.$watch('cart', function () {
      var count = 0,
        total = 0,
        cart = $rootScope.cart,
        i = cart.products.length,
        product,
        discount;
      while (i--) {
        product = cart.products[i];
        count += product.quantity;
        total += product.quantity * product.price;
      }

      if (cart.discount) {
        if (cart.discount.percent) {
          discount = -1 * total * cart.discount.percent;
        } else if (cart.discount.value) {
          discount = -1 * cart.discount.value;
        }
        total = Math.max(0, total + discount);
      }

      $rootScope.cart.discountDollars = discount;
      $rootScope.cart.count = count;
      $rootScope.cart.total = total;

    });

    var galleryAccess = subscriptionService.galleryAccess(subscriptions);
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
        case 'subscriptions':
          return user && galleryAccess;
          break;
        case 'gallery':
          return user && subscriptions.length;
          break;
        default:
          return true;
          break;
      }
    }

    $rootScope.addToCart = function (id, quantity) {
      var deferred = $q.defer();

      cartService.add(id, quantity).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else if (cart.products) {
          $rootScope.cart = cart;

          deferred.resolve($rootScope.cart);

          //Force update the products list. This is critical to capture any changes resulting from the cart transaction.
          productService.clearCache();
          productService.get().then(function (products) {
            if (products.error) {
              notificationService.error('Products', products.error);
            } else {
              $rootScope.products = products;
            }
          });
        }

      });

      return deferred.promise;
    }

    $rootScope.convert = function (slug, quantity) {
      productService.get().then(function (products) {
        var i = products.length;
        while (i--) {
          if (products[i].slug === slug) {
            $rootScope.addToCart(products[i].id, quantity || 1).then(function (cart) {
              $state.go('cart');
            });
            break;

          }
        }
      });


    };

  });
