(() => {
  'use strict';

  const feedParser  = require('./lib/feed-parser');
  const fetch       = require('./lib/fetch');
  const urlJoin     = require('./lib/url-join');

  const baseUrl = 'http://www.movie-blog.org';

  /**
   * @type {Object} Mirror
   * @prop {String} name
   * @prop {String} url
   */

  /**
   * @type {Object} Media
   * @prop {String} title
   * @prop {String} description
   * @prop {Date} date
   * @prop {String} permalink
   * @prop {String} image
   * @prop {Mirror[]} mirrors 
   */

  /**
   * Get the newest releases
   * @param {Number} page 
   * @return {Promise<Media[]>}
   */
  const getNewest = (page = 1) => {
    let url = urlJoin(baseUrl, 'feed', (page === 1) ? '' : `?paged=${page}`); 

    return fetch(url).then(feedParser);
  };

  /**
   * Search for movies and tv shows
   * @param {String} query 
   * @return {Promise<Media[]>}
   */
  const search = (query = '') => {
    let q = encodeURIComponent(query), 
      url = urlJoin(baseUrl, `?s=${q}&feed=rss2`);

    return fetch(url).then(feedParser);
  };


  module.exports = {
    getNewest,
    search
  };

})();
