// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : GuildGetGuildListApplyHandler.js
//  Creator     : zg 
//  Date        : 2015-6-29
//  Comment : 
// ***************************************************************

var Environment = require('../lib/Environment');
var Utility = require('../lib/Utility');

function GuildGetGuildListApplyHandler(app)
{
    this.app = app;
};


GuildGetGuildListApplyHandler.prototype.getGuildList = function (res) 
{
	
	if(res.list[0] != undefined)
	{
		Environment[this.app.context].applyJoin.param.gid = res.list[0].guildId;
    	this.app.logicClient.requestContext('applyJoin', function(){});
	}
};


GuildGetGuildListApplyHandler.prototype.applyJoin = function (res) 
{
    
};


module.exports = function(app)
{
    return new GuildGetGuildListApplyHandler(app);
};
