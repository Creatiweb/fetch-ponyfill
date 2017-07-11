(function (self) {
  'use strict';

  function fetchPonyfill() {
    var self = Object.create(global, {
      fetch: {
        value: undefined,
        writable: true
      }
    });

    var realPromise = self.Promise;
    var Promise = realPromise;
    var XMLHttpRequest = self.XMLHttpRequest;

// {{whatwgFetch}}

    function wrapFetch() {
      return function (u, options, promise) {
        Promise = realPromise;
        if (promise) {
          Promise = promise;
        }
        XMLHttpRequest = options && options.XMLHttpRequest || self.XMLHttpRequest;

        return self.fetch(u, options);
      };
    }

    return {
      fetch: wrapFetch(),
      Headers: self.Headers,
      Request: self.Request,
      Response: self.Response
    };
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return fetchPonyfill();
    });
  } else if (typeof exports === 'object') {
    module.exports = fetchPonyfill();
  } else {
    self.fetchPonyfill = fetchPonyfill();
  }
}(typeof self === 'undefined' ? this : self));
