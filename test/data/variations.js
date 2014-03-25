module.exports =
{
	//"site": "http://domain.com/",
	//"site": "http://www.domain.com/",
	//"site": "http://domain/./../test/index.html",
	"site": "http://user:pass@www.domain.com/./../test/../tes.ter/index.html",
	//"site": "http://user:pass@www.domain.com/./../test/../tes.ter/index.html?va r1= +dir&var2=text&var3#anchor",	// MUST test this one
	"tests":
	{
		"all parts, removing from right":
		[
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir",
				"expected_SHORTEST":      "/test/?va%20r1=++dir"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir",
				"expected_SHORTEST":      "/test/?va%20r1=++dir"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1=",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1",
				"expected_PATH_RELATIVE": "../test/?va%20r1",
				"expected_ROOT_RELATIVE": "/test/?va%20r1",
				"expected_SHORTEST":      "/test/?va%20r1"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1",
				"expected_PATH_RELATIVE": "../test/?va%20r1",
				"expected_ROOT_RELATIVE": "/test/?va%20r1",
				"expected_SHORTEST":      "/test/?va%20r1"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/",
				"expected_PATH_RELATIVE": "../test/",
				"expected_ROOT_RELATIVE": "/test/",
				"expected_SHORTEST":      "/test/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/",
				"expected_PATH_RELATIVE": "../test/",
				"expected_ROOT_RELATIVE": "/test/",
				"expected_SHORTEST":      "/test/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/index",
				"expected_PATH_RELATIVE": "../test/index",
				"expected_ROOT_RELATIVE": "/test/index",
				"expected_SHORTEST":      "/test/index"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/",
				"expected_PATH_RELATIVE": "../test/",
				"expected_ROOT_RELATIVE": "/test/",
				"expected_SHORTEST":      "/test/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/tes.ter/",
				"expected_PATH_RELATIVE": "../test/tes.ter/",
				"expected_ROOT_RELATIVE": "/test/tes.ter/",
				"expected_SHORTEST":      "/test/tes.ter/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/tes.ter/",
				"expected_PATH_RELATIVE": "../test/tes.ter/",
				"expected_ROOT_RELATIVE": "/test/tes.ter/",
				"expected_SHORTEST":      "/test/tes.ter/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test//",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/",
				"expected_PATH_RELATIVE": "../test/",
				"expected_ROOT_RELATIVE": "/test/",
				"expected_SHORTEST":      "/test/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test/",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/",
				"expected_PATH_RELATIVE": "../test/",
				"expected_ROOT_RELATIVE": "/test/",
				"expected_SHORTEST":      "/test/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			{
				"href":                   "http://user:pass@www.domain.com/",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			{
				"href":                   "http://user:pass@www.domain.com",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			{
				"href":                   "http://user:pass@www.domain./",
				"expected_ABSOLUTE":      "http://user:pass@www.domain./",
				"expected_PATH_RELATIVE": "//user:pass@www.domain./",
				"expected_ROOT_RELATIVE": "//user:pass@www.domain./",
				"expected_SHORTEST":      "//user:pass@www.domain./"
			},
			{
				"href":                   "http://user:pass@www.domain.",
				"expected_ABSOLUTE":      "http://user:pass@www.domain./",
				"expected_PATH_RELATIVE": "//user:pass@www.domain./",
				"expected_ROOT_RELATIVE": "//user:pass@www.domain./",
				"expected_SHORTEST":      "//user:pass@www.domain./"
			},
			{
				"href":                   "http://user:pass@www.domain/",
				"expected_ABSOLUTE":      "http://user:pass@www.domain/",
				"expected_PATH_RELATIVE": "//user:pass@www.domain/",
				"expected_ROOT_RELATIVE": "//user:pass@www.domain/",
				"expected_SHORTEST":      "//user:pass@www.domain/"
			},
			{
				"href":                   "http://user:pass@www.domain",
				"expected_ABSOLUTE":      "http://user:pass@www.domain/",
				"expected_PATH_RELATIVE": "//user:pass@www.domain/",
				"expected_ROOT_RELATIVE": "//user:pass@www.domain/",
				"expected_SHORTEST":      "//user:pass@www.domain/"
			},
			{
				"href":                   "http://user:pass@www./",
				"expected_ABSOLUTE":      "http://user:pass@www./",
				"expected_PATH_RELATIVE": "//user:pass@www./",
				"expected_ROOT_RELATIVE": "//user:pass@www./",
				"expected_SHORTEST":      "//user:pass@www./"
			},
			{
				"href":                   "http://user:pass@www.",
				"expected_ABSOLUTE":      "http://user:pass@www./",
				"expected_PATH_RELATIVE": "//user:pass@www./",
				"expected_ROOT_RELATIVE": "//user:pass@www./",
				"expected_SHORTEST":      "//user:pass@www./"
			},
			{
				"href":                   "http://user:pass@www/",
				"expected_ABSOLUTE":      "http://user:pass@www/",
				"expected_PATH_RELATIVE": "//user:pass@www/",
				"expected_ROOT_RELATIVE": "//user:pass@www/",
				"expected_SHORTEST":      "//user:pass@www/"
			},
			{
				"href":                   "http://user:pass@www",
				"expected_ABSOLUTE":      "http://user:pass@www/",
				"expected_PATH_RELATIVE": "//user:pass@www/",
				"expected_ROOT_RELATIVE": "//user:pass@www/",
				"expected_SHORTEST":      "//user:pass@www/"
			},
			{
				"href":                   "http://user:pass@/",
				"expected_ABSOLUTE":      "http://user:pass@/",
				"expected_PATH_RELATIVE": "//user:pass@/",
				"expected_ROOT_RELATIVE": "//user:pass@/",
				"expected_SHORTEST":      "//user:pass@/"
			},
			{
				"href":                   "http://user:pass@",
				"expected_ABSOLUTE":      "http://user:pass@/",
				"expected_PATH_RELATIVE": "//user:pass@/",
				"expected_ROOT_RELATIVE": "//user:pass@/",
				"expected_SHORTEST":      "//user:pass@/"
			},
			/*{
				"href":                   "http://user:pass/",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "http://user:pass",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			{
				"href":                   "http://user/",
				"expected_ABSOLUTE":      "http://user/",
				"expected_PATH_RELATIVE": "//user/",
				"expected_ROOT_RELATIVE": "//user/",
				"expected_SHORTEST":      "//user/"
			},
			{
				"href":                   "http://user",
				"expected_ABSOLUTE":      "http://user/",
				"expected_PATH_RELATIVE": "//user/",
				"expected_ROOT_RELATIVE": "//user/",
				"expected_SHORTEST":      "//user/"
			},
			{
				"href":                   "http:///",
				"expected_ABSOLUTE":      "http:///",
				"expected_PATH_RELATIVE": "///",
				"expected_ROOT_RELATIVE": "///",
				"expected_SHORTEST":      "///"
			},
			{
				"href":                   "http://",
				"expected_ABSOLUTE":      "http:///",
				"expected_PATH_RELATIVE": "///",
				"expected_ROOT_RELATIVE": "///",
				"expected_SHORTEST":      "///"
			},
			{
				"href":                   "http:/",
				"expected_ABSOLUTE":      "http:///",
				"expected_PATH_RELATIVE": "///",
				"expected_ROOT_RELATIVE": "///",
				"expected_SHORTEST":      "///"
			},
			{
				"href":                   "http:",
				"expected_ABSOLUTE":      "http:///",
				"expected_PATH_RELATIVE": "///",
				"expected_ROOT_RELATIVE": "///",
				"expected_SHORTEST":      "///"
			},
			{
				"href":                   "http",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/http",
				"expected_PATH_RELATIVE": "http",
				"expected_ROOT_RELATIVE": "/tes.ter/http",
				"expected_SHORTEST":      "http"
			}/*,
			{
				"href":                   "",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			}*/
		],
		"all parts, removing from left":
		[
			{
				"href":                   "http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			/*{
				"href":                   "://user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			{
				"href":                   "//user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			/*{
				"href":                   "user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   ":pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   ".com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   ":80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			{
				"href":                   "80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/80/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "80/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/80/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "80/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "//tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "//tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "//tes.ter/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "/tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "/./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "./../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "/index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   ".html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/.html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": ".html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/.html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      ".html?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/html?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "html?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "?va%20r1=++dir&var2=text&var3#anchor"
			},
			/*{
				"href":                   "var1=../ +dir/&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "=../+ dir/&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "../+ dir/&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			{
				"href":                   "var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/var3#anchor",
				"expected_PATH_RELATIVE": "var3#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/var3#anchor",
				"expected_SHORTEST":      "var3#anchor"
			},
			{
				"href":                   "#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#anchor",
				"expected_PATH_RELATIVE": "#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/#anchor",
				"expected_SHORTEST":      "#anchor"
			},
			{
				"href":                   "anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/anchor",
				"expected_PATH_RELATIVE": "anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/anchor",
				"expected_SHORTEST":      "anchor"
			}
		],
		"edge cases":
		[
			{
				"href":                   "http://user123:pass123@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user123:pass123@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "//user123:pass123@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "//user123:pass123@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "//user123:pass123@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "http://user@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "//user@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "//user@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "//user@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "http://:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "//:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "//:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "//:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/(test)/tes.ter/../(index.html)?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/(test)/(index.html)?va%20r1=++dir&var2=text&var3#anchor",
				"expected_PATH_RELATIVE": "../(test)/(index.html)?va%20r1=++dir&var2=text&var3#anchor",
				"expected_ROOT_RELATIVE": "/(test)/(index.html)?va%20r1=++dir&var2=text&var3#anchor",
				"expected_SHORTEST":      "/(test)/(index.html)?va%20r1=++dir&var2=text&var3#anchor"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor=asdf",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor=asdf",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor=asdf",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor=asdf",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor=asdf"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#?anchor=asdf",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#?anchor=asdf",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#?anchor=asdf",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#?anchor=asdf",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#?anchor=asdf"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#&anchor=asdf",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#&anchor=asdf",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#&anchor=asdf",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#&anchor=asdf",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#&anchor=asdf"
			},
			{
				"href":                   "http://user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor/asdf",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/test/?va%20r1=++dir&var2=text&var3#anchor/asdf",
				"expected_PATH_RELATIVE": "../test/?va%20r1=++dir&var2=text&var3#anchor/asdf",
				"expected_ROOT_RELATIVE": "/test/?va%20r1=++dir&var2=text&var3#anchor/asdf",
				"expected_SHORTEST":      "/test/?va%20r1=++dir&var2=text&var3#anchor/asdf"
			},
			/*{
				"href":                   ":/user:pass@www.domain.com:80/test/tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			/*{
				"href":                   "http://user123:pass123/",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "http://user123:pass123",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},*/
			{
				"href":                   "./index.html",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "../index.html",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			/*{
				"href":                   ".index.html",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/.index.html",
				"expected_PATH_RELATIVE": ".index.html",
				"expected_ROOT_RELATIVE": "/tes.ter/.index.html",
				"expected_SHORTEST":      ".index.html"
			},
			{
				"href":                   "..index.html",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/..index.html",
				"expected_PATH_RELATIVE": "..index.html",
				"expected_ROOT_RELATIVE": "/tes.ter/..index.html",
				"expected_SHORTEST":      "..index.html"
			},*/
			{
				"href":                   "./#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#anchor",
				"expected_PATH_RELATIVE": "#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/#anchor",
				"expected_SHORTEST":      "#anchor"
			},
			{
				"href":                   "../#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/#anchor",
				"expected_PATH_RELATIVE": "../#anchor",
				"expected_ROOT_RELATIVE": "/#anchor",
				"expected_SHORTEST":      "/#anchor"
			},
			/*{
				"href":                   ".#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#anchor",
				"expected_PATH_RELATIVE": "#anchor",
				"expected_ROOT_RELATIVE": "/tes.ter/#anchor",
				"expected_SHORTEST":      "#anchor"
			},
			{
				"href":                   "..#anchor",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/#anchor",
				"expected_PATH_RELATIVE": "../#anchor",
				"expected_ROOT_RELATIVE": "/#anchor",
				"expected_SHORTEST":      "/#anchor"
			},*/
			{
				"href":                   "./#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#",
				"expected_PATH_RELATIVE": "#",
				"expected_ROOT_RELATIVE": "/tes.ter/#",
				"expected_SHORTEST":      "#"
			},
			{
				"href":                   "../#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/#",
				"expected_PATH_RELATIVE": "../#",
				"expected_ROOT_RELATIVE": "/#",
				"expected_SHORTEST":      "/#"
			},
			/*{
				"href":                   ".#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#",
				"expected_PATH_RELATIVE": "#",
				"expected_ROOT_RELATIVE": "/tes.ter/#",
				"expected_SHORTEST":      "#"
			},
			{
				"href":                   "..#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/#",
				"expected_PATH_RELATIVE": "../#",
				"expected_ROOT_RELATIVE": "/#",
				"expected_SHORTEST":      "/#"
			},*/
			{
				"href":                   "#",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/#",
				"expected_PATH_RELATIVE": "#",
				"expected_ROOT_RELATIVE": "/tes.ter/#",
				"expected_SHORTEST":      "#"
			},
			{
				"href":                   "./?var",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/?var",
				"expected_PATH_RELATIVE": "?var",
				"expected_ROOT_RELATIVE": "/tes.ter/?var",
				"expected_SHORTEST":      "?var"
			},
			{
				"href":                   "../?var",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?var",
				"expected_PATH_RELATIVE": "../?var",
				"expected_ROOT_RELATIVE": "/?var",
				"expected_SHORTEST":      "/?var"
			},
			/*{
				"href":                   ".?var",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/?var",
				"expected_PATH_RELATIVE": "?var",
				"expected_ROOT_RELATIVE": "/tes.ter/?var",
				"expected_SHORTEST":      "?var"
			},
			{
				"href":                   "..?var",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/?var",
				"expected_PATH_RELATIVE": "../?var",
				"expected_ROOT_RELATIVE": "/?var",
				"expected_SHORTEST":      "/?var"
			},*/
			{
				"href":                   "./?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "../?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			/*{
				"href":                   ".?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "..?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},*/
			{
				"href":                   "?",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "./",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "../",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			},
			/*{
				"href":                   ".",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/tes.ter/",
				"expected_PATH_RELATIVE": "./",
				"expected_ROOT_RELATIVE": "/tes.ter/",
				"expected_SHORTEST":      "./"
			},
			{
				"href":                   "..",
				"expected_ABSOLUTE":      "http://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "../",
				"expected_ROOT_RELATIVE": "/",
				"expected_SHORTEST":      "/"
			}*/
		],
		"different protocols":
		[
			{
				"href":                   "https://user:pass@www.domain.com:443/",
				"expected_ABSOLUTE":      "https://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "https://user:pass@www.domain.com/",
				"expected_ROOT_RELATIVE": "https://user:pass@www.domain.com/",
				"expected_SHORTEST":      "https://user:pass@www.domain.com/"
			},
			{
				"href":                   "ftp://user:pass@www.domain.com:80/",
				"expected_ABSOLUTE":      "ftp://user:pass@www.domain.com:80/",
				"expected_PATH_RELATIVE": "ftp://user:pass@www.domain.com:80/",
				"expected_ROOT_RELATIVE": "ftp://user:pass@www.domain.com:80/",
				"expected_SHORTEST":      "ftp://user:pass@www.domain.com:80/"
			},
			{
				"href":                   "ftp://user:pass@www.domain.com:21/",
				"expected_ABSOLUTE":      "ftp://user:pass@www.domain.com/",
				"expected_PATH_RELATIVE": "ftp://user:pass@www.domain.com/",
				"expected_ROOT_RELATIVE": "ftp://user:pass@www.domain.com/",
				"expected_SHORTEST":      "ftp://user:pass@www.domain.com/"
			},
			{
				"href":                   "sftp://user:pass@www.domain.com:22/;type=d",
				"expected_ABSOLUTE":      "sftp://user:pass@www.domain.com:22/;type=d",
				"expected_PATH_RELATIVE": "sftp://user:pass@www.domain.com:22/;type=d",
				"expected_ROOT_RELATIVE": "sftp://user:pass@www.domain.com:22/;type=d",
				"expected_SHORTEST":      "sftp://user:pass@www.domain.com:22/;type=d"
			},
			{
				"href":                   "ssh://user:pass@www.domain.com:22/",
				"expected_ABSOLUTE":      "ssh://user:pass@www.domain.com:22/",
				"expected_PATH_RELATIVE": "ssh://user:pass@www.domain.com:22/",
				"expected_ROOT_RELATIVE": "ssh://user:pass@www.domain.com:22/",
				"expected_SHORTEST":      "ssh://user:pass@www.domain.com:22/"
			}
		],
		"different hosts":
		[
			{
				"href":                   "http://www.other-domain.com:80/",
				"expected_ABSOLUTE":      "http://www.other-domain.com/",
				"expected_PATH_RELATIVE": "//www.other-domain.com/",
				"expected_ROOT_RELATIVE": "//www.other-domain.com/",
				"expected_SHORTEST":      "//www.other-domain.com/"
			},
			{
				"href":                   "http://255.255.255.255:80/",
				"expected_ABSOLUTE":      "http://255.255.255.255/",
				"expected_PATH_RELATIVE": "//255.255.255.255/",
				"expected_ROOT_RELATIVE": "//255.255.255.255/",
				"expected_SHORTEST":      "//255.255.255.255/"
			},
			{
				"href":                   "http://1337.net:80/",
				"expected_ABSOLUTE":      "http://1337.net/",
				"expected_PATH_RELATIVE": "//1337.net/",
				"expected_ROOT_RELATIVE": "//1337.net/",
				"expected_SHORTEST":      "//1337.net/"
			},
			{
				"href":                   "http://a.bc:80/",
				"expected_ABSOLUTE":      "http://a.bc/",
				"expected_PATH_RELATIVE": "//a.bc/",
				"expected_ROOT_RELATIVE": "//a.bc/",
				"expected_SHORTEST":      "//a.bc/"
			}
		],
		/*"unicode characters":
		[
			{
				"href":                   "http://مثال.إختبار/",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "http://例子.测试/",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			},
			{
				"href":                   "http://उदाहरण.परीक्षा/",
				"expected_ABSOLUTE":      "",
				"expected_PATH_RELATIVE": "",
				"expected_ROOT_RELATIVE": "",
				"expected_SHORTEST":      ""
			}
		],*/
		"weird":
		[
			{
				"href":                   "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
				"expected_ABSOLUTE":      "http://-.~_!$&'()*+,;=:@:80/::::::@example.com/",	// Shouldn't these be urlencoded ?
				"expected_PATH_RELATIVE": "//-.~_!$&'()*+,;=:@:80/::::::@example.com/",			// Shouldn't these be urlencoded ?
				"expected_ROOT_RELATIVE": "//-.~_!$&'()*+,;=:@:80/::::::@example.com/",			// Shouldn't these be urlencoded ?
				"expected_SHORTEST":      "//-.~_!$&'()*+,;=:@:80/::::::@example.com/"			// Shouldn't these be urlencoded ?
			}
		],
		"non-URLs":
		[
			{
				"href":                   "javascript:someFunction('/path');",
				"expected_ABSOLUTE":      "javascript:someFunction('/path');",
				"expected_PATH_RELATIVE": "javascript:someFunction('/path');",
				"expected_ROOT_RELATIVE": "javascript:someFunction('/path');",
				"expected_SHORTEST":      "javascript:someFunction('/path');"
			},
			{
				"href":                   "data:image/svg+xml;base64,mZiIvPjwvZz",
				"expected_ABSOLUTE":      "data:image/svg+xml;base64,mZiIvPjwvZz",
				"expected_PATH_RELATIVE": "data:image/svg+xml;base64,mZiIvPjwvZz",
				"expected_ROOT_RELATIVE": "data:image/svg+xml;base64,mZiIvPjwvZz",
				"expected_SHORTEST":      "data:image/svg+xml;base64,mZiIvPjwvZz"
			},
			{
				"href":                   "mailto:asdf@asdf.com",
				"expected_ABSOLUTE":      "mailto:asdf@asdf.com",
				"expected_PATH_RELATIVE": "mailto:asdf@asdf.com",
				"expected_ROOT_RELATIVE": "mailto:asdf@asdf.com",
				"expected_SHORTEST":      "mailto:asdf@asdf.com"
			}
		]
	}
}
