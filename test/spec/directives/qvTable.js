'use strict';

describe('Directive: qvTable', function () {

  // load the directive's module
  beforeEach(module('islcAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<qv-table></qv-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the qvTable directive');
  }));
});
