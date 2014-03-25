var absolutize   = require("./absolutize");
var constants    = require("../constants");
var findRelation = require("./findRelation");
var portUtils    = require("../util/port");
var relativize   = require("./relativize");



function relateUrl(siteUrlObj, urlObj, options)
{
	portUtils.findDefault(urlObj, options);
	
	urlObj.extra.relation = findRelation.upToPath(urlObj, siteUrlObj, options);
	
	if (urlObj.extra.relation)
	{
		absolutize(urlObj, siteUrlObj, options);
		
		// Port may have changed
		portUtils.findDefault(urlObj, options);
		
		urlObj.extra.relation = findRelation.pathOn(urlObj, siteUrlObj, options);
		
		relativize(urlObj, siteUrlObj, options);
	}
	
	return urlObj;
}



module.exports = relateUrl;
