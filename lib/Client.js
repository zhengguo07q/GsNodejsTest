// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : Client.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************

var Utility = require('./Utility');
var pomelo = require('pomelo-client');
var Environment = require('./Environment');
var HandlerService = require('./HandlerService');

var Client = function(appContext)
{
    this.app = appContext;

    this.module = null;
    this.accessRoute = null;

    this.connected = false;
};


Client.prototype.connect = function (serverInfo, callback) 
{
    if (!this.connected) 
    {
        try 
        {
            console.log("connecting: " + Utility.toJsonString(serverInfo));
            pomelo.init(
            {
                host: serverInfo.host,
                port: serverInfo.port,
                log: serverInfo.log ? serverInfo.log : false
            }, 
            function (data) 
            {
                this.connected = true;
                console.log("connected at: " + Utility.toJsonString(serverInfo));
                if (callback) 
                {
                    callback(data);
                }
            }.bind(this));

            pomelo.on("onUpdatePlayer", function(msg)
            {
                this.onServerNotify("onUpdatePlayer", msg);
            }.bind(this));
        } catch (e) 
        {
            console.log("Error on connect: " + e);
        }
    }
};


Client.prototype.close = function (force) 
{
    try
    {
        pomelo.disconnect();
    }
    catch(e)
    {
    }

    this.connected = false;
    console.log("已断开连接");
};


Client.prototype.requestContext = function (routeRecord, callback) 
{
    var context = this.app.context;
    if(Environment[context] == undefined)
    {
        throw new Error('not exists context key : ' + context);
    }
    this.accessRoute = Environment[context][routeRecord].api;
    var params = Environment[context][routeRecord].param;

    this.request(this.accessRoute, params, callback);
};


Client.prototype.request = function (remoteService, params, callback) 
{
    try 
    {
        if (!this.isConnected()) 
        {
            console.log("连接已断开");
            return;
        }
        var time = Utility.currentMillis();

        if(params && params!="")
        {
            if(params && !params.skey && Environment.user.skey)
            {
                params.skey = Environment.user.skey;
            }
            if(params && (!params.v || params.v===0)){
                params.v = Environment.user.version;
            }
            if(params && (!params.pid || params.pid===0) && Environment.user.pid)
            {
                params.pid = Environment.user.pid;
            }
        }
        
        console.log("request ===>> [" + remoteService + "] " + Utility.toJsonString(params));

        pomelo.request(remoteService, params, function (data) 
        {
            var elapsed = Utility.currentMillis() - time;
            this.onRespond(data, elapsed);
            
            if (callback) 
            {
                callback(data);
            }
        }.bind(this));
    } 
    catch (e) 
    {
        this.connected = false;
        console.log('request error: ' + e);
    }
};


Client.prototype.isConnected = function () 
{
    return this.connected;
};


Client.prototype.onRespond = function (data, elapsed) 
{

        Environment.sys.responseCount ++;

        var str = "respond <<=== [" + elapsed + "ms, " + Environment.sys.responseCount + "] " + Utility.toJsonString(data);
        console.log(str);

        this.app.handlerService.onRespond(this.module, data, this.accessRoute);

};


Client.prototype.onServerNotify = function (api, data) 
{
    try 
    {
        Environment.sys.responseCount ++;
        var str = "serverNotify <<=== [" + api + ", " + Environment.sys.responseCount + "] " + Utility.toJsonString(data);
        console.log(str);
        this.app.handlerService.onRespond(this.module, data);
    }
    catch (e) 
    {
        this.connected = false;
        console.log('serverNotify error: ' + e);
    }
};


module.exports = Client;