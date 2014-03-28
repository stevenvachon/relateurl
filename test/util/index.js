function each(obj, callback)
{
	var cancel = false;
	
	if (obj instanceof Array)
	{
		obj.every( function(nestedObj)
		{
			cancel = each(nestedObj, callback) === false;
			
			return !cancel;
		});
	}
	else if (obj instanceof Object)
	{
		if (obj.hasOwnProperty("href"))
		{
			cancel = callback(obj) === false;
		}
		else
		{
			for (var i in obj)
			{
				if ( obj.hasOwnProperty(i) )
				{
					cancel = each(obj[i], callback) === false;
					
					if (cancel) break;
				}
			}
		}
	}
	
	return !cancel;
}



/*function eachSite(callback)
{
	json.sites.every( function(site)
	{
		return callback(site) !== false;
	});
}



function firstTest(callback)
{
	eachSite( function(site)
	{
		eachData( function(test)
		{
			callback(test, site);
			
			return false;
		});
		
		return false;
	});
}*/



function traverse(data, callback)
{
	each(data, callback);
}



module.exports =
{
	traverse: traverse
};
