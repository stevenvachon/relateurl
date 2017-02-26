"use strict";
const deepFreeze = require("deep-freeze-node");
const evaluateValue = require("evaluate-value");
const isURL = require("isurl");
const minURL = require("minurl");
const URLRelation = require("url-relation");



const PROTOCOL_RELATIVE  = Symbol("protocol_relative");
const ROOT_PATH_RELATIVE = Symbol("root_path_relative");
const PATH_RELATIVE      = Symbol("path_relative");
const SHORTEST           = Symbol("shortest");

const CAREFUL_PROFILE = { ...minURL.CAREFUL_PROFILE, output:SHORTEST };
const COMMON_PROFILE  = { ...minURL.COMMON_PROFILE,  output:SHORTEST };

const SEGMENT_PATTERN = /\/|[^\/]+/g;



const relateSegments = (baseSegments, urlSegments) =>
{
	let parentIndex = -1;
	let related = true;
	let slashes = 0;

	// Find parents
	const relatedSegments = baseSegments.reduce((result, baseSegment, i) =>
	{
		// Record groups of repeating slashes
		if (baseSegment === "/")
		{
			slashes++;
		}
		else
		{
			slashes = 0;
		}

		if (related)
		{
			if (urlSegments[i] !== baseSegment)
			{
				related = false;
			}
			else
			{
				// The last related segment
				parentIndex = i;
			}
		}

		if (!related)
		{
			// If a segment, infixed repeating slashes, or a prefixed/leading repeating slash
			if (slashes===0 || slashes>1 || i===0)
			{
				// Up one level
				result.push("..", "/");
			}
		}

		return result;
	}, []);

	// If relation starts at a path beginning with "//"
	if (relatedSegments.length===0 && urlSegments[parentIndex+1]==="/")
	{
		relatedSegments.push(".", "/");
	}

	// Add children -- starting after last related segment
	relatedSegments.push( ...urlSegments.slice(parentIndex+1) );

	return relatedSegments;
};



const relateToProtocol = (url, options) => minURL(url, options).slice(url.protocol.length);



const relateToRootPath = (url, options) =>
{
	// @todo does this support mailto? unlikely scenario, but complete
	const pattern = new RegExp(`^${url.protocol}\/?\/?${url.username}:?${url.password}@?${url.hostname}:?${url.port}`);

	const stringifiedURL = minURL(url,
	{
		clone: false,
		plusQueries: false,
		removeAuth: false,
		removeDefaultPort: false,
		removeEmptyHash: false,
		removeEmptyQueries: false,
		removeEmptyQueryNames: false,
		removeEmptyQueryValues: false,
		removeEmptySegmentNames: false,
		removeHash: false,
		removeIndexFilename: false,
		removeQueryNames: false,
		removeQueryOddities: false,
		removeRootTrailingSlash: options.removeRootTrailingSlash,
		removeTrailingSlash: options.removeTrailingSlash,
		removeWWW: false,
		sortQueries: false,
		stringify: true
	});

	// Remove everything before the path
	const truncated = stringifiedURL.replace(pattern, "");

	if (truncated === "")
	{
		return "/";
	}
	else if (truncated.startsWith("//"))
	{
		// Avoid complication with protocol-relative URLs
		return relateToProtocol(url, options);
	}
	else
	{
		return truncated;
	}
};



const relateURL = (url, base, options) =>
{
	if (!isURL.lenient(url) || !isURL.lenient(base))
	{
		throw new TypeError("Invalid URL");
	}

	options = { ...COMMON_PROFILE, ...options };

	const ignoreAuth = evaluateValue(options.removeAuth, url);

	const relation = new URLRelation(url, base,
	{
		components:              ignoreAuth ? [URLRelation.AUTH] : undefined,
		defaultPorts:            options.defaultPorts,
		ignoreDefaultPort:       relationOption(options.removeDefaultPort),
		ignoreEmptyQueries:      relationOption(options.removeEmptyQueries),
		ignoreEmptySegmentNames: relationOption(options.removeEmptySegmentNames),
		ignoreIndexFilename:     relationOption(options.removeIndexFilename),
		ignoreQueryNames:        relationOption(options.removeQueryNames),
		ignoreQueryOrder:        relationOption(options.sortQueries),
		ignoreWWW:               relationOption(options.removeWWW),
		indexFilenames:          options.indexFilenames,
		queryNames:              options.queryNames
	});

	if (relation.upTo(URLRelation.PATH))
	{
		// Avoid turning a hash-relative URL into ""
		options.removeEmptyHash = false;
	}

	if (!relation.upTo(URLRelation.PROTOCOL))
	{
		return minURL(url, options);
	}
	else if (!relation.upTo(URLRelation.HOST) || options.output===PROTOCOL_RELATIVE)
	{
		return relateToProtocol(url, options);
	}

	if (options.clone)
	{
		base = new URL(base);
		url = new URL(url);

		// Don't let `minURL` clone anything, since it's called multiple times
		options.clone = false;
	}

	// Stringify'ing would require a reparse
	const noStringify = { ...options, stringify:false };

	url = minURL(url, noStringify);

	if (!options.stringify)
	{
		// This isn't recommended, but still possible
		return url;
	}
	else if (options.output === ROOT_PATH_RELATIVE)
	{
		return relateToRootPath(url, options);
	}

	// NOTE :: https://github.com/whatwg/url/issues/221
	const urlHash = url.href.endsWith("#") ? "#" : url.hash;

	if (relation.upTo(URLRelation.SEARCH))
	{
		return urlHash;
	}
	else if (relation.upTo(URLRelation.FILENAME))
	{
		// @todo this is the second time this will be ran -- first time within `minURL()`
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

	const baseSegments = splitPathname(base.pathname);
	const urlSegments = splitPathname(url.pathname);
	let baseFilename = baseSegments[baseSegments.length - 1];
	let urlFilename = urlSegments[urlSegments.length - 1];

	if (urlFilename===undefined || urlFilename==="/")
	{
		urlFilename = "";
	}
	else
	{
		// Remove filename
		urlSegments.pop();
	}

	if (baseFilename===undefined || baseFilename==="/")
	{
		baseFilename = "";
	}
	else
	{
		// Remove filename
		baseSegments.pop();
	}

	if (relation.upTo(URLRelation.SEGMENTS))
	{
		if (urlFilename==="" && baseFilename!=="")
		{
			urlFilename = ".";
		}

		return urlFilename + url.search + urlHash;
	}

	const relatedSegments = relateSegments(baseSegments, urlSegments);

	if (urlFilename==="" && relatedSegments[relatedSegments.length-2]==="..")
	{
		relatedSegments.pop();
	}

	const pathRelative = relatedSegments.join("") + urlFilename + url.search + urlHash;

	if (options.output === PATH_RELATIVE)
	{
		return pathRelative;
	}

	const rootPathRelative = relateToRootPath(url, options);

	// Return shortest -- if same, root-path/protocol-relative takes priority as it's more direct
	return rootPathRelative.length <= pathRelative.length ? rootPathRelative : pathRelative;
};



const relationOption = option =>
{
	return (url1, url2) => evaluateValue(option,url1) && evaluateValue(option,url2);
};



const splitPathname = pathname =>
{
	// Remove leading slash, which will always exist
	pathname = pathname.substr(1);

	// Split by and include slashes
	// Simply splitting produced issues with trailing "//" and joining
	let output = pathname.match(SEGMENT_PATTERN);

	if (output === null)
	{
		output = [];
	}

	return output;
};



Object.assign
(
	relateURL,
	{
		CAREFUL_PROFILE,
		COMMON_PROFILE,

		PROTOCOL_RELATIVE,
		ROOT_PATH_RELATIVE,
		PATH_RELATIVE,
		SHORTEST
	}
);



module.exports = deepFreeze(relateURL);
