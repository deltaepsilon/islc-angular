'use strict';

describe('Service: assetService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var assetService;
  beforeEach(inject(function (_assetService_) {
    assetService = _assetService_;
  }));

  it('should do something', function () {
    expect(!!assetService).toBe(true);
  });

});
