(() => {
  'use strict';

  /**
   * 
   * @param {String} string 
   * @param {String} search 
   */
  module.exports = (string = '', search = '') => string.indexOf(search) === 0;
  
})();
