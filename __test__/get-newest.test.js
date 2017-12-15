(() => {
  'use strict';

  const {test} = require('ava');

  const {getNewest} = require('../index');

  const urlRegex  = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;  
  const keys      = ['title', 'description', 'date', 'permalink', 'image', 'mirrors'];

  test('Get newest', async t => {
    const movies = await getNewest();
    
    t.true(Array.isArray(movies));

    movies.forEach(movie => {
      t.deepEqual(Object.keys(movie), keys);

      t.true(typeof movie.title === 'string');
      t.true(typeof movie.description === 'string');
      t.true(movie.date instanceof Date);
      t.regex(movie.permalink, urlRegex);
      t.regex(movie.image, urlRegex);

      t.true(Array.isArray(movie.mirrors));

      movie.mirrors.forEach(mirror => {
        t.true(mirror.hasOwnProperty('name'));
        t.true(typeof mirror.name === 'string');

        t.true(mirror.hasOwnProperty('url'));
        t.regex(mirror.url, urlRegex);
      });
    });
  });

})();
