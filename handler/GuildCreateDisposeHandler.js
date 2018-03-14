// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : GuildCreateDisposeHandler.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************

var Environment = require('../lib/Environment');
var Utility = require('../lib/Utility');

function GuildCreateDisposeHandler(app)
{
	this.name = 'GuildCreateDisposeHandler'
    this.app = app;
};


GuildCreateDisposeHandler.prototype.createGuildInfo = function (res) 
{
   // this.app.logicClient.requestContext('dissolutionGuildInfo', function(){});
};


GuildCreateDisposeHandler.prototype.dissolutionGuildInfo = function (res) 
{
    
};


module.exports = function(app)
{
    return new GuildCreateDisposeHandler(app);
};
