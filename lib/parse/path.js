function isDirectoryIndex(resource, options)
{
	var verdict = false;
	
	options.directoryIndexes.every( function(index)
	{
		if (index == resource)
		{
			verdict = true;
			return false;
		}
		
		return true;
	});
	
	return verdict;
}



function parsePath(urlObj, options)
{
	var path = urlObj.path.absolute.string;
	
	if (path)
	{
		var lastSlash = path.lastIndexOf("/");
		
		if (lastSlash > -1)
		{
			if (++lastSlash < path.length)
			{
				urlObj.resource = path.substr(lastSlash);
				
				urlObj.extra.resourceIsIndex = isDirectoryIndex(urlObj.resource, options);
				
				urlObj.path.absolute.string = path.substr(0, lastSlash);
			}
			
			urlObj.path.absolute.array = splitPath(urlObj.path.absolute.string);
		}
		else
		{
			// No slash means resource-only
			urlObj.resource = path;
			urlObj.path.absolute.string = null;
		}
	}
	// Else: no path means hash- or query-only
}



function splitPath(path)
{
	//if (path != "/")
	//{
		var cleaned = [];
		
		path.split("/").forEach( function(dir)
		{
			// Cleanup -- splitting "/dir/" becomes ["","dir",""]
			if (dir != "")
			{
				cleaned.push(dir);
			}
		});
		
		return cleaned;
	/*}
	else
	{
		// Faster to skip the above block and just create an array
		return [];
	}*/
}



module.exports = parsePath;
