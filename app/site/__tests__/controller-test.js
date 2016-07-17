/**
 *
 */
'use strict';

jest.unmock('../controller.js');

const path = require('path');
const site = require('../controller');


describe('Handlers for site routes', function() {
  var request = {};
  var response = {
    staticPath: null,
    respData: null,
    sendFile: function(filePath) {
      this.staticPath = filePath;
    },
    send: function(data) {
      this.respData = data;
    }
  };

  beforeEach(function() {
    request = {};

    response.staticPath = null;
    response.respData = null;

    spyOn(response, 'sendFile').and.callThrough();
    spyOn(response, 'send').and.callThrough();
  });


  describe('Default Route', function() {
    it('serves a static file with the correct path', () => {
      site.index(request, response);
      expect(response.sendFile).toHaveBeenCalled();
      expect(response.staticPath).toEqual(path.join(__dirname, '../../public/index.html'));
    });
  });


  describe('Status Route', function() {
    it('serves raw data containing the app status', () => {
      site.status(request, response);
      expect(response.send).toBeCalled();
      expect(response.respData).toEqual(jasmine.objectContaining({status: jasmine.any(String)}));
    });
  });

});
