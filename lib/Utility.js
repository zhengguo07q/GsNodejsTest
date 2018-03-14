// ***************************************************************
//  Copyright(c) Cmge
//  FileName    : Utility.js
//  Creator     : zg 
//  Date        : 2015-6-25
//  Comment : 
// ***************************************************************


var util = require('util');

var Utility = function()
{

};


Utility.prototype.toJsonString = function(json)
{
	return util.inspect(json);
};


Utility.prototype.currentMillis = function () 
{
    return new Date().getTime();
};


Utility.prototype.invokeCallback = function(cb) 
{
  if ( !! cb && typeof cb === 'function') 
  {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }
};


Utility.prototype.throw = function(obj)
{
	throw new Error(util.inspect(obj));
};

module.exports = new Utility();