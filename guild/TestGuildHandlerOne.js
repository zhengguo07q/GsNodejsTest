// ***************************************************************
//  Copyright(c) Cmge
//  FileName	: TestGuildHandler.js
//  Creator 	: zg 
//  Date		: 2015-6-25
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
		AppContext('one').start(function()
		{
			done();
		});
  	});
   

	describe('guild test', function()
	{
		it('create guild ', function(done)
		{
			AppContext('one').continue('GuildCreateDisposeHandler', 'createGuildInfo', function()
			{
				done();
			});
		});
	});	


	describe('guild test', function()
	{
		it.only('create guild ', function(done)
		{
			AppContext('one').continue('GuildMasterHandler', 'getGuildApplyList', function()
			{
				done();
			});
		});
	});	
	
});