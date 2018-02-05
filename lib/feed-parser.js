(() => {
  'use strict';

  const cheerio   = require('cheerio');
  const xmlParser = require('xml-js');

  const startsWith = require('./starts-with');

  /**
   * 
   * @param {String} html 
   * @return {Object}
   */
  const getDataFromContent = (html = '') => {
    let $   = cheerio.load(html),
      data  = {};

    // Mirrors
    data.mirrors = [];

    $('span[id^=mirror][style] a').each((i, ele) => {
      let $ele = $(ele);

      data.mirrors.push({
        name: $ele.text(),
        url: $ele.attr('href')
      });
    });

    // Image
    data.image = $($('img').get(0)).attr('src');

    return data;
  };

  /**
   * 
   * @param {Array} _items 
   */
  const parseItems = (_items = []) => {
    let i         = 0,
      len         = _items.length,
      items       = [],
      titleRegex  = /(.*?)\.\d{4}\./g,
      item, contentEncoded, data, title;

    for (; i < len; i++) {
      item            = _items[i];
      contentEncoded  = item['content:encoded']._cdata;
      data            = getDataFromContent(contentEncoded);
      title           = /(.*?)\.(\d{4}|German|GERMAN)\./g.exec(item.title._text);
      title           = (title !== null) ? title[1].replace(/\./g, ' ') : item.title._text;

      items.push({
        original_title: item.title._text,
        title: title,
        description: contentEncoded,
        date: new Date(item.pubDate._text),
        permalink: item.link._text,
        image: data.image,
        mirrors: data.mirrors
      });
    }

    return items;
  };

  /**
   * 
   * @param {*} xml 
   */
  const feedParser = async (xml = '') => {
    let json  = JSON.parse(xmlParser.xml2json(xml, {compact: true})),
      items   = parseItems(json.rss.channel.item);

    return items;
  };

  module.exports = feedParser;

})();
