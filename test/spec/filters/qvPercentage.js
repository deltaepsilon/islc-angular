'use strict';

describe('Filter: qvPercentage', function () {

  // load the filter's module
  beforeEach(module('islcAngularApp'));

  // initialize a new instance of the filter before each test
  var qvPercentage;
  beforeEach(inject(function ($filter) {
    qvPercentage = $filter('qvPercentage');
  }));

  it('should return the input prefixed with "qvPercentage filter:"', function () {
    var text = 'angularjs';
    expect(qvPercentage(text)).toBe('qvPercentage filter: ' + text);
  });

});
