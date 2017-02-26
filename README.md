# relateurl [![NPM Version][npm-image]][npm-url] ![File Size][filesize-image] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Create a relative URL with minify options.


With `http://domain.com/seg1/seg1-1/` as a base URL, you can produce:

| Before                                     | After                             |
| :----------------------------------------- | :-------------------------------- |
| `http://domain.com/seg1/seg1-2/index.html` | `../seg1-2/`                      |
| `http://domain.com/seg2/seg2-1/`           | `/seg2/seg2-1/`                   |
| `http://domain.com/seg1/seg1-1/`           | ` `                               |
| `httpS://domain.com/seg1/seg1-1/`          | `https://domain.com/seg1/seg1-1/` |
| `../../../../../../../../#anchor`          | `/#anchor`                        |


## Installation

[Node.js](http://nodejs.org/) `>= 8` is required. To install, type this at the command line:
```shell
npm install relateurl
```


## Usage

Inputs *must* be [`URL`](https://developer.mozilla.org/en/docs/Web/API/URL) instances.

```js
const relateURL = require('relateurl');

const base = new URL('http://domain.com/seg1/seg1-1/');
const url  = new URL('//domain.com/seg1/seg1-2/index.html', base);

relateURL(url, base, options);
//-> ../seg1-2/
```


## Options

It is simplest to use an [option profile](#option-profiles), but custom configurations are still possible.

### `output`
Type: `Symbol`  
Default value: `relateURL.SHORTEST`  
The limit of how far the resulting URL should be related. Possible values:

* `PROTOCOL_RELATIVE`: will try to produce something like `//domain.com/path/to/file.html`.
* `ROOT_PATH_RELATIVE`: will try to produce something like `/child-of-root/etc/`.
* `PATH_RELATIVE`: will try to produce something like `../child-of-parent/etc/`.
* `SHORTEST`: will try to choose whichever is shortest between `PATH_RELATIVE` and `ROOT_PATH_RELATIVE`.


### Minify Options

Any other defined option will be passed to [minurl](https://npmjs.com/minurl). Avoid setting `stringify` to `false`, as it will prevent any operations performed by this library from being outputted.

#### Ignoring Basic Authentication
Ignoring a URL's username and password attributes will need the not-so-obvious `removeAuth` option (from `minurl`):
```js
const base = new URL('http://user:pass@domain.com/seg1/seg1-1/');
const url  = new URL('http://domain.com/seg1/seg1-2/');

relateURL(url, base, {
  removeAuth: true
});
//-> ../seg1-2/
````


### Option Profiles

There're two profiles: [`CAREFUL_PROFILE` and `COMMON_PROFILE`](https://npmjs.com/minurl#option-profiles).


[npm-image]: https://img.shields.io/npm/v/relateurl.svg
[npm-url]: https://npmjs.org/package/relateurl
[filesize-image]: https://img.shields.io/badge/size-14.9kB%20gzipped-blue.svg
[travis-image]: https://img.shields.io/travis/stevenvachon/relateurl.svg
[travis-url]: https://travis-ci.org/stevenvachon/relateurl
[coveralls-image]: https://img.shields.io/coveralls/stevenvachon/relateurl.svg
[coveralls-url]: https://coveralls.io/github/stevenvachon/relateurl
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/relateurl.svg
[greenkeeper-url]: https://greenkeeper.io/
