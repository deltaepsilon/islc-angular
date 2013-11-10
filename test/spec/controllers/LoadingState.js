'use strict';

describe('Controller: LoadingstateCtrl', function () {

  // load the controller's module
  beforeEach(module('islcAngularApp'));

  var LoadingstateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadingstateCtrl = $controller('LoadingstateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
