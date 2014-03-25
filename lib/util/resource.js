function isDefaultIndex(resource, options)
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



module.exports =
{
	isDefaultIndex: isDefaultIndex
};
