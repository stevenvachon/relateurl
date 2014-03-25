var util = require("./util/object");



function getOptions(options, defaults)
{
	if ( util.isObject(options) )
	{
		var newOptions = {};
		
		for (var i in defaults)
		{
			if (options[i] != undefined)
			{
				newOptions[i] = mergeOption(defaults[i], options[i]);
			}
			else
			{
				newOptions[i] = defaults[i];
			}
		}
		
		return newOptions;
	}
	else
	{
		return defaults;
	}
}



function mergeOption(defaultValues, newValues)
{
	if (defaultValues instanceof Object && newValues instanceof Object)
	{
		if (defaultValues instanceof Array && newValues instanceof Array)
		{
			return defaultValues.concat(newValues);
		}
		else
		{
			defaultValues = util.clone(defaultValues);
			
			return util.shallowMerge(defaultValues, newValues);
		}
	}
	
	return newValues;
}



module.exports = getOptions;
