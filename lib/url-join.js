(() => {
  'use strict';

  const {dirname} = require('path');

  const startsWith = require('./starts-with');

  const regexes = {
    slashes: /^\/|\/$/g, // find slash at the begin and at the end
    endSlash: /\/$/g, // find the slash at the end
    parents: /\.\.\//g // find '../' references
  }

  /**
   * urlJoiner
   * Joins an url with one or more pathes
   * 
   * @param {String} baseUrl The base url
   * @param {...String} pathes A relative or absolute path
   * @return {String} The joined url
   */
  const urlJoiner = (baseUrl, ...pathes) => {
    // of only the base url is given, return it
    if (pathes.length === 0) return baseUrl;
    
    let pathesIterator  = 0,
      pathesLength      = pathes.length,
      url               = (startsWith(baseUrl, '//')) ? baseUrl.replace(regexes.endSlash, '') : baseUrl.replace(regexes.slashes, ''),
      _path, matchCount, matchIterator;
    
    for (; pathesIterator < pathesLength; pathesIterator++) {
      _path = pathes[pathesIterator].replace(regexes.slashes, '');
      
      // if path is a relative one
      if (startsWith(_path, '../')) {
        matchIterator = 0;
        matchCount    = (_path.match(regexes.parents) || []).length; // Get amount of '../' references
        _path         = _path.replace(regexes.parents, ''); // Remove '../' references

        for (; matchIterator < matchCount; matchIterator++) url = dirname(url);
      }
      
      url  += `/${_path}`;
    }
    
    return url;
  };

  module.exports = urlJoiner;
})();
