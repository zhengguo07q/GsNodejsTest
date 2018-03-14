// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : Environment.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************


var Environment = function()
{
    this.servers = 
    {
        platform : {host : '127.0.0.1', port : 7935, log: true},
        gameConnector : {}
    };

    this.context_one = 
    {
        checkLogin              : {api : "platform.platformHandler.checkLogin", param: {"version":153100,"v":0,"token":"token_test","customparams":"test_code","uid":"47102","platform":"47102","channeluid":"normal","username":"test2","channelCode":"channelCode_test"}},
        selectServer            : {api : "platform.platformHandler.selectServer", param: {"server":"1","v":0,"ip":"127.0.0.1"}},
        checkSession            : {api : "logic.sessionHandler.checkSession", param: {"tag":1,"v":0}},
        loadPlayer              : {api : "logic.userHandler.loadPlayer", param: {"v":0}},


        createGuildInfo         : {api : "logic.GuildHandler.createGuildInfo", param: {"v":0, "guildName" : "超级帮派"}},
        dissolutionGuildInfo    : {api : "logic.GuildHandler.dissolutionGuildInfo", param: {"v":0}},

        getGuildList            : {api : "logic.GuildHandler.getGuildList", param : {"v":0, page : 1}},

        applyJoin               : {api : "logic.GuildHandler.applyJoin", param: {"v":0}},
        getGuildApplyList       : {api : "logic.GuildHandler.getGuildApplyList", param: {"v":0}},       
        agreeJoin               : {api : "logic.GuildHandler.agreeJoin", param: {"v":0, isOk: true, applyId: ''}},

        getGuildMessageList     : {api : "logic.GuildHandler.getGuildMessageList", param: {"v":0}},   

        kickMember              : {api : "logic.GuildHandler.kickMember", param: {"v":0, playerId: ''}}, 
    };

    this.context_two = 
    {
        checkLogin              : {api : "platform.platformHandler.checkLogin", param: {"version":152000,"v":0,"token":"token_test","customparams":"test_code","uid":"4999","platform":"4999","channeluid":"normal","username":"test4999","channelCode":"channelCode_test"}},
        selectServer            : {api : "platform.platformHandler.selectServer", param: {"server":"1","v":0,"ip":"127.0.0.1"}},
        checkSession            : {api : "logic.sessionHandler.checkSession", param: {"tag":1,"v":0}},
        loadPlayer              : {api : "logic.userHandler.loadPlayer", param: {"v":0}},


        createGuildInfo         : {api : "logic.GuildHandler.createGuildInfo", param: {"v":0, "guildName" : "超级帮派"}},
        dissolutionGuildInfo    : {api : "logic.GuildHandler.dissolutionGuildInfo", param: {"v":0}},

        getGuildList            : {api : "logic.GuildHandler.getGuildList", param : {"v":0, page : 1}},
        applyJoin               : {api : "logic.GuildHandler.applyJoin", param: {"v":0}},       
    };

    this.sys =  
    {
        requestBytes: 0,
        requestCount: 0,
        responseBytes: 0,
        responseCount: 0
    },

    this.user =  
    {
        pid: 0,
        version: 0
    }
};


module.exports = new Environment();