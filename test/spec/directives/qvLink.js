'use strict';

describe('Directive: qvLink', function () {

  // load the directive's module
  beforeEach(module('islcAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<qv-link></qv-link>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the qvLink directive');
  }));
});
