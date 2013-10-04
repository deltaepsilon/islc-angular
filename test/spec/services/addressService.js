'use strict';

describe('Service: addressService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var addressService;
  beforeEach(inject(function (_addressService_) {
    addressService = _addressService_;
  }));

  it('should do something', function () {
    expect(!!addressService).toBe(true);
  });

});
