'use strict';

describe('Service: transactionService', function () {

  // load the service's module
  beforeEach(module('islcAngularApp'));

  // instantiate service
  var transactionService;
  beforeEach(inject(function (_transactionService_) {
    transactionService = _transactionService_;
  }));

  it('should do something', function () {
    expect(!!transactionService).toBe(true);
  });

});
