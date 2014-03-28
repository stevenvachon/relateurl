function parseHost(urlObj, options)
{
	//if (options.ignore_www)
	//{
		var host = urlObj.host.full;
		
		if (host)
		{
			var stripped = host;
			
			if (host.indexOf("www.") == 0)
			{
				stripped = host.substr(4);
			}
			
			urlObj.host.stripped = stripped;
		}
	//}
}



module.exports = parseHost;
