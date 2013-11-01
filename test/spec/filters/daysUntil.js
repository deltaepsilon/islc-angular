'use strict';

describe('Filter: daysUntil', function () {

  // load the filter's module
  beforeEach(module('islcAngularApp'));

  // initialize a new instance of the filter before each test
  var daysUntil;
  beforeEach(inject(function ($filter) {
    daysUntil = $filter('daysUntil');
  }));

  it('should return the input prefixed with "daysUntil filter:"', function () {
    var text = 'angularjs';
    expect(daysUntil(text)).toBe('daysUntil filter: ' + text);
  });

});
