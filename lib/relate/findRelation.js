function findRelation_upToPath(urlObj, siteUrlObj, options)
{
	// Path- or root-relative URL
	var pathOnly = urlObj.extra.hrefInfo.minimumPathOnly;
	
	// Matching scheme, scheme-relative or path-only
	var sameScheme = (urlObj.scheme==siteUrlObj.scheme || !urlObj.scheme);
	
	// Matching auth, ignoring auth or path-only
	var sameAuth = sameScheme && (urlObj.auth==siteUrlObj.auth || options.removeAuth || pathOnly);
	
	// Matching host or path-only
	var www = options.ignore_www ? "stripped" : "full";
	var sameHost = sameAuth && (urlObj.host[www]==siteUrlObj.host[www] || pathOnly);
	
	// Matching port or path-only
	var samePort = sameHost && (urlObj.port==siteUrlObj.port || pathOnly);
	
	//var atLeastRootRelative = samePort && !urlObj.extra.hrefInfo.minimumResourceOnly;
	
	urlObj.extra.relation.minimumScheme = sameScheme;
	urlObj.extra.relation.minimumAuth   = sameAuth;
	urlObj.extra.relation.minimumHost   = sameHost;
	urlObj.extra.relation.minimumPort   = samePort;
	//urlObj.extra.relation.minimumPath   = samePort && atLeastRootRelative;	// gets changed in _pathOn() ... TEMP, i hope
	
	urlObj.extra.relation.maximumScheme = !sameScheme || sameScheme && !sameAuth;
	urlObj.extra.relation.maximumAuth   = !sameScheme || sameScheme && !sameHost;
	urlObj.extra.relation.maximumHost   = !sameScheme || sameScheme && !samePort;
	//urlObj.extra.relation.maximumPort   = !sameScheme || sameScheme && !atLeastRootRelative;	// gets changed in _pathOn() ... TEMP, i hope
}



function findRelation_pathOn(urlObj, siteUrlObj, options)
{
	var queryOnly = urlObj.extra.hrefInfo.minimumQueryOnly;
	var hashOnly  = urlObj.extra.hrefInfo.minimumHashOnly;
	
	// From upToPath()
	var sameScheme = urlObj.extra.relation.minimumScheme;
	
	// Matching port and path
	var samePath = urlObj.extra.relation.minimumPort && urlObj.path.absolute.string==siteUrlObj.path.absolute.string;
	
	// Matching resource or removing default indexes or query/hash-only
	var sameResource = samePath && (urlObj.resource==siteUrlObj.resource || (options.removeDirectoryIndexes && urlObj.extra.resourceIsIndex) || queryOnly || hashOnly);
	
	// Matching query or hash-only
	var query = options.removeEmptyQueries ? "stripepd" : "full";
	var sameQuery = sameResource && urlObj.query.string[query] && urlObj.query.string[query]==siteUrlObj.query.string[query] || hashOnly;
	
	var sameHash = sameQuery && urlObj.hash==siteUrlObj.hash;
	
	urlObj.extra.relation.minimumPath     = samePath;
	urlObj.extra.relation.minimumResource = sameResource;
	urlObj.extra.relation.minimumQuery    = sameQuery;
	urlObj.extra.relation.minimumHash     = sameHash;
	
	urlObj.extra.relation.maximumPort     = !sameScheme || sameScheme && !samePath;
	urlObj.extra.relation.maximumPath     = !sameScheme || sameScheme && !sameResource;
	urlObj.extra.relation.maximumResource = !sameScheme || sameScheme && !sameQuery;
	urlObj.extra.relation.maximumQuery    = !sameScheme || sameScheme && !sameHash;
	urlObj.extra.relation.maximumHash     = !sameScheme || sameScheme &&  sameHash;
}



module.exports =
{
	pathOn:   findRelation_pathOn,
	upToPath: findRelation_upToPath
};
