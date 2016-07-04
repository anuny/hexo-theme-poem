define('plugins::highlight',function() {
	var highlight = function(options) {
		return new highlight.fn.init( options)
	};
	
	var generic={
		comment: '(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|',
		number: '(?:[^\\W\\d]|\\$)[\\$\\w]*|(0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?|\\.\\d+(?:[eE][+-]?\\d+)?)|'
	}

	highlight.fn = highlight.prototype = {
		constructor: highlight,
		init: function(options) {
			this.setting = {
				style: options.style ||'light',
				//language: options.language ||'javascript'
			};
			
			//this.element = options.element;
			//var code = this.element.innerHTML;
			//this.code = this.preg(code);
			//this.element.innerHTML = this.code;
			
			var elements = document.getElementsByTagName('pre');
			for(var i=0,len=elements.length;i<len;i++){
				var element = elements[i];
				var language = element.getAttribute('language');
				var code = element.innerHTML;
				code = this.preg(language,code);
				element.innerHTML = code;
			}
		},
		'language':{
			'javascript':{
				comment: generic.comment,
				bracket: '(\\[|\\]|\\{|\\}|\\(|\\))|',
				symbol: '(\\+|\\-|\\*|\\/|\\%|\\=|\\==|\\===|\\!=|\\!==|\\&=|\\*=|\\+=|\\-=|\\<=|\\>=|\\&lt;|\\&gt;|\\?|\\.|\\&amp;|\\|)|',
				string: '("(?:[^"\\\\]|\\\\[\\s\\S])*"|\'(?:[^\'\\\\]|\\\\[\\s\\S])*\')|',
				root: '\\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|defaultStatus|document|element|elements|embed|embeds|event|fileUpload|focus|frame|innerHeight|innerWidth|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|options|outerHeight|outerWidth|onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit|packages|pageXOffset|pageYOffset|parent|password|pkcs11|plugin|prompt|propertyIsEnum|radio|screenX|screenY|scroll|secure|self|status|submit|setTimeout|setInterval|taint|text|textarea|top|window)\\b|',
				object:'\\b(Array|apply|Boolean|concat|call|cos|charAt|Date|decodeURI|decodeURIComponent|eval|encodeURI|encodeURIComponent|escape|fixed|getTime|hasOwnProperty|Infinity|indexOf|isFinite|isNaN|isPrototypeOf|join|log|lastIndexOf|Math|match|max|min|Number|Object|push|pop|print|prototype|parseFloat|parseInt|RegExp|reset|replace|String|substring|substr|sub|sup|slice|sort|shift|search|slice|splice|split|select|toString|toLowerCase|toUpperCase|toSource|unshift|unescape|untaint|valueOf|write|writeln)\\b|',
				keyword:'\\b(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|foreach|final|finally|float|for|from|function|false|goto|if|implements|import|in|instanceof|int|interface|let|long|native|NaN|new|null|of|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|true|throws|transient|try|typeof|var|void|volatile|while|with)\\b|',
				number: generic.number,			
				regexp: '(?:^|[^\\)\\]\\}])(\\/(?!\\*)(?:\\.|[^\\\/\n])+?\\/[gim]*)|'	
			},
			css: {
				comment: generic.comment,
				keyword: '(\\\@\\\w+|\\\:?\\\:\\\w+|[a-z\\\-]+\\\:)|',
				symbol: '(\\;|\\:|\\{|\\})|',
			},
			html: {
				comment: generic.comment,
				keyword: '(\\\&lt\\\;\\\/?\\\w(.|\n)*?\/?\\\&gt\\\;)|',
				css: '(?:\\\&lt;style.*?\\\&gt;)([\\\s\\\S]+?)(?:\\\&lt;\\\/style\\\&gt;)|',
				script: '(?:\\\&lt;script.*?\\\&gt;)([\\\s\\\S]+?)(?:\\\&lt;\\\/script\\\&gt;)|'
			}

	
			
		},
		
		
		preg: function(lan,code) {
			var types=[];
			var language = '';
			var languages = highlight.fn.language[lan];
			if(!languages)return code;
			for(var type in languages){
				language +=languages[type];
				types.push(type);
			};
			code = code.replace(/\r\n|[\r\n]/g, "\n").replace(/^\s+|\s+$/g, "");
			var regExp = new RegExp(language, 'g');
			console.log(regExp)
			code = code.replace(regExp, function(code) {
				var codes;
				for (var i = 1; i <= types.length; i++) {
					if (codes = arguments[i]) {
						codes = htmlEncode(codes);
						return '<span class="'+types[i-1]+'">' + codes + '</span>';
					}
				};
				return htmlEncode(arguments[0]);
			});
			return code;
			function htmlEncode(str) {
				var i, s = {
						// "&amp;": /&/g,
						"&quot;": /"/g,
						"&#039;": /'/g,
						"&lt;": /</g,
						"&gt;": />/g,
						"<br>": /\n/g
						// "&nbsp;": / /g, // pre 标签不需要替换空格
					};
				for (i in s) {
					if(str!==''){
						
						str = str.replace(s[i], i);
					}
					
				};
				return str;
			}
		}
	};
	highlight.fn.init.prototype = highlight.fn;
	return highlight;
});