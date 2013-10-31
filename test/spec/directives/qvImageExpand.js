'use strict';

describe('Directive: qvImageExpand', function () {

  // load the directive's module
  beforeEach(module('islcAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<qv-image-expand></qv-image-expand>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the qvImageExpand directive');
  }));
});
