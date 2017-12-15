(() => {
  'use strict';

  module.exports = url => {

    return new Promise((resolve, reject) => {
      let body  = [],
        lib     = url.indexOf('https') === 0 ? require('https') : require('http');

      let request = lib.get(url, response => {
        if (response.statusCode < 200 || response.statusCode > 299) return reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
        
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      });

      request.on('error', err => reject(err));
    });
  };

})();
