(() => {
  'use strict';

  const followRedirects = require('follow-redirects');

  const fetch = url => {
    return new Promise((resolve, reject) => {
      let body  = [],
        lib     = url.indexOf('https') === 0 ? followRedirects.https : followRedirects.http;

      lib.get(url, response => {
        if (response.statusCode < 200 || response.statusCode > 299) return reject(new Error(`Failed to load page, status code: ${response.statusCode}`));

        response.on('data', chunk => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      }).on('error', err => reject(err));
    });
  };

  module.exports = fetch;

})();
