'use strict';

describe('Service: paramsService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var paramsService;
  beforeEach(inject(function (_paramsService_) {
    paramsService = _paramsService_;
  }));

  it('should do something', function () {
    expect(!!paramsService).toBe(true);
  });

});
