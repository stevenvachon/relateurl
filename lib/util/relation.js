function equalRelation(relation, target)
{
	return relation == target;
}



function findRelationIndexes(relation, target)
{
	var parts = [false,"scheme","auth","host","port","path","resource","query"];
	
	var relationIndex = -1;
	var targetIndex = -1;
	
	parts.forEach( function(part, i)
	{
		if (part == target)
		{
			targetIndex = i;
		}
		
		if (part == relation)
		{
			relationIndex = i;
		}
	});
	
	var returnValue =
	{
		relation: relationIndex,
		target:   targetIndex,
		
		empty:    relationIndex==-1 && targetIndex==-1
	};
	
	return returnValue;
}



function maximumRelation(relation, max)
{
	var indexes = findRelationIndexes(relation, max);
	
	return (indexes.target >= indexes.relation && !indexes.empty);
}



function minimumRelation(relation, min)
{
	var indexes = findRelationIndexes(relation, min);
	
	return (indexes.relation >= indexes.target && !indexes.empty);
}



module.exports =
{
	equal: equalRelation,
	max: maximumRelation,
	min: minimumRelation
};
