'use strict';

angular.module('islcAngularApp')
  .controller('CartCtrl', function ($scope, $rootScope, $state, cartService, notificationService, stripeService, _, moment, cart, token, address, $timeout, subscriptionService, transactionService, addressService) {
    if (!$rootScope.cart) {
      $rootScope.cart = cart;
    }

    $scope.token = token;
    $scope.address = address;


    var i =  10,
      year = moment().year(),
      month = moment().month(),
      setDefaults = function () {
        $scope.newCard = {
          exp_year: $scope.years[0],
          exp_month: 0
        };

        if ($scope.checkoutForm) {
          $scope.checkoutForm.$pristine = true;
          $scope.checkoutForm.$dirty = false;
          $scope.checkoutForm.cardNumber.$pristine = true;
          $scope.checkoutForm.cardNumber.$dirty = false;
          $scope.checkoutForm.cvc.$pristine = true;
          $scope.checkoutForm.cvc.$dirty = false;
        }

      },
      setShipped = function () {
        var products = $rootScope.cart.products,
          j = products.length,
          shipped = false;

        while (j--) {
          if (products[j].shipped) {
            shipped = true;
            break;
          }
        }
        $scope.shipped = shipped;

      };
    $scope.years = [];
    while (i--) {
      $scope.years.unshift(i + year);
    }
    $scope.years.unshift('Expiration Year');

    $scope.months = ['Expiration Month', 'January (1)', 'February (2)', 'March (3)', 'April (4)', 'May (5)', 'June (6)', 'July (7)', 'August (8)', 'September (9)', 'October (10)', 'November (11)', 'December (12)'];
    setDefaults();
    setShipped();

    $rootScope.$watch('cart', setShipped);

    $scope.updateCart = function (id, quantity) {
      cartService.update(id, quantity || 0).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else {
          $rootScope.cart = cart;
        }
      });
    };

    $scope.updateCartProduct = function (product) {
      if (product.id && product.quantity) {
        $scope.updateCart(product.id, product.quantity);
      } else if (product.quantity && product.quantity < 1) {
        product.quantity = 1;
      }
    };

    $scope.setCode = function (code) {
      cartService.setDiscount(code).then(function (cart) {
        if (cart.error) {
          notificationService.error('Cart', cart.error);
        } else {
          $rootScope.cart = cart;
        }
      });
    };

    $scope.saveCard = function (card) {
      stripeService.clearCache();
      stripeService.createToken(card).then(function (res) {
        stripeService.saveToken(res.response).then(function (token) {
          $scope.token = token;
        });
        setDefaults();
      }, function (res) {
        notificationService.error('Cart', res.response.error.message);
      });
    };

    $scope.checkout = function (cart, card) {
      stripeService.checkout(cart, card);
    };

    $scope.validateCardNumber = function (number) {
      $scope.checkoutForm.cardNumber.$invalid = !stripeService.validateCardNumber(number);

    };

    $scope.validateCVC = function (cvc) {
      $scope.checkoutForm.cvc.$invalid = !stripeService.validateCVC(cvc);

    };

    $scope.checkout = function () {
      $rootScope.startLoader();
      cartService.checkout().then(function (transaction) {
        if (transaction.error) {
          $rootScope.cancelLoader();
          notificationService.error('Checkout', transaction.error);
        } else {
          subscriptionService.clearCache();
          transactionService.clearCache();
          subscriptionService.get().then(function (subscriptions) {
            $state.go('transaction', {id: transaction.id});
          });

        }

        //Force reload the cart. We wouldn't want stuff to show up in the cart without reason.
        $timeout(function () {
          cartService.clearCache();
          cartService.get().then(function (cart) {
            $rootScope.cart = cart;
          });
        });

      });

    };

    $scope.updateAddress = function (address) {
      addressService.update(address).then(function (res) {
        if (res.error) {
          notificationService.error('Address', res.error);
        } else {
          $scope.address = res;
        }
      });
    };

  });
