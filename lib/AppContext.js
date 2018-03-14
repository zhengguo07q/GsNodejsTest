// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : AppContext.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************


var Client = require('./Client');
var Environment = require('./Environment');
var Utility = require('./Utility');
var HandlerService = require('./HandlerService')

var AppContext = function(key)
{
	this.context = 'context_' + key;;

	this.platformClient = new Client(this);
	this.logicClient = new Client(this);
	this.handlerService = new HandlerService(this);
	this.startCallback = null;
	this.continueCallback = null;
};


AppContext.prototype.start = function(callback)
{
	this.handlerService.loadHandlerFile();
	var self = this;
	this.startCallback = callback;
    this.platformClient.connect(Environment.servers.platform, function (data) 
    {
    	self.platformClient.module = 'LoginHandler';
	    self.platformClient.requestContext('checkLogin', function(){});
	});
};


AppContext.prototype.startEnd = function()
{
	this.startCallback && this.startCallback();
};


AppContext.prototype.continue = function(module, startProtocal, callback)
{
	this.logicClient.module = module;
	this.continueCallback = callback;
	this.logicClient.requestContext(startProtocal, function(){});
};


AppContext.prototype.continueEnd = function()
{
	this.continueCallback && this.continueCallback();
};


var contextDict = {};
module.exports = function(contextKey)
{
	var context = null;
	if(contextDict[contextKey] == undefined)
	{
		context = new AppContext(contextKey);
		contextDict[contextKey] = context;
	}
	return contextDict[contextKey];
};
