function findDefaultPort(urlObj, options)
{
	//if (urlObj.port == null)
	//{
		var defaultPort = -1;
		
		for (var i in options.defaultPorts)
		{
			if (i == urlObj.scheme)
			{
				defaultPort = options.defaultPorts[i];
				break;
			}
		}
		
		if (defaultPort > -1)
		{
			if (urlObj.port == null)
			{
				urlObj.port = defaultPort;
			}
			
			urlObj.extra.portIsDefault = (urlObj.port == defaultPort);
		}
	//}
	
	return urlObj;
}



module.exports =
{
	findDefault: findDefaultPort
};
