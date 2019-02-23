/* Vue-duoguo 
*	Support multi language by global varible of ES5 Javascript.
*	* (c) 2019 Melix Yen
*	* @license MIT
*	* Ver 0.1
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueDuoGuo = factory());
}(this, (function () { 'use strict';

var vuePlugInName = 'Vue-duoguo';
var CONST_STATE_SUCCESS = 1,
	CONST_STATE_FAIL = 0;
var version = "0.1";

function assert (condition, message) {
	if (!condition) {
		throw new Error(("[" + vuePlugInName + "] " + message));
	}
}
function warn (condition, message) {
	if ("development" !== 'production' && !condition) {
		typeof console !== 'undefined' && console.warn(("[" + vuePlugInName + "] " + message));
	}
}
function isError (err) {
	return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function loadScript(file, cbFn){
    var head= document.getElementsByTagName('head')[0]; 
    var script= document.createElement('script'); 
	script.type= 'text/javascript'; 
    script.onload = script.onreadystatechange = function() {
		var event = {readyState: this.readyState};
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
			event.status = CONST_STATE_SUCCESS;
            cbFn(event); 
            script.onload = script.onreadystatechange = null; // Handle memory leak in IE 
        }else{
			event.status = CONST_STATE_FAIL;
			cbFn(event); 
		}
	};
	script.onerror = function(){
		cbFn({readyState: this.readyState, status: CONST_STATE_FAIL});
	}
    script.src= file; 
    head.appendChild(script);
}
function loadJSON(url, cbFn){
	function reqListener(xhr){
		var res = xhr.target.response;
		try{res = JSON.parse(res)}catch(e){assert(false, "json file format error.")}
		var event = {
			xhr: xhr,
			res: res
		}
		if(xhr.target.readyState==4 && xhr.target.status==200){
			event.status = CONST_STATE_SUCCESS;
			cbFn(JSON.parse(xhr.target.response), event);
		}else{
			event.status = CONST_STATE_FAIL;
			cbFn(xhr.target.response, event);
		}
	}
	var fm = new XMLHttpRequest();
	fm.addEventListener("load", reqListener);
	fm.addEventListener("error", reqListener);
	fm.addEventListener("abort", reqListener);
	fm.addEventListener("timeout", reqListener);
	fm.open('GET', url);
	fm.timeout = 30000;
	fm.withCredentials = true;
	fm.send();
}
function pageLoaded(myArgs, cbFn){
		var me = this;
		if(document.readyState == 'complete'){
			cbFn.apply(me, myArgs);
		}else{
			window.addEventListener('load', function() {
				cbFn.apply(me, myArgs);
			});
		}
}

var inBrowser = typeof window !== 'undefined';

var VueDuoGuo = function VueDuoGuo (options) {
	if ( options === void 0 ) options = {};
	this.app = null;
}
VueDuoGuo.version = version;
VueDuoGuo.CONST_STATE_SUCCESS = CONST_STATE_SUCCESS;
VueDuoGuo.CONST_STATE_FAIL = CONST_STATE_FAIL;

var _Vue;

var cmpArray = [];
var config = {
	//lang: "en", // String, define which language now used.
	//path: "./lang/", // String, Optional, language file store path || Object, Optional, a language object like {"en":{"str1":"Hello", "str2":"World"}, "cht":{"str1":"你好","str2":"世界"}}
	//autoload: false, // Boolean, Optional, if set true and path is an object, this can help you setConfig and load language string at once.
	//autoCallback: function(){},// Boolean, Optional, if set autoload: true, this function will be called on language changed.
	//filename: "{lang}.min.js", // String, Optional, define a language string name format. The {lang} use for change language, example: en.min.js / cht.min.js / jp.min.js
	//global: "_LANG", // String, Must on json format or in-code language. if you set this, VueDuoGuo will change language variable to here. "_LANG" means window._LANG
	//component: "_LANG", //String, Optiona, if you set this value, all component data will bind it.
	//baseLang: "en", // String, Optional, If your language file not every string had translated, maybe you want base on some language like English, and just translate already exist string on Chinese, you can give a base language here. If you set this, VueDuoGuo will load base language fisrt and load the target at second. 
	//beforeChange: function(){}, //Function, Optional, event when language file loaded and before call Vue component forceUpdate..
	//changed: function(){}, //Function, Optional, event when every component had been call the method $forceUpdate.
	//localStorage: "my_lang", //String, Optional, binding a localStorage value to save language setting.
	//type: "json" //String, Optional, if use .js or .json in filename, you do not need set this, VueDuoGuo can auto detect ext name.
};
var prog = {
	lang: '',
	mode: 'obj', //obj , file
	type: 'json', //js , json
	loadBase: false,
	writeToCmpData: false
}
var langString;

function findCmpIndex(cmp){
	return cmpArray.findIndex(function(c){
		return !!(c._uid==cmp._uid);
	})
}
function registerCmp(cmp){
	if(typeof(cmp._uid) == 'undefined') return false;
	if(findCmpIndex(cmp) == -1){
		cmpArray.push(cmp);
	}
}
function unregisterCmp(cmp){
	if(typeof(cmp._uid) == 'undefined') return false;
	var tmpA = findCmpIndex(cmp);
	if(tmpA > -1){
		cmpArray.splice(tmpA,1);
	}
}
function update(){
	cmpArray.forEach(function(cmp){
		if(prog.writeToCmpData) cmp[config.component] = langString;
		cmp.$forceUpdate();
	})
}
function cloneObj(objA, objB){
	return (function(){for(var k in objB){objA[k] = objB[k];}; return objA;})();//Object.assign
}
function systemChangeLang(lang){
	prog.lang = lang;
	Vue.duoguo.lang = lang;
}
function change(lang, cbFn){
	if(!lang) assert(false, "You must set a language key for Vue.duoguo.change.");
	systemChangeLang(lang);
	var path = config.path;
	var me = this;
	var afterFunction = function(event){
		event = event || {};
		event = cloneObj(event, prog);

		if(typeof(config.beforeChange)=="function") config.beforeChange.call(me, event, langString);
		update();
		if(typeof(config.changed)=="function") config.changed.call(me, event, langString);
		if(typeof(cbFn)=="function") cbFn.call(me, event, langString);
	}
	var giveString = function(strObj){
		strObj = strObj || langString;
		if(typeof(config.global)=='string'){
			window[config.global] = strObj;
		}else{
			config.global = strObj;
		}
	}
    var replaceLang = function(str, lang){ return str.replace('{lang}',lang);}

	if(prog.mode=='obj'){
		langString = JSON.parse(JSON.stringify(path[lang]));
		if(prog.loadBase){
			var objBase = path[config.baseLang];
			for(var k in objBase){
				if(!langString[k]){
					langString[k] = objBase[k];
				}
			}
		}
		giveString(langString);
		//變數替換完就執行
		afterFunction();
	}else if(prog.mode=='file'){
		var baseString, workString;
        switch(prog.type){
            case 'js':
                if(prog.loadBase){
                    loadScript(replaceLang(prog.filepath, config.baseLang), function(){
						baseString = cloneObj({}, ((typeof(config.global)=='string')?window[config.global]:config.global));
                        loadScript(replaceLang(prog.filepath, lang), function(){
							langString = (typeof(config.global)=='string')?window[config.global]:config.global;
							for(var k in baseString){
								if(langString && !langString[k]) langString[k] = baseString[k];
							}
                            afterFunction();
                        });
                    });
                }else{
                    loadScript(replaceLang(prog.filepath, lang), function(){
                        afterFunction();
                    });
                }
            break;
			case 'json':
                if(prog.loadBase){
                    loadJSON(replaceLang(prog.filepath, config.baseLang), function(jsonA, e){
						baseString = jsonA;
                        loadJSON(replaceLang(prog.filepath, lang), function(json, e){
							workString = json;
							for(var k in baseString){
								if(!workString[k]) workString[k] = baseString[k];
							}
							langString = workString;
							giveString(langString);
                            afterFunction(e);
                        });
                    });
                }else{
                    loadJSON(replaceLang(prog.filepath, lang), function(json, e){
						langString = json;
						giveString(langString);
                        afterFunction(e);
                    });
                }
            break;
        }
    }
	if(prog.localStorage) localStorage.setItem(prog.localStorage, lang);
}
function getLanguageString(){ return langString || window[config.global]; }

Vue.mixin({
	mounted: function mounted(){
		if(this.$forceUpdate) registerCmp(this);
	},
	beforeDestroy: function beforeDestroy(){
		if(this.$forceUpdate) unregisterCmp(this);
	}
});

VueDuoGuo.install = function(Vue, cfg){
	if (VueDuoGuo.install.installed) { return }
	VueDuoGuo.install.installed = true;
	_Vue = Vue;

	function duoguoMethod(opt){
		return this;
	}

	Vue.duoguo = {
		update: update,
		change: change,
		config: config,
		prog: prog,
		lang: prog.lang,
		getLanguageString: getLanguageString,
		setConfig: VueDuoGuo.setConfig
	};

	Object.defineProperty(Vue.prototype, '$duoguo', {
		get: function get () { return duoguoMethod }
	});
}

VueDuoGuo.setConfig = function(cfg){
	if(!cfg || typeof(cfg)!='object'){
		assert(false, 'setConfig parameter is undefined or format error. 多國語言設定 setConfig 參數錯誤');
		return false;
	}

    for(var k in cfg){
        config[k] = cfg[k];
    }
	systemChangeLang(config.lang);
	if(config.baseLang && typeof(config.baseLang)=="string") prog.loadBase = true;
	if(config.component && typeof(config.component)=="string") prog.writeToCmpData = true;
	if(config.localStorage && typeof(config.localStorage)=="string") prog.localStorage = config.localStorage;
	
	// +++++ Detect language running mode start +++++
	if(config.path){
		var mode = (typeof(config.path) == 'object') ? 'obj' : 'file';
		prog.mode = mode;
		if(mode=='file'){
			var tmpFilenameExt = config.filename.split('.').pop();
			prog.type = (/js$/.test(tmpFilenameExt)) ? 'js' : 'json';
			if(config.type && typeof(config.type=='string')) prog.type = config.type;
            var filepath = config.path;
            if(!filepath || typeof(filepath)!='string'){
                assert(false, "Config path is wrong, please check setConfig parameter.");
                return false;
            }
            if(filepath.substr(-1) != '/') filepath += '/';
            var filename = config.filename;
            if(!filename || typeof(filename)!='string' || filename.indexOf('{lang}')){
                assert(false, "Config filename is wrong, please check setConfig parameter. Do not forget dynamic replace word {lang}");
                return false;
            }
            prog.filepath = filepath + filename;
		}
	}

	if(config.autoload){
		var tmpLang = config.lang;
		var autoCallback = (config.autoCallback && typeof(config.autoCallback)=='function') ? config.autoCallback : function(){};
		if(prog.localStorage && localStorage.getItem(prog.localStorage)) tmpLang = localStorage.getItem(prog.localStorage);
		if(config.global){
			change(tmpLang, function(){
				pageLoaded.call(this, arguments, autoCallback);
			});
		}
	}
	// +++++ Detect language running mode end +++++
	if(config.global && mode=='obj'){
		if(typeof(config.global)=='string'){
			langString = window[config.global];
		}else if(typeof(config.global)=='object'){
			langString = config.global;
		}
	}
}

VueDuoGuo.helpMe = function(){
	console.log('This is an multi language mixin for Vue.js 2.x');
	console.info({lang: 'en',path: "./lang/",filename: "{lang}.min.js",global: "_LANG",readme:"This is a demo config of use javascript .js for language source."})
	console.info({lang: 'en',path: "./lang",filename: "{lang}.json",global: "_LANG",readme:"This is a demo config of use .json for language source."})
	console.info({lang: 'en',path: "{An object variable}",global: "_LANG",readme:"This is a demo config of use .json for language source."})
}

VueDuoGuo.prototype.init = function init (app /* Vue component instance */) {
    var me = this;

	"development" !== 'production' && assert(
		VueDuoGuo.install.installed,
    	"not installed. Make sure to call `Vue.use(VueDuoGuo)` " +
    	"before creating root instance."
	);

	this.apps.push(app);

	// main app already initialized.
	if (this.app) {
		return
	}

	this.app = app;

};

if (inBrowser && window.Vue) {
  window.Vue.use(VueDuoGuo);
}
return VueDuoGuo;

})));