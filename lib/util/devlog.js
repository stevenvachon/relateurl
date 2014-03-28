function log(data)
{
	console.log( require("util").inspect(data, {depth:null, colors:true}) );
}



function logAll(data)
{
	console.log( require("util").inspect(data, {depth:null, showHidden:true, colors:true}) );
}



module.exports =
{
	log:    log,
	logAll: logAll
};
