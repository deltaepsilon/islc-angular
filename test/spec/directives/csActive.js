'use strict';

describe('Directive: csActive', function () {

  // load the directive's module
  beforeEach(module('islcAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cs-active></cs-active>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the csActive directive');
  }));
});
