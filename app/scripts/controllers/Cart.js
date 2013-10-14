'use strict';

angular.module('islcAngularApp')
  .controller('CartCtrl', function ($scope, $rootScope, cartService, notificationService, stripeService, _, moment, cart) {
    if (!$rootScope.cart) {
      $rootScope.cart = cart;
    }


    var i =  10,
      year = moment().year(),
      month = moment().month(),
      setDefaults = function () {
        $scope.newCard = {
          exp_year: $scope.years[0],
          exp_month: $scope.months[0]
        };

        if ($scope.checkoutForm) {
          $scope.checkoutForm.$pristine = true;
          $scope.checkoutForm.$dirty = false;
          $scope.checkoutForm.cardNumber.$pristine = true;
          $scope.checkoutForm.cardNumber.$dirty = false;
          $scope.checkoutForm.cvc.$pristine = true;
          $scope.checkoutForm.cvc.$dirty = false;
        }


      };
    $scope.years = [];
    while (i--) {
      $scope.years.unshift(i + year);
    }

    $scope.months = ['January (1)', 'February (2)', 'March (3)', 'April (4)', 'May (5)', 'June (6)', 'July (7)', 'August (8)', 'September (9)', 'October (10)', 'November (11)', 'December (12)'];
    setDefaults();

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

    $scope.setCard = function (card) {
      card = _.clone(card);
      card.exp_month += 1;
      stripeService.createToken(card).then(function (res) {
        stripeService.saveCard(res.response).then(function (card) {
          $scope.card = card;
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

    }

    $scope.validateCVC = function (cvc) {
      $scope.checkoutForm.cvc.$invalid = !stripeService.validateCVC(cvc);

    }

  });
