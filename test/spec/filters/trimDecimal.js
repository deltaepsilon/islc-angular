'use strict';

describe('Filter: trimDecimal', function () {

  // load the filter's module
  beforeEach(module('islcAngularApp'));

  // initialize a new instance of the filter before each test
  var trimDecimal;
  beforeEach(inject(function ($filter) {
    trimDecimal = $filter('trimDecimal');
  }));

  it('should return the input prefixed with "trimDecimal filter:"', function () {
    var text = 'angularjs';
    expect(trimDecimal(text)).toBe('trimDecimal filter: ' + text);
  });

});
