(function(w) {
	var module = {};

	// 构造模块
    function Module(id, factory) {
		this.id      = id;
        this.factory = factory;
		module [id]  = this;
    }
	
	//获取模块返回值
    function getExp(id) {
        var mod = module[id];
		return mod ? 'function' === typeof mod.factory ? mod.factory():mod.factory:id + ' is not define'
    }
	
	//定义模块
	w.define = function (id,factory){
		if(!id||'string' !== typeof id) return  id + ' is not string';
		var deps = [];
		new Module(id,factory);
		deps = null;
	}
	
	//获取模块
	w.require = function (id,callback){
		if('function' == typeof id) return id();
		Array == id.constructor||(id = [id]);
		var exports=[];
		for(var i=0,len=id.length;i<len;i++){
			var exp = getExp(id[i])
			exports.push(exp)
		}
		if('function' == typeof callback){
			callback.apply(null,exports)
		}else{
			return exports[0]
		}	
	}
})(this);

