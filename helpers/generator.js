"use strict";
const {writeFileSync} = require("fs");

const urls =
[
	// Parts removing from right to left
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1=",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../",
	"http://user:pass@www.domain.com:80/test//tes.ter/./",
	"http://user:pass@www.domain.com:80/test//tes.ter/",
	"http://user:pass@www.domain.com:80/test//",
	"http://user:pass@www.domain.com:80/test/",
	"http://user:pass@www.domain.com:80/",
	"http://user:pass@www.domain.com:80",
	"http://user:pass@www.domain.com/",
	"http://user:pass@www.domain.com",
	"http://user:pass@www.domain./",
	"http://user:pass@www.domain.",
	"http://user:pass@www.domain/",
	"http://user:pass@www.domain",
	"http://user:pass@www./",
	"http://user:pass@www.",
	"http://user:pass@www/",
	"http://user:pass@www",

	// Parts changing from left to right
	"https://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user2:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass2@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user2:pass2@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://:@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www2.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain2.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com2:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:81/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test2//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test/tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter2/./../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/../index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./index.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index2.html?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../?va r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va+r1= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r12= +dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1=++dir&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir2&var2=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var22=text&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text2&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var32#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3#anchor2",

	// Edge cases
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var3&=#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?va r1= +dir&var2=text&var2=text2&var3#anchor",
	"http://user:pass@www.domain.com:80/test//tes.ter/./../index.html?var2=text&va r1= +dir&var3&var2=text2#anchor",
	"http://user:pass@www.domain.com:80//",
	"http://user:pass@www.domain.com:80///test/",
	"other://domain/"
];



const generate = () => saveFile(`${__dirname}/tests.json`);



const generateData = () =>
{
	const output = [];

	for (let i=0; i<urls.length; i++)
	{
		for (let j=0; j<urls.length; j++)
		{
			output.push(
			{
				url:  urls[i],
				base: urls[j],
				related:
				{
					careful:
					{
						// Placeholder values for manual editing
						PROTOCOL_RELATIVE: null,
						ROOT_PATH_RELATIVE: null,
						PATH_RELATIVE: null,
						SHORTEST: null
					},
					common_deep:
					{
						// Placeholder values for manual editing
						PROTOCOL_RELATIVE: null,
						ROOT_PATH_RELATIVE: null,
						PATH_RELATIVE: null,
						SHORTEST: null
					},
					common_shallow:
					{
						// Placeholder values for manual editing
						PROTOCOL_RELATIVE: null,
						ROOT_PATH_RELATIVE: null,
						PATH_RELATIVE: null,
						SHORTEST: null
					}
				}
			});
		}
	}

	return output;
};



// Extra line break for unix/git
const generateString = () => JSON.stringify(generateData(), null, "\t") + "\n";



const saveFile = location =>
{
	writeFileSync(location, generateString());

	console.log(`Written to: ${location}`);
};



generate();
