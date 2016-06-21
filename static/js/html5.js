define("html5",function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.text = 'var tag="abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(",");function createEle(tag,callback){ele = document.createElement(tag);ele = null;};for(var i=0,len=tag.length;i<len;i++)createEle(tag[i])';
	document.getElementsByTagName('head')[0].appendChild(script);
	script = null;
})