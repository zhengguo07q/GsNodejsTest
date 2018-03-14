// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : HandlerService.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************

var fs = require('fs');
var path = require('path');
var Environment = require('./Environment');
var utility = require('./Utility');
var path = require('path');

var HandlerService = function(appContext) 
{
    this.app = appContext;
    this.handlerDirname = __dirname + '/../handler';
    this.handlers = {};
};


HandlerService.prototype.loadHandlerFile = function ()
{
    var self = this;
    if(!fs.existsSync(this.handlerDirname))
    {
        console.error('fail to find handler dir, find path: %s', this.handlerDirname);
        return;
    }

    console.log(this.handlerDirname);
    fs.readdirSync(this.handlerDirname).forEach(function (filename)
    {
        if (!/\.js$/.test(filename))
        {
            return;
        }
        var name = path.basename(filename, '.js');

        var absolutePath = path.join(self.handlerDirname, filename);
        if(!fs.existsSync(absolutePath))
        {
            console.error('handler %s not exist at %s', name, absolutePath);
        }
        else
        {
            var handler = require(absolutePath)(self.app);

            var moduleName = self.getModuleName(handler);

            self.handlers[moduleName] = [];

            for(var key in handler)
            {
              if(typeof(handler[key]) === 'function') 
              {
                self.handlers[moduleName][key] = handler;
              }
            }
        }
    });
};


HandlerService.prototype.getModuleName = function(module)
{  
    var name = module.constructor.toString();
    if(name.indexOf('function') == -1)
    {  
        return null;  
    }
    else
    {  
        name = name.replace('function','');  
        var idx = name.indexOf('(');  
        name = name.substring(0, idx);  
        name = name.replace(" ", "");  
    }  
    return name;  
} ; 


HandlerService.prototype.onRespond = function (module, res, accessRoute) 
{
    if(res && (res.v || res.v===0))
    {
        Environment.user.version = res.v;
    }

    if (accessRoute) 
    {
        var apiName = accessRoute.substring(accessRoute.lastIndexOf(".") + 1);

        this.handle(module, apiName, res);
    }
};


HandlerService.prototype.handle = function(module, routeRecord, res) 
{

    var localHandlers = this.handlers[module];

    if(localHandlers == null)
    {
        throw new Error('find module name failure : ' + module);
    }
    
    localHandlers[routeRecord][routeRecord](res);
    return;
};



module.exports = function(appContext)
{
    return new HandlerService(appContext);
};