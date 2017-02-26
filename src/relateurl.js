"use strict";
const cloneURL = require("cloneurl");
const deepFreeze = require("deep-freeze-node");
const evaluateValue = require("evaluate-value");
const isURL = require("isurl");
const minURL = require("minurl");
const urlRelation = require("url-relation");



const dirPattern = /\/|[^\/]+/g;

const output = 
{
	PROTOCOL_RELATIVE:  0,
	ROOT_PATH_RELATIVE: 1,
	PATH_RELATIVE:      2,
	SHORTEST:           3
};

const carefulProfile = Object.assign({ output:output.SHORTEST }, minURL.CAREFUL_PROFILE);
const commonProfile  = Object.assign({ output:output.SHORTEST }, minURL.COMMON_PROFILE);



function relateDirs(baseDirs, urlDirs)
{
	const relatedDirs = [];
	let parentIndex = -1;
	let related = true;
	let slashes = 0;

	// Find parents
	for (let i=0; i<baseDirs.length; i++)
	{
		// Keep track of groups of repeating slashes
		if (baseDirs[i] === "/")
		{
			slashes++;
		}
		else
		{
			slashes = 0;
		}

		if (related)
		{
			if (urlDirs[i] !== baseDirs[i])
			{
				related = false;
			}
			else
			{
				// The last related index
				parentIndex = i;
			}
		}

		if (!related)
		{
			// If a dir, infixed repeating slashes, or a prefixed/leading repeating slash
			if (slashes===0 || slashes>1 || i===0)
			{
				// Up one level
				relatedDirs.push("..", "/");
			}
		}
	}

	// If relation starts at a path beginning with "//"
	if (relatedDirs.length===0 && urlDirs[parentIndex+1]==="/")
	{
		relatedDirs.push(".", "/");
	}

	// Add children -- starting after last related dir
	for (let i=parentIndex+1; i<urlDirs.length; i++)
	{
		relatedDirs.push( urlDirs[i] );
	}

	return relatedDirs;
}



function relateToProtocol(url, options)
{
	// Remove protocol
	return minURL(url, options).slice(url.protocol.length);
}



function relateToRootPath(url, options)
{
	// TODO :: does this support mailto? unlikely scenario, but complete
	const pattern = new RegExp(`^${url.protocol}\/?\/?${url.username}:?${url.password}@?${url.hostname}:?${url.port}`);

	const stringifiedURL = minURL(url, 
	{
		clone: false,
		plusQueries: false,
		removeDefaultPort: false,
		removeDirectoryIndex: false,
		removeEmptyDirectoryNames: false,
		removeEmptyHash: false,
		removeEmptyQueries: false,
		removeEmptyQueryNames: false,
		removeEmptyQueryValues: false,
		removeHash: false,
		removeQueryNames: false,
		removeQueryOddities: false,
		removeRootTrailingSlash: options.removeRootTrailingSlash,
		removeTrailingSlash: options.removeTrailingSlash,
		removeWWW: false,
		sortQueries: false,
		stringify: true
	});

	// Remove everything before the path
	let output = stringifiedURL.replace(pattern, "");

	if (output === "")
	{
		output = "/";
	}
	else if (output.startsWith("//"))
	{
		// Avoid complication with protocol-relative URLs
		output = relateToProtocol(url, options);
	}

	return output;
}



function relateURL(url, base, options)
{
	if (!isURL.lenient(url) || !isURL.lenient(base))
	{
		throw new TypeError("Invalid URL");
	}

	// TODO :: this can slow things down when running multiple times
	options = Object.assign({}, commonProfile, options);

	const relation = urlRelation(url, base,
	{
		defaultPorts:              options.defaultPorts,
		directoryIndexes:          options.directoryIndexes,
		ignoreDefaultPort:         relationOption(options.removeDefaultPort),
		ignoreDirectoryIndex:      relationOption(options.removeDirectoryIndex),
		ignoreEmptyDirectoryNames: relationOption(options.removeEmptyDirectoryNames),
		ignoreEmptyQueries:        relationOption(options.removeEmptyQueries),
		ignoreQueryNames:          relationOption(options.removeQueryNames),
		ignoreQueryOrder:          relationOption(options.sortQueries),
		ignoreWWW:                 relationOption(options.removeWWW),
		queryNames:                options.queryNames
	});

	if (relation >= urlRelation.PATH)
	{
		// Avoid turning a "#" relative URL into ""
		options.removeEmptyHash = false;
	}

	if (relation === urlRelation.NONE)
	{
		return minURL(url, options);
	}
	else if (relation<urlRelation.AUTH || options.output===output.PROTOCOL_RELATIVE)
	{
		return relateToProtocol(url, options);
	}

	if (options.clone)
	{
		base = cloneURL(base);
		url = cloneURL(url);

		// Don't let `minURL` clone anything, since it's called multiple times
		options.clone = false;
	}

	// Stringify'ing would require a reparse
	const noStringify = Object.assign({}, options, { stringify:false });

	url = minURL(url, noStringify);

	if (!options.stringify)
	{
		// This isn't recommended, but still possible
		return url;
	}
	else if (options.output === output.ROOT_PATH_RELATIVE)
	{
		return relateToRootPath(url, options);
	}

	// NOTE :: https://github.com/whatwg/url/issues/221
	const urlHash = url.href.endsWith("#") ? "#" : url.hash;
	
	if (relation >= urlRelation.SEARCH)
	{
		return urlHash;
	}
	else if (relation >= urlRelation.FILENAME)
	{
		// TODO :: this is the second time this will be ran -- first time within `minURL()`
		if (!evaluateValue(options.sortQueries, url))
		{
			base = minURL(base, noStringify);

			// Avoid similar queries minifying to the same, but not truncating because 
			// they were seen as unrelated due to a shallow scan
			if (url.search === base.search)
			{
				return urlHash;
			}
		}

		if (url.search === "")
		{
			return "." + urlHash;
		}

		return url.search + urlHash;
	}
	
	const baseDirs = splitPathname(base.pathname);
	const urlDirs = splitPathname(url.pathname);
	let baseFilename = baseDirs[baseDirs.length - 1];
	let urlFilename = urlDirs[urlDirs.length - 1];

	if (urlFilename===undefined || urlFilename==="/")
	{
		urlFilename = "";
	}
	else
	{
		// Remove filename
		urlDirs.pop();
	}

	if (baseFilename===undefined || baseFilename==="/")
	{
		baseFilename = "";
	}
	else
	{
		// Remove filename
		baseDirs.pop();
	}
	
	if (relation >= urlRelation.DIRECTORY)
	{
		if (urlFilename==="" && baseFilename!=="")
		{
			urlFilename = ".";
		}

		return urlFilename + url.search + urlHash;
	}
	
	const relatedDirs = relateDirs(baseDirs, urlDirs);

	if (urlFilename==="" && relatedDirs[relatedDirs.length-2]==="..")
	{
		relatedDirs.pop();
	}

	const pathRelative = relatedDirs.join("") + urlFilename + url.search + urlHash;

	if (options.output === output.PATH_RELATIVE)
	{
		return pathRelative;
	}

	const rootPathRelative = relateToRootPath(url, options);

	// Return shortest -- if same, root-path/protocol-relative takes priority as it's more direct
	return rootPathRelative.length <= pathRelative.length ? rootPathRelative : pathRelative;
}



function relationOption(option)
{
	return function(url1, url2)
	{
		return evaluateValue(option,url1) && evaluateValue(option,url2);
	};
}



function splitPathname(pathname)
{
	// Remove leading slash, which will always exist
	pathname = pathname.substr(1);

	// Split by and include slashes
	// Simply splitting produced issues with trailing "//" and joining
	let output = pathname.match(dirPattern);

	if (output === null)
	{
		output = [];
	}

	return output;
}



relateURL.CAREFUL_PROFILE = carefulProfile;
relateURL.COMMON_PROFILE = commonProfile;

Object.assign(relateURL, output);



module.exports = deepFreeze(relateURL);
