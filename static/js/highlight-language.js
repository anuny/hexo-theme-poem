define('plugins::highlight=>language',function() {
	var language={};
	language.html={
		cls : ['com','html-tag','html-attr','html-val'],
		reg : {
			'com' : '(&lt;\\\!--[\\\s\\\S]*?--&gt;)|', //注释
			'tag' : '(&lt;\\\/?\\\w+(?:.*?)&gt;)|' //标签
		},
		markup : true,
		include : [
			{
				lang : 'javascript',
				wrapper : '<script>([\\\s\\\S]*?)<\\\/script>'
			},
			{
				lang : 'css',
				wrapper : '<style>([\\\s\\\S]*?)<\\\/style>'
			}
		]
	}
	
	language.css={
		cls : ['com','css-selector','css-attr','css-val','css-brt'],
		reg : {
			'com' : '(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|',   //注释
			'key' : '([^{\\\n\\\$\\\|]*?){|',  //选择器
			
			'obj' : '(?:([\\\w-]+?)\\\s*\\\:([\\\w\\\s"\',\\\-\\\#]*))|', //属性名：属性值
			'brt': '(\\;|\\:|\\!important)'
		}
	}
	
	
	language.javascript=language.js={
		//文档注释 --> 普通注释 --> 字符串 --> 关键字--> 变量 --> 内置对象-->数字-->boolean-->操作符
		cls : ['doc','com','js-str','js-bui','js-key','js-obj','js-num','js-ope','js-brt','js-reg'],
		reg :{
			//文档注释
			'doc' : '.?(\\\/\\\*{2}[\\\s\\\S]*?\\\*\\\/)|',  
			//普通注释
			'com' : '(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|',  
			//字符串
			'str' : '("(?:[^"\\\\]|\\\\[\\s\\S])*"|\'(?:[^\'\\\\]|\\\\[\\s\\S])*\')|', 
			// 保留函数
			'bui' : '\\b(alert|all|anchor|anchors|area|assign|blur|button|checkbox|clearInterval|clearTimeout|clientInformation|close|closed|confirm|constructor|crypto|defaultStatus|document|element|elements|embed|embeds|event|fileUpload|focus|frame|innerHeight|innerWidth|link|location|mimeTypes|navigate|navigator|frames|frameRate|hidden|history|image|images|offscreenBuffering|open|opener|option|options|outerHeight|outerWidth|onblur|onclick|onerror|onfocus|onkeydown|onkeypress|onkeyup|onmouseover|onload|onmouseup|onmousedown|onsubmit|packages|pageXOffset|pageYOffset|parent|password|pkcs11|plugin|prompt|propertyIsEnum|radio|screenX|screenY|scroll|secure|self|status|submit|setTimeout|setInterval|taint|text|textarea|top|window)\\b|',
			// 关键字
			'key' : '\\b(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|foreach|final|finally|float|for|from|function|false|goto|if|implements|import|in|instanceof|int|interface|let|long|native|NaN|new|null|of|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|true|throws|transient|try|typeof|var|void|volatile|while|with)\\b|',
			// 保留对象
			'obj' : '\\b(Array|apply|Boolean|concat|call|cos|charAt|Date|decodeURI|decodeURIComponent|eval|encodeURI|encodeURIComponent|escape|fixed|getTime|hasOwnProperty|Infinity|indexOf|isFinite|isNaN|isPrototypeOf|join|log|lastIndexOf|Math|match|max|min|Number|Object|push|pop|print|prototype|parseFloat|parseInt|RegExp|reset|replace|String|substring|substr|sub|sup|slice|sort|shift|search|slice|splice|split|select|toString|toLowerCase|toUpperCase|toSource|unshift|unescape|untaint|valueOf|write|writeln)\\b|',
			//数字
			'num' : '(?:[^\\W\\d]|\\$)[\\$\\w]*|(0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?|\\.\\d+(?:[eE][+-]?\\d+)?)|', 
			//操作符 
			'ope' : '(\\+|\\-|\\*|\\/|\\%|\\=|\\==|\\===|\\!=|\\!==|\\&=|\\*=|\\+=|\\-=|\\<=|\\>=|\\&lt;|\\&gt;|\\?|\\.|\\,|\\;|\\~|\\`|\\!|\\:|\\^|\\"|\'|\\&amp;|\\|)|',  
			'brt': '(\\[|\\]|\\{|\\}|\\(|\\))|',
			//正则表达式
			'reg': '(?:^|[^\\)\\]\\}])(\\/(?!\\*)(?:\\.|[^\\\/\n])+?\\/[gim]*)|'
		}
	}

	
	language.php={
			//对应的类名称
		cls : ['com','php-mrk','php-str','php-fun','php-key','php-var','php-obj','php-num','php-ope','php-brt'],
		//相应的正则表达式
		reg : {
			'com' : '(\\\/\\\*[\\\s\\\S]*?\\\*\\\/|\\\/\\\/.*|&lt;\\\!--[\\\s\\\S]*?--&gt;)|',  //普通注释
			'mrk' : '(&lt;\\\?php|\\\?&gt;)|', //标签
			'str' : '("(?:[^"\\\\]|\\\\[\\s\\S])*"|\'(?:[^\'\\\\]|\\\\[\\s\\S])*\')|', //字符串
			'fun' : '(?:[^$_@a-zA-Z0-9])?(function)(?![$_@a-zA-Z0-9])|',
			'key' : '(?:[^$_@a-zA-Z0-9])?(and|base64_decode|base64_encode|copy|Cos|count|crypt|current|date|dbase_close|delete|dir|dirname|each|end|ereg|eregi|eval|exec|Exp|explode|extract|exception|fclose|or|substr|this|xor|mktime|str_replace|strrpos|mail)(?![$_@a-zA-Z0-9])|', //关键字
			'var' : '(\\\$[\\\w][\\\w\\\d]*)|', //变量名
			'obj' : '(?:[^$_@A-Za-z0-9])?(array|as|break|case|class|const|continue|default|die|do|echo|else|elseif|empty|endif|exit|extends|for|foreach|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|var|while|final|interface|implements|public|private|protected|abstract|clone|try|catch|throw|int|string|bool|classic|object)(?:[^$_@A-Za-z0-9])|', //内置函数(部分)
			'num' : '\\b(\\\d+(?:\\\.\\\d+)?(?:[Ee][-+]?(?:\\\d)+)?)\\b|',  //数字
			'ope' : '(\\+|\\-|\\*|\\/|\\%|\\=|\\==|\\===|\\!=|\\!==|\\&=|\\*=|\\+=|\\-=|\\<=|\\>=|\\&lt;|\\&gt;|\\?|\\.|\\,|\\;|\\~|\\`|\\!|\\:|\\^|\\"|\'|\\&amp;|\\|)|',
			'brt': '(\\[|\\]|\\{|\\}|\\(|\\))|'
		},
		//父级语言
		wrapper: 'html',
		//内容 ,用于push到wrapper的include
		content : {
			lang : 'php',
			wrapper : '(<\\\?php(?:[\\\s\\\S]*?)\\\?>)'
		}
	}
	return language;
});