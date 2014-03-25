var objUtils  = require("../util/object");
var pathUtils = require("../util/path");
//var relationUtils = require("../util/relation");



function absolutize(urlObj, siteUrlObj, options)
{
	copyPath(urlObj, siteUrlObj);
	
	// Fill in relative URLs
	switch (urlObj.extra.relation)
	{
		case "path":
		case "port":   urlObj.port   = siteUrlObj.port;
		case "host":   urlObj.host   = objUtils.clone(siteUrlObj.host);
		case "auth":   urlObj.auth   = siteUrlObj.auth;
		case "scheme": urlObj.scheme = siteUrlObj.scheme; break;
	}
}



/*
	Get an absolute path relative to site url.
*/
function copyPath(urlObj, siteUrlObj)
{
	if (urlObj.extra.relation && urlObj.extra.relation!="port" /*&& relationUtils.max(urlObj.extra.relation, "path")*/ )
	{
		var pathArray = urlObj.path.absolute.array;
		var pathString = "/";
		
		// If not erroneous URL
		if (pathArray)
		{
			// If is relative path
			if (urlObj.extra.hrefInfo.minimumPathOnly && urlObj.path.absolute.string.indexOf("/")!=0)
			{
				// Append path to site path
				pathArray = siteUrlObj.path.absolute.array.concat(pathArray);
			}
			
			pathArray   = pathUtils.resolveDotSegments(pathArray);
			pathString += pathUtils.join(pathArray);
		}
		else
		{
			pathArray = [];
		}
		
		urlObj.path.absolute.array  = pathArray;
		urlObj.path.absolute.string = pathString;
	}
	else
	{
		// Resource-, query- or hash-only
		urlObj.path = objUtils.clone(siteUrlObj.path);
	}
}



module.exports = absolutize;
