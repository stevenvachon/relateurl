module.exports =
{
	devlog: function devlog(data)
	{
		//console.log( require("util").inspect(data, {depth:null, showHidden:true, colors:true}) );
		console.log( require("util").inspect(data, {depth:null, colors:true}) );
	},
	
	object: require("./object"),
	path: require("./path"),
	port: require("./port"),
	relation: require("./relation"),
	resource: require("./resource")
};
