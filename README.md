# relateurl [![NPM Version](http://badge.fury.io/js/relateurl.png)](http://badge.fury.io/js/relateurl) [![Build Status](https://secure.travis-ci.org/stevenvachon/relateurl.png)](http://travis-ci.org/stevenvachon/relateurl)

> Shorten URLs by converting them from absolute to relative.

If you were to use this library on a website like *http;//example.com/dir1/dir1-1/*, you would get results like these:

| Before                                    | After                              |
| :---------------------------------------- | :--------------------------------- |
| http;//example.com/dir1/dir1-2/index.html | ../dir1-2/                         |
| http;//example.com/dir2/dir2-1/           | /dir2/dir2-1/                      |
| http;//example.com/dir1/dir1-1/           | ./                                 |
| *https*;//example.com/dir1/dir1-1/        | *https*;//example.com/dir1/dir1-1/ |
| http;//google.com/dir/                    | //google.com/dir/                  |
| ../../../../../../../../#anchor           | /#anchor                           |

**All string parsing.** *No* directory browsing. It is very fast and lightweight with zero dependencies.

## Getting Started

This plugin requires [Node.js](http://nodejs.org/) `~0.10`. To install, type this at the command line:
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

Extend the list with any resources you need. Works with [`options.removeDirectoryIndexes`](#options.removeDirectoryIndexes).

#### options.ignore_www
Type: `Boolean`  
Default value: `false`  

This will, for example, consider any domains containing `http://www.example.com/` to be related to any that contain `http://example.com/`.

#### options.output
Type: constant  
Choices: `RelateUrl.ABSOLUTE`,`RelateUrl.PATH_RELATIVE`,`RelateUrl.ROOT_RELATIVE`,`RelateUrl.SHORTEST`  
Default value: `RelateUrl.SHORTEST`  

`RelateUrl.ABSOLUTE` will produce an absolute URL. Overrides [`options.schemeRelative`](#options.schemeRelative) with a value of `false`.  
`RelateUrl.PATH_RELATIVE` will produce something like `../child-of-parent/etc/`.  
`RelateUrl.ROOT_RELATIVE` will produce something like `/child-of-root/etc/`.  
`RelateUrl.SHORTEST` will choose whichever is shortest between root- or path-relative.  

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

Remove any resources that match any found in [`options.directoryIndexes`](#options.directoryIndexes).

#### options.removeEmptyQueries
Type: `Boolean`   
Default value: `false`  

Remove empty query variables. Example: `http://domain.com/?var1&var2=&var3=asdf` will become `http://domain.com/?var3=adsf`. This does not apply to unrelated URLs (with other protocols, auths, hosts and/or ports).

#### options.schemeRelative
Type: `Boolean`   
Default value: `true`  

Output URLs relative to the scheme. Example: `http://example.com/` will become `//example.com/`.

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

var instance = new RelateUrl(from, options);

var result1 = instance.relate(to1);
var result2 = instance.relate(to2, customOptions);
var result3 = instance.relate(to3);
```

## Release History
* 0.1.0 initial release

## Roadmap
* 0.1.x code cleanup
* 0.1.x make `options.removeEmptyQueries=true` only apply to unrelated URLs
* 0.2.0 decipher and return invalid input (special cases) to complete test suite
* 0.3.0 test `options.slashesDenoteHost=false`

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-13/stevenvachon/relateurl)](https://github.com/igrigorik/ga-beacon "Google Analytics") [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stevenvachon/relateurl/trend.png)](https://bitdeli.com/free "Bitdeli Badge")