// ***************************************************************
//  Copyright(c) Cmge
//  FileName	: TestGuild.js
//  Creator 	: zg 
//  Date		: 2015-6-19
//  Comment	: 
// ***************************************************************

var singleMongoClient = require('app/dao/core/singleMongoClient');
var server_config = require('app/core/serverConfig')();
var GuildMgr = require('app/modules/guild/GuildMgr');
var assert = require('assert');
var util = require('util');


describe('GuildMgr', function()
{
	before(function(done)
	{
        singleMongoClient(server_config.mongodb_server, function (db) 
        {
        	GuildMgr.initByGlobal(function()
        	{
        		done();
        	});
        	
        });
  	});

	describe('createGuild', function(done)
	{
		it.skip('create new guild to server ', function(done)
		{
			GuildMgr.createGuild('niubu bangpai', 12121, 'nihao', function()
			{
				var guild =  GuildMgr.searchGuildByNameOrId('niubu bangpai');
				console.log( 'test create guild...' + util.inspect(guild));
				GuildMgr.saveGuildToDb(12121, guild.guildData,  function()
				{
					console.log('test save guild');
					done();
				});
			});
		});
	});

	describe('loadGuildListFromDb', function(done)
	{
		it.skip('load all guild data from mongodb ', function(done)
		{
			GuildMgr.loadGuildListFromDb(function()
			{
				done();
			});
		});
	});

});