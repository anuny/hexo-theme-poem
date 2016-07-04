define('plugins::highlight',function() {
	var highlight = function (skin){
		var pres = document.getElementsByTagName('pre'),
			len = pres.length,
			pre = null,
			index = 0,
			lang = 'javascript',
			html,outer;
	
		/**
		 * 转义html字符
		 * @param {String} html 要转义的html代码
		 * @returns {String} 转义后的html字符串
		 */
		var parseHTML = function (html){
			return html.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/(\r?\n)$/g,'');
		};
	
		/**
		 * 添加行号
		 * @param {Number} nums 行数
		 * @returns {string}
		 */
		var addLineNumber = function (nums){
			var html = ['<div class="','linenum','">'], i=1;
			for(; i< nums; i+=1) html.push(i+'.<br/>');
			html.push(nums,'.</div>');
			return html.join('')
		};
		/**
		 * 根据语言高亮代码
		 * @param {String} html
		 * @param {String} lang
		 * @param {Boolean} findParent
		 * @returns {*}
		 */
		var hlbylanguage = function (html, lang, findParent){
			//var ln = addLineNumber(html.split('\n').length);
	
			if(!(lang in highlight.language)){
				return html + (findParent ? addLineNumber(html.split('\n').length) : '')
			};
	  
			var l = highlight.language[lang];
			
			if(findParent && l.wrapper) l = highlight.language[l.wrapper];
			
			if(!l) return html + (findParent ? addLineNumber(html.split('\n').length) : '');
			html = ' '+html+' ';
	
			var ln = /(&lt;div class="?jshl-linenum"?&gt;(?:.*?)&lt;\/div&gt;)/ig;
	
			if(ln.test(html)){ //已经加入了行号
				html = html.replace(ln,'X@line@X');
			};
			
			var //start = new Date(),
				pattern = l.reg,
				markup = l.markup,
				cls = l.cls || [],
				defaultCls = (cls.length === 0),
				inc = l.include,
				olanghl=[],placeholder=[],pl='',wrapper;
	
	 
			
			var language = '';
			for(var type in pattern){
				language +=pattern[type];
				defaultCls && cls.push(type);
			};

			pattern = new RegExp(language,'g');
	
			//提取其他语言的代码
			if(inc && inc.length > 0){
				
				for(i=0; i< inc.length; i+=1){
					wrapper = new RegExp(inc[i].wrapper.replace(/</g,'&lt;').replace(/>/g,'&gt;'),'gi');
					
					html = html.replace(wrapper,function($0,$1){
						pl = 'X@'+Math.random()+'@X';
						placeholder.push(pl);
						olanghl.push(hlbylanguage($1,inc[i].lang, false));
						return $0.replace($1,pl);
					});
				}
			};
			

			html = html.replace(pattern,function(){
				var args = Array.prototype.slice.call(arguments,0),
					currArg1 = null,
					currArg = null,
					len = args.length - 2,
					index = len;
					
				for(; index > 0; index-=1){
					currArg = args[index];
					
					if(currArg){
						
						if(markup && cls[index-1] === 'html-tag'){
							currArg1 = currArg.replace(/(\w+)=(".*?")/g,'<span class="'+highlight.language.html.cls[2]+'">$1</span>=<span class="'+highlight.language.html.cls[3]+'">$2</span>')
						};
						args[0] = args[0].replace(currArg,'<span class="'+cls[index-1]+'">'+(currArg1 !== null ?currArg1:currArg)+'</span>');
					}
				};
				return args[0];
			});
			
			
			//高亮包含的其他语言
			placeholderLen = placeholder.length;
			if(placeholderLen>0){
				for(i=0; i< placeholderLen; i++){
					html = html.replace(new RegExp('X@.*?'+placeholder[i].replace(/[{@}]/g,'')+'.*?@X','g'),placeholder[i]).replace(placeholder[i], olanghl[i]);
				}
			}
	
			/*
			 * 替换css第一行首多出一个空格的bug
			 * 感谢"落单的孤鸟"反馈
			 */
			var rep = function ($0){
				return /^\s+$/.test($0) ? "" : $0.replace(/(\s+)$/,"")
			};
			
			return html.replace(/^(\<.*?\>)*(\s)|(\s)$/g,rep).replace('X@line@X','') + (findParent ? addLineNumber(html.split('\n').length) : '');
		};
		
		skin = skin||'light';
		
		var addClass =  function(ele,className){
			var hasClass = new RegExp('(\\s|^)' + className + '(\\s|$)').test(ele.className);
			if (!hasClass) ele.className = [ ele.className, className].join(' ').replace(/(^\s+)|(\s+$)/g, ''); 
		};
	
	
		for(; index < len; index += 1){
			pre = pres[index];
			addClass(pre,'HL');
			addClass(pre,'HL-'+skin);
			lang = (pre.getAttribute('data-language') || lang).toLowerCase();
			
			if(typeof langName !== 'undefined' && lang !== langName){
				continue
			};
			
			html = parseHTML(pre.innerHTML);
			
			if(pre.outerHTML){
				outer = pre.outerHTML.match(/<\w+\s*(.*?)>/)[1];
				pre.outerHTML = '<pre '+outer+'>'+ hlbylanguage(html,lang,true) + '</pre>';
			}else{
				pre.innerHTML = hlbylanguage(html,lang,true);
			}
		}
	};
	
	highlight.language = highlight.language || {};
	/**
	 * 扩展语言
	 * @param {String} langName 语言名称
	 * @param {Object} langObj  配置参数
	 */
	highlight.extendLanguage = function(langName, langObj){
		highlight.language[langName] = langObj;
		if(langObj.wrapper){
			highlight.language[langObj.wrapper].include.push(langObj.content);
		}
	}
	
	var init = function (language,skin){
		for(var lan in language){
			highlight.extendLanguage(lan,language[lan])
		};
		highlight(skin);
	};
	
	return init;
});