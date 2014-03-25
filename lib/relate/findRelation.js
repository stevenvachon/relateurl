var resourceUtils = require("../util/resource");



function findRelation_upToPath(urlObj, siteUrlObj, options)
{
	var verdict = false;
	
	// Path- or root-relative URL
	var pathOnly = urlObj.extra.hrefInfo.minimumPathOnly;
	
	// Matching scheme, scheme-relative or path-only
	if (urlObj.scheme && urlObj.scheme==siteUrlObj.scheme || !urlObj.scheme)
	{
		verdict = "scheme";
		
		// Matching auth, ignoring auth or path-only
		if (urlObj.auth==siteUrlObj.auth || options.removeAuth || pathOnly)
		{
			verdict = "auth";
			
			var www = options.ignore_www ? "stripped" : "full";
			
			// Matching host or path-only
			if (urlObj.host[www]==siteUrlObj.host[www] || pathOnly)
			{
				verdict = "host";
				
				// Matching port or path-only
				if (urlObj.port==siteUrlObj.port || pathOnly)
				{
					verdict = "port";
					
					if (!urlObj.extra.hrefInfo.minimumResourceOnly)
					{
						verdict = "path";	// is at least root-relative
					}
				}
			}
		}
	}
	
	return verdict;
}



function findRelation_pathOn(urlObj, siteUrlObj, options)
{
	var verdict = urlObj.extra.relation;
	
	if (verdict=="port" || verdict=="path")
	{
		if (urlObj.path.absolute.string == siteUrlObj.path.absolute.string)
		{
			verdict = "path";
			
			if ( urlObj.resource==siteUrlObj.resource || (options.removeDirectoryIndexes && resourceUtils.isDefaultIndex(urlObj.resource,options)) )
			{
				verdict = "resource";
				
				var query = options.removeEmptyQueries ? "stripepd" : "full";
				
				if ( urlObj.query.string[query] && urlObj.query.string[query]==siteUrlObj.query.string[query] )
				{
					verdict = "query";
				}
			}
		}
	}
	
	return verdict;
}



module.exports =
{
	pathOn:   findRelation_pathOn,
	upToPath: findRelation_upToPath
};
