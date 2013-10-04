'use strict';

describe('Service: mockService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var mockService;
  beforeEach(inject(function (_mockService_) {
    mockService = _mockService_;
  }));

  it('should do something', function () {
    expect(!!mockService).toBe(true);
  });

});
