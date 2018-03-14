// ***************************************************************
//  Copyright(c) Cmge
//  FileName	: TestTimer.js
//  Creator 	: zg 
//  Date		: 2015-6-23
//  Comment	: 
// ***************************************************************

var Timer = require('app/core/Timer');

var GuildMgr = function()
{

};


GuildMgr.prototype.saveToDb = function()
{
//	console.log('timer save to db');
};


GuildMgr.prototype.start = function()
{
	Timer.add(this.saveToDb, 1 * Timer.millisecond);
};


var guildMgr = new GuildMgr();
guildMgr.start();






