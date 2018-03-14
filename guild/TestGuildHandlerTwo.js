// ***************************************************************
//  Copyright(c) Cmge
//  FileName	: TestGuildHandlerTwo.js
//  Creator 	: zg 
//  Date		: 2015-6-29
//  Comment	: 
// ***************************************************************

var singleMongoClient = require('app/dao/core/singleMongoClient');
var server_config = require('app/core/serverConfig')();
var GuildMgr = require('app/modules/guild/GuildMgr');
var assert = require('assert');
var util = require('util');
var AppContext = require('./lib/AppContext');


describe('game login', function()
{
	before(function(done)
	{
		AppContext('two').start(function()
		{
			done();
		});
  	});
   

	describe('guild test', function()
	{
		it('get guild list and apply', function(done)
		{
			AppContext('two').continue('GuildGetGuildListApplyHandler', 'getGuildList', function()
			{
				console.log('______________');
				done();
			});
		});
	});
	
});