'use strict';

describe('Controller: SubscriptionCtrl', function () {

  // load the controller's module
  beforeEach(module('islcAngularApp'));

  var SubscriptionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubscriptionCtrl = $controller('SubscriptionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
