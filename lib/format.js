var constants = require("./constants");
var relationUtils = require("./util/relation");
var resourceUtils = require("./util/resource");



function formatAuth(urlObj, options)
{
	if (urlObj.auth && !options.removeAuth && (relationUtils.max(urlObj.extra.relation,"host") || options.output==constants.ABSOLUTE))
	{
		return urlObj.auth + "@";
	}
	
	return "";
}



function formatHash(urlObj, options)
{
	if (urlObj.hash)
	{
		return urlObj.hash;
	}
	
	return "";
}



function formatHost(urlObj, options)
{
	// TODO :: do we need to check if host.full exists?
	if (urlObj.host.full && (relationUtils.max(urlObj.extra.relation,"auth") || options.output==constants.ABSOLUTE))
	{
		return urlObj.host.full;
	}
	
	return "";
}



function formatPath(urlObj, options)
{
	var str = "";
	
	//if (!urlObj.extra.hrefInfo.minimumResourceOnly && !urlObj.extra.hrefInfo.minimumQueryOnly && !urlObj.extra.hrefInfo.minimumHashOnly)
	//{
		var absolutePath = urlObj.path.absolute.string;
		var relativePath = urlObj.path.relative.string;
		
		if (relationUtils.max(urlObj.extra.relation,"port") || options.output==constants.ABSOLUTE || options.output==constants.ROOT_RELATIVE)
		{
			str += absolutePath;
		}
		else if (relativePath.length<=absolutePath.length && options.output==constants.SHORTEST || options.output==constants.PATH_RELATIVE)
		{
			str = relativePath;
		}
		else
		{
			str = absolutePath;
		}
	//}
	
	return str;
}



function formatPort(urlObj, options)
{
	if (urlObj.port && !urlObj.extra.portIsDefault && relationUtils.max(urlObj.extra.relation,"host"))
	{
		return ":" + urlObj.port;
	}
	
	return "";
}



function formatQuery(urlObj, options)
{
	return urlObj.query.string[ options.removeEmptyQueries ? "stripped" : "full" ];
}



function formatResource(urlObj, options)
{
	var resource = urlObj.resource;
	
	if (resource)
	{
		if ( options.removeDirectoryIndexes && resourceUtils.isDefaultIndex(resource,options) )
		{
			resource = "";
		}
		
		return resource;
	}
	
	return "";
}



function formatScheme(urlObj, options)
{
	var str = "";
	
	if (relationUtils.max(urlObj.extra.relation,"host") || options.output==constants.ABSOLUTE)
	{
		if (!urlObj.extra.relation || !options.schemeRelative || options.output==constants.ABSOLUTE)
		{
			str += urlObj.scheme + "://";
		}
		else
		{
			str += "//";
		}
	}
	
	return str;
}



function formatUrl(urlObj, options)
{
	var url = "";
	
	url += formatScheme(urlObj, options);
	url += formatAuth(urlObj, options);
	url += formatHost(urlObj, options);
	url += formatPort(urlObj, options);
	url += formatPath(urlObj, options);
	url += formatResource(urlObj, options);
	url += formatQuery(urlObj, options);
	url += formatHash(urlObj, options);
	
	if (url == "")
	{
		// TEMP -- might need to add resource and/or query because "./" seems to denote only the current DIR
		url = "./";
	}
	
	return url;
}



module.exports = formatUrl;
