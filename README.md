# relateurl [![NPM Version](http://badge.fury.io/js/relateurl.png)](http://badge.fury.io/js/relateurl) [![Build Status](https://secure.travis-ci.org/stevenvachon/relateurl.png)](http://travis-ci.org/stevenvachon/relateurl)

> Shorten URLs by converting them from absolute to relative.

Let's explain with examples. If you were to use this library on a website like http://example.com/test/testing/, you would get results like these:

1. 
  * **Before:** http://example.com/test/another-test/index.html
  * **After:** ../another-test/
2. 
  * **Before:** http://example.com/wp-content/themes/twentyten/style.css
  * **After:** /wp-content/themes/twentyten/style.css
3. 
  * **Before:** http*s*://example.com/wp-content/themes/twentyten/style.css
  * **After:** http*s*://example.com/wp-content/themes/twentyten/style.css
4. 
  * **Before:** http://google.com/test/
  * **After:** //google.com/test/
5. 
  * **Before:** ../../../../../../../../#anchor
  * **After:** /#anchor
  * **After** (`outputType=RelateUrl.PATH_RELATIVE`)**:** ../../#anchor

**All string parsing.** *No* directory browsing.

## Getting Started

This plugin requires [Node.js](http://nodejs.org/) `~0.6`. To install, type this at the command line:
```
npm install relateurl --save-dev
```

### Options

#### options.defaultPorts
Type: `Object`   
Default value: `{ftp:21, http:80, https:443}`  

Extend the list with any ports you need. Any URLs containing these default ports will have them removed. Example: `http://example.com:80/` will become `http://example.com/`.

#### options.directoryIndexes
Type: `Array`   
Default value: `["index.html"]`  

Extend the list with any resources you need. Works with [options.removeDirectoryIndexes](#options.removeDirectoryIndexes).

#### options.ignore_www
Type: `Boolean`  
Default value: `false`  

This will, for example, consider any domains containing `http://www.example.com/` to be related to any that contain `http://example.com/`.

#### options.output
Type: constant (`String`)  
Choices: `RelateUrl.ABSOLUTE`,`RelateUrl.PATH_RELATIVE`,`RelateUrl.ROOT_RELATIVE`,`RelateUrl.SHORTEST`  
Default value: `RelateUrl.SHORTEST`  

`RelateUrl.ABSOLUTE` will simply run Node's [`url.resolve`](http://nodejs.org/api/url.html#url_url_resolve_from_to) for you.
`RelateUrl.PATH_RELATIVE` will produce something like `../child-of-parent/etc/`.
`RelateUrl.ROOT_RELATIVE` will produce something like `/child-of-root/etc/`.
`RelateUrl.SHORTEST` will choose whichever is shortest between root- or path-relative and overrides [`options.schemeRelative`](#options.schemeRelative) to a value of `true`.

#### options.rejectedSchemes
Type: `Array`   
Default value: `["data","javascript","mailto"]`  

Extend the list with any additional schemes. Example: `javascript:something` will not be modified.

#### options.removeAuth
Type: `Boolean`   
Default value: `false`  

Remove user authentication information from the output URL.


#### options.removeDirectoryIndexes
Type: `Boolean`   
Default value: `true`  

Remove any resources that match any found in [options.directoryIndexes](#options.directoryIndexes).

#### options.removeEmptyQueries
Type: `Boolean`   
Default value: `false`  

Remove empty (`""`) query variables.

#### options.schemeRelative
Type: `Boolean`   
Default value: `true`  

Output URLs relative to the scheme. Example: `http://example.com/` will become `//example.com/`. Here's [more info](http://www.paulirish.com/2010/the-protocol-relative-url/) on the topic.

#### options.slashesDenoteHost
Type: `Boolean`   
Default value: `true`  

Passed to Node's [`url.parse`](http://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost).

### Examples
This library can be used as a [function for single-use](#single-instance) or as a [class for multiple conversions](#reusable-instances).

Upon successful conversion, a `String` will be returned. If an issue is encountered, `false` will be returned.

#### Single Instance
```js
var RelateUrl = require("relateurl");

var result = RelateUrl.relate(from, to, options);
```

#### Reusable Instances
```js
var RelateUrl = require("relateurl");

var instance = new RelateUrl(from1, options);

var result1 = instance.relate(to1);
var result2 = instance.relate(to2, customOptions);
var result3 = instance.relate(to3);
```

## Release History
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-10/stevenvachon/smil2css)](https://github.com/igrigorik/ga-beacon "Google Analytics") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stevenvachon/smil2css/trend.png)](https://bitdeli.com/free "Bitdeli Badge")