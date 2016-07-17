/**
 *
 */
'use strict';

jest.autoMockOff();

describe('Site routes', function() {
  let controller = require('../controller');
  let expectedRoutes = {
    get: [
      ['/status', controller.status],
      ['/', controller.index]
    ]
  };
  var mockRouter = {
    get: function(path, handler) {
    }
  };

  let siteRoutes = require('../routes');

  beforeEach(() => {
    spyOn(mockRouter, 'get').and.callThrough();
  });

  it('registers 2 GET handlers in the given router and returns it', function() {
    let router = siteRoutes(mockRouter);
    expect(router).toEqual(mockRouter);
    expect(router.get.calls.count()).toEqual(2);
  });

  it('registers all handlers in the proper order', function() {
    let router = siteRoutes(mockRouter);
    let result = router.get.calls.all().map((item, index) => {
      return item.args;
    });
    expect(result).toEqual(expectedRoutes.get);
  });

  it('it always registers / as last route', function() {
    let router = siteRoutes(mockRouter);
    expect(router.get.calls.mostRecent().args[0]).toEqual('/');
  });

});
