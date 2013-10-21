'use strict';

describe('Service: PageService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var PageService;
  beforeEach(inject(function (_PageService_) {
    PageService = _PageService_;
  }));

  it('should do something', function () {
    expect(!!PageService).toBe(true);
  });

});
