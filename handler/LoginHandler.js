// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : LoginHandler.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************

var Environment = require('../lib/Environment');
var Utility = require('../lib/Utility');

function LoginHandler(app)
{
    this.app = app;
};


LoginHandler.prototype.checkLogin = function (res) 
{
    if(!res || !res.skey)
    {
        console.log("checkLogin数据返回错误");
        return;
    }
    Environment.user.skey = res.skey;
    this.app.platformClient.requestContext('selectServer', function(){});
};


LoginHandler.prototype.selectServer = function (res) 
{
    if(!res || !res.host || !res.port || !res.pid|| !res.skey)
    {
        console.log("selectServer数据返回错误");
        return;
    }

    var serverInfo = res;
    Environment.user.pid = res.pid;
    Environment.user.skey = res.skey;

    this.app.platformClient.close(true);

    var self = this;
    this.app.logicClient.connect(serverInfo, function()
    {
        console.log("连接logic服务器成功");
        self.app.logicClient.module = 'LoginHandler';
        self.app.logicClient.requestContext('checkSession', function(){});
    });
};


LoginHandler.prototype.checkSession = function(res)
{
    this.app.logicClient.requestContext('loadPlayer', function(){});
};


LoginHandler.prototype.loadPlayer = function (res) 
{
    this.app.startEnd();
};




module.exports = function(app)
{
    return new LoginHandler(app);
};

