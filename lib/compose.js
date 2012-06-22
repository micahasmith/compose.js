/**
	* compose.js
	*	build things as and when you need them
	*
	*	@author micah smith
	*/
var _ = _ || {};

if(typeof require!=='undefined'){
	_ = require('underscore');
}


function PubSub(){
	this._fns=[];
}


function PubSubItem(name,func){
	this.name=name;
	this.func=func;	
}


PubSub.prototype = {
	/**
	*	Adds a function as an observer of published events
	*	@param {string} name of event to bind to. empty to hear all events
	* @param {function} function to fire on event
	* or just pass a {function} for it to be global
	*/
	observe:function(){
		var args = arguments,
			len = args.length;
		
		//its just a function, make it global
		if(len===1 && _.isFunction(args[0])){
			this._fns.push(new PubSubItem("",args[0]));
		} else {
			this._fns.push(new PubSubItem(args[0],args[1]));
		}
	},

	/**
	*	Publishes data to observers
	*	@param {string} name of event to publish to. empty to publish to all events
	* @param {object} data to fire to 
	* or just pass {object} for it to be global
	*/
	publish:function(name,data){
		var args = arguments,
			len = args.length,
			items=[];
		
		//its just data, fire it as global
		if(len===1){
			items=_.filter(this.fns,function(i){ return i.name==="";});
			_.each(items,function(i){ i(data); });
		} else {
			items=_.filter(this.fns,function(i){ return i.name==="" || i.name===name;});
			_.each(items,function(i){ i(data); });
		}
	}
};



// export for CommonJS
if(typeof exports!=='undefined'){
	exports.PubSub=PubSub;
}