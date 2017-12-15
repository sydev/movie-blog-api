# movie-blog-api

An unofficial API for http://www.movie-blog.org/.

## Installation

```
$ yarn add movie-blog-api
```

## Usage

```javascript
const movieBlog = require('movie-blog-api');

// Get the newest releases
movieBlog.getNewest()
  .then(items => {
    console.log(items); // Array of media objects
  });

// Search for movies or tv shows
movieBlog.search('The Avengers')
  .then(items => {
    console.log(items); // Array of media objects
  });

```

Media object example:

```json
  { title: 'Marvels.The.Avengers.2.Age.of.Ultron.3D.HSBS.2015.German.DTSD.7.1.DL.1080p.BluRay.x264-fzn',
  description: '<p>...A bunch of content...</p>',
  date: 2017-12-05T20:36:56.000Z,
  permalink: 'http://www.movie-blog.org/2017/12/05/marvels-the-avengers-2-age-of-ultron-3d-hsbs-2015-german-dtsd-7-1-dl-1080p-bluray-x264-fzn/',
  image: 'http://fs2.directupload.net/images/150908/fx48jdic.jpg',
  mirrors:
   [ { name: 'Openload.co',
       url: 'https://filecrypt.cc/Container/88E048D667.html' },
     { name: 'Share-online',
       url: 'http://filecrypt.cc/Container/3CA1F9C69C.html' } ] }
```

## Tests

```
$ yarn test
```
