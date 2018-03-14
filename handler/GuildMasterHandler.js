// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : GuildMasterHandler.js
//  Creator     : zg 
//  Date        : 2015-6-29
//  Comment : 
// ***************************************************************

var Environment = require('../lib/Environment');
var Utility = require('../lib/Utility');

function GuildMasterHandler(app)
{
    this.app = app;
};


GuildMasterHandler.prototype.getGuildApplyList = function (res) 
{
	if(res.list[0] != undefined)
	{
		Environment[this.app.context].agreeJoin.param.isOk = true;
		Environment[this.app.context].agreeJoin.param.applyId = res.list[0].playerId;
    	this.app.logicClient.requestContext('agreeJoin', function(){});
	}
};


GuildMasterHandler.prototype.agreeJoin = function (res) 
{
    
};


GuildMasterHandler.prototype.applyJoin = function (res) 
{
    
};


module.exports = function(app)
{
    return new GuildMasterHandler(app);
};
