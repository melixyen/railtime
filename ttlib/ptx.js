(function(){
if(!window.$trainTaiwanLib) window.$trainTaiwanLib = {};

(function(TT){
	var v2url = 'https://ptx.transportdata.tw/MOTC/v2';
	var ptxURL = v2url;
	var metroURL = ptxURL + '/Rail/Metro';
	var traURL = '/Rail/TRA';
	var ptxMRTWeekStr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	
	var pData = {
		trtc: {
			station_ary: [
                //Bannan Line
                {id:"trtc_031", StationID:["BL23","BR24"]},
                {id:"trtc_097", StationID:["BL22"]},
                {id:"trtc_096", StationID:["BL21"]},
                {id:"trtc_095", StationID:["BL20"]},
                {id:"trtc_094", StationID:["BL19"]},
                {id:"trtc_093", StationID:["BL18"]},
                {id:"trtc_092", StationID:["BL17"]},
                {id:"trtc_091", StationID:["BL16"]},
                {id:"trtc_010", StationID:["BL15","BR10"]},
                {id:"trtc_089", StationID:["BL14","O07"]},
                {id:"trtc_088", StationID:["BL13"]},
                {id:"trtc_086", StationID:["BL11","G12"]},
                {id:"trtc_085", StationID:["BL10"]},
                {id:"trtc_084", StationID:["BL09"]},
                {id:"trtc_083", StationID:["BL08"]},
                {id:"trtc_082", StationID:["BL07"]},
                {id:"trtc_081", StationID:["BL06"]},
                {id:"trtc_080", StationID:["BL05"]},
                {id:"trtc_079", StationID:["BL04"]},
                {id:"trtc_078", StationID:["BL03"]},
                {id:"trtc_077", StationID:["BL02"]},
                {id:"trtc_076", StationID:["BL01"]},
                //TamsuiXinyi Line
                {id:"trtc_071", StationID:["R28"]},
                {id:"trtc_070", StationID:["R27"]},
                {id:"trtc_069", StationID:["R26"]},
                {id:"trtc_068", StationID:["R25"]},
                {id:"trtc_067", StationID:["R24"]},
                {id:"trtc_066", StationID:["R23"]},
                {id:"trtc_064", StationID:["R22"]},
                {id:"trtc_063", StationID:["R21"]},
                {id:"trtc_062", StationID:["R20"]},
                {id:"trtc_061", StationID:["R19"]},
                {id:"trtc_060", StationID:["R18"]},
                {id:"trtc_059", StationID:["R17"]},
                {id:"trtc_058", StationID:["R16"]},
                {id:"trtc_057", StationID:["R15"]},
                {id:"trtc_056", StationID:["R14"]},
                {id:"trtc_055", StationID:["R13","O11"]},
                {id:"trtc_054", StationID:["R12"]},
                {id:"trtc_053", StationID:["R11","G14"]},
                {id:"trtc_051", StationID:["R10","BL12"]},
                {id:"trtc_050", StationID:["R09"]},
                {id:"trtc_134", StationID:["R07","O06"]},
                {id:"trtc_103", StationID:["R06"]},
                {id:"trtc_011", StationID:["R05","BR09"]},
                {id:"trtc_101", StationID:["R04"]},
                {id:"trtc_100", StationID:["R03"]},
                {id:"trtc_099", StationID:["R02"]},
                //ZhongHeXinLu Line
                {id:"trtc_048", StationID:["O01"]},
                {id:"trtc_047", StationID:["O02"]},
                {id:"trtc_046", StationID:["O03"]},
                {id:"trtc_045", StationID:["O04"]},
                {id:"trtc_131", StationID:["O09"]},
                {id:"trtc_130", StationID:["O10"]},
                {id:"trtc_128", StationID:["O12"]},
                {id:"trtc_127", StationID:["O13"]},
                {id:"trtc_126", StationID:["O14"]},
                {id:"trtc_125", StationID:["O15"]},
                {id:"trtc_124", StationID:["O16"]},
                {id:"trtc_123", StationID:["O17"]},
                {id:"trtc_122", StationID:["O18"]},
                {id:"trtc_121", StationID:["O19"]},
                {id:"trtc_180", StationID:["O20"]},
                {id:"trtc_179", StationID:["O21"]},
                {id:"trtc_178", StationID:["O50"]},
                {id:"trtc_177", StationID:["O51"]},
                {id:"trtc_176", StationID:["O52"]},
                {id:"trtc_175", StationID:["O53"]},
                {id:"trtc_174", StationID:["O54"]},
                //SongShanXinDian Line
                {id:"trtc_111", StationID:["G19"]},
                {id:"trtc_110", StationID:["G18"]},
                {id:"trtc_109", StationID:["G17"]},
                {id:"trtc_009", StationID:["G16","BR11"]},
                {id:"trtc_132", StationID:["G15","O08"]},
                {id:"trtc_105", StationID:["G13"]},
                {id:"trtc_043", StationID:["G11"]},
                {id:"trtc_042", StationID:["G10","R08"]},
                {id:"trtc_041", StationID:["G09","O05"]},
                {id:"trtc_040", StationID:["G08"]},
                {id:"trtc_039", StationID:["G07"]},
                {id:"trtc_038", StationID:["G06"]},
                {id:"trtc_037", StationID:["G05"]},
                {id:"trtc_036", StationID:["G04"]},
                {id:"trtc_035", StationID:["G03"]},
                {id:"trtc_034", StationID:["G02"]},
                {id:"trtc_033", StationID:["G01"]}
			],
			line: [{
				id: 'trtc_1',
				LineID: 'BR',
				route: [{
					dir: 0,
					Direction: 0,
					work: [{RouteID: 'BR-1', from: 'BR01', to: 'BR24'}]
				}, {
					dir: 1,
					Direction: 1,
					work: [{RouteID: 'BR-1', from: 'BR24', to: 'BR01'}]
				}]
			}, {
				id: 'trtc_2',
				LineID: 'R',
				route: [{
					dir: 0,
					Direction: 0,
					work: [{RouteID: 'R-1', from: 'R02', to: 'R28'}, {RouteID: 'R-2', from: 'R05', to: 'R22'}]
				}, {
					dir: 1,
					Direction: 1,
					work: [{RouteID: 'R-1', from: 'R28', to: 'R02'}, {RouteID: 'R-2', from: 'R22', to: 'R05'}]
				}]
			}, {
				id: 'trtc_3',
				LineID: 'G',
				route: [{
					dir: 0,
					Direction: 0,
					work: [{RouteID: 'G-1', from: 'G01', to: 'G19'}, {RouteID: 'G-2', from: 'G08', to: 'G19'}]
				}, {
					dir: 1,
					Direction: 1,
					work: [{RouteID: 'G-1', from: 'G19', to: 'G01'}, {RouteID: 'G-2', from: 'G19', to: 'G08'}]
				}]
			}, {
				id: 'trtc_4',
				LineID: 'O',
				route: [{
					dir: 0,
					Direction: 0,
					work: [{RouteID: 'O-1', from: 'O01', to: 'O21'}, {RouteID: 'O-2', from: 'O01', to: 'O54'}]
				}, {
					dir: 1,
					Direction: 1,
					work: [{RouteID: 'O-1', from: 'O21', to: 'O01'}, {RouteID: 'O-2', from: 'O54', to: 'O01'}]
				}]
			}, {
				id: 'trtc_5',
				LineID: 'BL',
				route: [{
					dir: 0,
					Direction: 0,
					work: [{RouteID: 'BL-1', from: 'BL01', to: 'BL23'}, {RouteID: 'BL-2', from: 'BL05', to: 'BL23'}]
				}, {
					dir: 1,
					Direction: 1,
					work: [{RouteID: 'BL-1', from: 'BL23', to: 'BL01'}, {RouteID: 'BL-2', from: 'BL23', to: 'BL05'}]
				}]
			}]
		}
	}
	
	var fnTRTC = {
		checkRouteIdOnUse: function(RouteID, LineID){
			var lineData = this.getLineData(LineID);
			var rt = false;
			for(var i=0; i<lineData.route.length; i++){
				for(var j=0; j<lineData.route[i].work.length; j++){
					if(lineData.route[i].work[j].RouteID==RouteID){
						rt = true;
						break;
					}
				}
			}
			return rt;
		},
		getLineData: function(id){
			var rt = false;
			pData.trtc.line.forEach(function(c){
				if(c.id==id || c.LineID==id){
					rt = c;
				}
			});
			return rt;
		},
		getLineID: function(id){
			return this.getLineData(id).LineID;
		},
		getOriginalLineByLineID: function(LineID){
			var rt = false;
			pData.trtc.line.forEach(function(c){
				if(c.LineID==LineID){
					rt = c;
				}
			});
			return rt;
		},
		getStationIDAry: function(id){
			var ary = pData.trtc.station_ary;
			var stData = false;
			for(var i=0; i<ary.length; i++){
				if(ary[i].id==id){
					stData = ary[i].StationID;
					break;
				}
			}
			return stData;
		},
		getStationID: function(id, lineOriginalID){
			var LineID = (/^trtc/.test(lineOriginalID)) ? this.getLineID(lineOriginalID) : lineOriginalID;
			var stData = this.getStationIDAry(id);
			if(!LineID){
				return false;
			}else{
				var rt = false,
					lineCode = '',
					codeLen = 0;
				stData.forEach(function(c){
					if(/^[a-zA-Z]{1}\d{2}/gi.test(c)){
						codeLen = 1;
					}else if(/^[a-zA-Z]{2}\d{2}/gi.test(c)){
						codeLen = 2;
					}
					lineCode = c.substr(0, codeLen);
					if(lineCode == LineID){
						rt = c;
					}
				});
				return rt;
			}
		},
		getStationIDInWhatLine: function(StatioinID){
			if(/^[a-zA-Z]{1}\d{2}/gi.test(StatioinID)){
				return StatioinID.substr(0,1);
			}else if(/^[a-zA-Z]{2}\d{2}/gi.test(StatioinID)){
				return StatioinID.substr(0,2);
			}
		},
		getStationTime: function(LineID, StationID, w, cbFn){
			var targetID = false;
			var me = this;
			if(typeof(StationID)!='string' && StationID.length==2){
				targetID = StationID[1];
				StationID = StationID[0];
			}
			var Week = false;
			if(typeof(w)=='number') Week = ptxMRTWeekStr[w];
			var mtStr = "$filter=LineID eq '" + LineID + "' and StationID eq '" + StationID + "'";
			if(Week) mtStr += ' and ServiceDays/' + Week + ' eq true';
			var url = metroURL + '/StationTimeTable/TRTC?' + encodeURI(mtStr) + '&$top=3000&$format=JSON';
			if(pui.printStatus) pui.printStatus('線上尋找捷運 ' + StationID + ' 站時刻表');
			//產生暫存時刻表空間
			if(!ptx.tempTimeTable.trtc) ptx.tempTimeTable.trtc = {};
			if(!ptx.tempTimeTable.trtc[LineID]) ptx.tempTimeTable.trtc[LineID] = [];
			if(!ptx.tempTimeTable.trtc[LineID][StationID]) ptx.tempTimeTable.trtc[LineID][StationID] = [];
			ptx.tempTimeTable.trtc[LineID][StationID][w] = [[],[]];//Direction 0 and 1
			//抓時刻表
			ptx.getURL(url, function(json){
				json.forEach(function(routeA){
					var tmpAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
					var tmpTimeAry = routeA.Timetables.map(function(timeObj){
						timeObj.tt_sortTime = TT.fn.transTime2Sec(timeObj.DepartureTime);
						timeObj.RouteID = routeA.RouteID;
						return timeObj;
					});
					if(me.checkRouteIdOnUse(routeA.RouteID, routeA.LineID)){
						if(routeA.Direction == 0){
							tmpAry[0] = tmpAry[0].concat(tmpTimeAry);
						}else if(routeA.Direction == 1){
							tmpAry[1] = tmpAry[1].concat(tmpTimeAry);
						}
					}
				});
				
				var workAry = ptx.tempTimeTable.trtc[LineID][StationID][w];
				var timeMakeFn = function(c){
					return c.DepartureTime;
				};
				workAry[0] = workAry[0].sort(ptx.sortByTTSortTime);
				//在這一步之前都還是物件狀態時刻表，之後暫時改造成單一時刻表替換 rnwTimeTable
				workAry[0] = workAry[0].map(timeMakeFn);
				workAry[1] = workAry[1].sort(ptx.sortByTTSortTime);
				workAry[1] = workAry[1].map(timeMakeFn);
				
				cbFn();
			});
		},
		getFormatStationTime: function(stID, line, dir, w){
			w = parseInt(w);
			var StationID = TT.ptx.trtc.getStationID(stID, line);
        	var LineID = TT.ptx.trtc.getLineID(line);
        	var rt = false;
        	if(!ptx.tempTimeTable.trtc) return false;
        	if(!ptx.tempTimeTable.trtc[LineID]) return false;
        	if(!ptx.tempTimeTable.trtc[LineID][StationID]) return false;
        	if(!ptx.tempTimeTable.trtc[LineID][StationID][w]) return false;
        	if(!ptx.tempTimeTable.trtc[LineID][StationID][w][dir]) return false;
        	if(ptx.tempTimeTable.trtc[LineID][StationID][w][dir].length==0) return false;
        	return ptx.tempTimeTable.trtc[LineID][StationID][w][dir];
		},
		getOriginalStationID: function(StationID){
			var ary = pData.trtc.station_ary;
			var stData = false;
			for(var i=0; i<ary.length; i++){
				if(ary[i].StationID.indexOf(StationID)!=-1){
					stData = ary[i].id;
					break;
				}
			}
			return stData;
		}
	}
	var pui = {
		printStatus: function(){
			if(TT && TT.ui && TT.ui.printStatus){ TT.ui.printStatus.apply(TT.ui, arguments); }
		},
		mask: function(){
			if(TT && TT.ui && TT.ui.mask){ TT.ui.mask.apply(TT.ui, arguments); }
		},
		unmask: function(){
			if(TT && TT.ui && TT.ui.unmask){ TT.ui.unmask.apply(TT.ui, arguments); }
		}
	}
	
	var ptx = {
		data: pData,
		trtc: fnTRTC,
		tempTimeTable: {},
	    GetAuthorizationHeader: function(){
	        var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	        var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	
	        var GMTString = new Date().toGMTString();
	        var ShaObj = new jsSHA('SHA-1', 'TEXT');
	        ShaObj.setHMACKey(AppKey, 'TEXT');
	        ShaObj.update('x-date: ' + GMTString);
	        var HMAC = ShaObj.getHMAC('B64');
	        var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
	
	        return { 'Authorization': Authorization, 'X-Date': GMTString};
	    },
	    getJSONP: function(url, cbFn){
	        $.ajax({
	            type: 'GET',
	            url: url, //欲呼叫之API網址
	            dataType: 'jsonp', //跨網域必需設為 JSONP
	            headers: this.GetAuthorizationHeader(),
	            success: function (data) {
	                cbFn(JSON.stringify(data));
	            },
	            error: function(){
	                cbFn('fail');
	            }
	        });
	    },
	    getTakeMRTTimeTable: function(mrtPTXAry, w, cbFn){
	    	pui.mask('使用雲端公共交通資訊整合平台 API 讀取相關捷運站時刻表');
	    	function runGet(arr){
	    		if(arr.length==0){
	    			pui.unmask();
	    			cbFn();
	    		}else{
	    			var obj = arr.shift();
	    			if(obj.company=='trtc'){
	    				var LineID = fnTRTC.getLineID(obj.line),
	    					StationID = fnTRTC.getStationID(obj.takeRange[0], obj.line),
							targetID = fnTRTC.getStationID(obj.takeRange[1], obj.line);
	    				fnTRTC.getStationTime(LineID, [StationID,targetID], parseInt(w), function(){runGet(arr);});
	    			}
	    		}
	    	}
	    	runGet(mrtPTXAry);
	    },
	    getURL: function(url, cbFn){
	        function reqListener(xhr){
	            if(xhr.target.readyState==4 && xhr.target.status==200){
	                cbFn(JSON.parse(xhr.target.response));
	            }else{
	                cbFn('fail');
	            }
	        }
	        var fm = new XMLHttpRequest();
	        fm.addEventListener("load", reqListener);
	        fm.addEventListener("error", reqListener);
	        fm.addEventListener("abort", reqListener);
	        fm.addEventListener("timeout", reqListener);
	        fm.open('GET', url);
	        fm.timeout = 6000;
	        var headerObj = this.GetAuthorizationHeader();
	        for(var k in headerObj){
	            fm.setRequestHeader(k, headerObj[k]);
	        }
	        fm.send();
	    },
	    getStationLiveInfo: function(stid, cbFn){
	        stid = (stid) ? stid.replace('tra_','') : '1008';
	        cbFn = cbFn || function(data){console.info(data);};
	        var url = traURL + '/LiveBoard/Station/' + stid + '?$top=30&$format=JSON';
	        this.getURL(url, cbFn);
	    },
	    getStationTodayTime: function(stid, cbFn){
	        stid = (stid) ? stid.replace('tra_','') : '1008';
	        cbFn = cbFn || function(data){console.info(data);};
	        var url = traURL + '/DailyTimetable/Station/' + stid + '/' + TT.goingData.today + '?$top=3000&$format=JSON';
	        this.getURL(url, cbFn);
	    },
	    sortByTTSortTime: function(a,b){
            var intA = parseInt(a.tt_sortTime,10);
            var intB = parseInt(b.tt_sortTime,10);
            if(intA==intB) return 0;
            if(intA < intB) return -1;
            if(intA > intB) return 1;
        }
    }
	
	
	TT.ptx = ptx;
})($trainTaiwanLib);
})();


//jsSHA function start
(function(G){function r(d,b,c){var h=0,a=[],f=0,g,m,k,e,l,p,q,t,w=!1,n=[],u=[],v,r=!1;c=c||{};g=c.encoding||"UTF8";v=c.numRounds||1;if(v!==parseInt(v,10)||1>v)throw Error("numRounds must a integer >= 1");if("SHA-1"===d)l=512,p=z,q=H,e=160,t=function(a){return a.slice()};else throw Error("Chosen SHA variant is not supported");k=A(b,g);m=x(d);this.setHMACKey=function(a,f,b){var c;if(!0===w)throw Error("HMAC key already set");if(!0===r)throw Error("Cannot set HMAC key after calling update");
g=(b||{}).encoding||"UTF8";f=A(f,g)(a);a=f.binLen;f=f.value;c=l>>>3;b=c/4-1;if(c<a/8){for(f=q(f,a,0,x(d),e);f.length<=b;)f.push(0);f[b]&=4294967040}else if(c>a/8){for(;f.length<=b;)f.push(0);f[b]&=4294967040}for(a=0;a<=b;a+=1)n[a]=f[a]^909522486,u[a]=f[a]^1549556828;m=p(n,m);h=l;w=!0};this.update=function(e){var b,g,c,d=0,q=l>>>5;b=k(e,a,f);e=b.binLen;g=b.value;b=e>>>5;for(c=0;c<b;c+=q)d+l<=e&&(m=p(g.slice(c,c+q),m),d+=l);h+=d;a=g.slice(d>>>5);f=e%l;r=!0};this.getHash=function(b,g){var c,k,l,p;if(!0===
w)throw Error("Cannot call getHash after setting HMAC key");l=B(g);switch(b){case "HEX":c=function(a){return C(a,e,l)};break;case "B64":c=function(a){return D(a,e,l)};break;case "BYTES":c=function(a){return E(a,e)};break;case "ARRAYBUFFER":try{k=new ArrayBuffer(0)}catch(I){throw Error("ARRAYBUFFER not supported by this environment");}c=function(a){return F(a,e)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");}p=q(a.slice(),f,h,t(m),e);for(k=1;k<v;k+=1)p=q(p,e,0,x(d),e);
return c(p)};this.getHMAC=function(b,g){var c,k,n,r;if(!1===w)throw Error("Cannot call getHMAC without first setting HMAC key");n=B(g);switch(b){case "HEX":c=function(a){return C(a,e,n)};break;case "B64":c=function(a){return D(a,e,n)};break;case "BYTES":c=function(a){return E(a,e)};break;case "ARRAYBUFFER":try{c=new ArrayBuffer(0)}catch(I){throw Error("ARRAYBUFFER not supported by this environment");}c=function(a){return F(a,e)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
}k=q(a.slice(),f,h,t(m),e);r=p(u,x(d));r=q(k,e,l,r,e);return c(r)}}function C(d,b,c){var h="";b/=8;var a,f;for(a=0;a<b;a+=1)f=d[a>>>2]>>>8*(3+a%4*-1),h+="0123456789abcdef".charAt(f>>>4&15)+"0123456789abcdef".charAt(f&15);return c.outputUpper?h.toUpperCase():h}function D(d,b,c){var h="",a=b/8,f,g,m;for(f=0;f<a;f+=3)for(g=f+1<a?d[f+1>>>2]:0,m=f+2<a?d[f+2>>>2]:0,m=(d[f>>>2]>>>8*(3+f%4*-1)&255)<<16|(g>>>8*(3+(f+1)%4*-1)&255)<<8|m>>>8*(3+(f+2)%4*-1)&255,g=0;4>g;g+=1)8*f+6*g<=b?h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m>>>
6*(3-g)&63):h+=c.b64Pad;return h}function E(d,b){var c="",h=b/8,a,f;for(a=0;a<h;a+=1)f=d[a>>>2]>>>8*(3+a%4*-1)&255,c+=String.fromCharCode(f);return c}function F(d,b){var c=b/8,h,a=new ArrayBuffer(c),f;f=new Uint8Array(a);for(h=0;h<c;h+=1)f[h]=d[h>>>2]>>>8*(3+h%4*-1)&255;return a}function B(d){var b={outputUpper:!1,b64Pad:"=",shakeLen:-1};d=d||{};b.outputUpper=d.outputUpper||!1;!0===d.hasOwnProperty("b64Pad")&&(b.b64Pad=d.b64Pad);if("boolean"!==typeof b.outputUpper)throw Error("Invalid outputUpper formatting option");
if("string"!==typeof b.b64Pad)throw Error("Invalid b64Pad formatting option");return b}function A(d,b){var c;switch(b){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(d){case "HEX":c=function(b,a,f){var g=b.length,c,d,e,l,p;if(0!==g%2)throw Error("String of HEX type must be in byte increments");a=a||[0];f=f||0;p=f>>>3;for(c=0;c<g;c+=2){d=parseInt(b.substr(c,2),16);if(isNaN(d))throw Error("String of HEX type contains invalid characters");
l=(c>>>1)+p;for(e=l>>>2;a.length<=e;)a.push(0);a[e]|=d<<8*(3+l%4*-1)}return{value:a,binLen:4*g+f}};break;case "TEXT":c=function(c,a,f){var g,d,k=0,e,l,p,q,t,n;a=a||[0];f=f||0;p=f>>>3;if("UTF8"===b)for(n=3,e=0;e<c.length;e+=1)for(g=c.charCodeAt(e),d=[],128>g?d.push(g):2048>g?(d.push(192|g>>>6),d.push(128|g&63)):55296>g||57344<=g?d.push(224|g>>>12,128|g>>>6&63,128|g&63):(e+=1,g=65536+((g&1023)<<10|c.charCodeAt(e)&1023),d.push(240|g>>>18,128|g>>>12&63,128|g>>>6&63,128|g&63)),l=0;l<d.length;l+=1){t=k+
p;for(q=t>>>2;a.length<=q;)a.push(0);a[q]|=d[l]<<8*(n+t%4*-1);k+=1}else if("UTF16BE"===b||"UTF16LE"===b)for(n=2,e=0;e<c.length;e+=1){g=c.charCodeAt(e);"UTF16LE"===b&&(l=g&255,g=l<<8|g>>>8);t=k+p;for(q=t>>>2;a.length<=q;)a.push(0);a[q]|=g<<8*(n+t%4*-1);k+=2}return{value:a,binLen:8*k+f}};break;case "B64":c=function(b,a,f){var c=0,d,k,e,l,p,q,n;if(-1===b.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");k=b.indexOf("=");b=b.replace(/\=/g,"");if(-1!==k&&k<b.length)throw Error("Invalid '=' found in base-64 string");
a=a||[0];f=f||0;q=f>>>3;for(k=0;k<b.length;k+=4){p=b.substr(k,4);for(e=l=0;e<p.length;e+=1)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[e]),l|=d<<18-6*e;for(e=0;e<p.length-1;e+=1){n=c+q;for(d=n>>>2;a.length<=d;)a.push(0);a[d]|=(l>>>16-8*e&255)<<8*(3+n%4*-1);c+=1}}return{value:a,binLen:8*c+f}};break;case "BYTES":c=function(b,a,c){var d,m,k,e,l;a=a||[0];c=c||0;k=c>>>3;for(m=0;m<b.length;m+=1)d=b.charCodeAt(m),l=m+k,e=l>>>2,a.length<=e&&a.push(0),a[e]|=d<<8*(3+l%4*-1);
return{value:a,binLen:8*b.length+c}};break;case "ARRAYBUFFER":try{c=new ArrayBuffer(0)}catch(h){throw Error("ARRAYBUFFER not supported by this environment");}c=function(b,a,c){var d,m,k,e,l;a=a||[0];c=c||0;m=c>>>3;l=new Uint8Array(b);for(d=0;d<b.byteLength;d+=1)e=d+m,k=e>>>2,a.length<=k&&a.push(0),a[k]|=l[d]<<8*(3+e%4*-1);return{value:a,binLen:8*b.byteLength+c}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");}return c}function n(d,b){return d<<b|d>>>32-b}function u(d,
b){var c=(d&65535)+(b&65535);return((d>>>16)+(b>>>16)+(c>>>16)&65535)<<16|c&65535}function y(d,b,c,h,a){var f=(d&65535)+(b&65535)+(c&65535)+(h&65535)+(a&65535);return((d>>>16)+(b>>>16)+(c>>>16)+(h>>>16)+(a>>>16)+(f>>>16)&65535)<<16|f&65535}function x(d){var b=[];if("SHA-1"===d)b=[1732584193,4023233417,2562383102,271733878,3285377520];else throw Error("No SHA variants supported");return b}function z(d,b){var c=[],h,a,f,g,m,k,e;h=b[0];a=b[1];f=b[2];g=b[3];m=b[4];for(e=0;80>e;e+=1)c[e]=16>e?d[e]:n(c[e-
3]^c[e-8]^c[e-14]^c[e-16],1),k=20>e?y(n(h,5),a&f^~a&g,m,1518500249,c[e]):40>e?y(n(h,5),a^f^g,m,1859775393,c[e]):60>e?y(n(h,5),a&f^a&g^f&g,m,2400959708,c[e]):y(n(h,5),a^f^g,m,3395469782,c[e]),m=g,g=f,f=n(a,30),a=h,h=k;b[0]=u(h,b[0]);b[1]=u(a,b[1]);b[2]=u(f,b[2]);b[3]=u(g,b[3]);b[4]=u(m,b[4]);return b}function H(d,b,c,h){var a;for(a=(b+65>>>9<<4)+15;d.length<=a;)d.push(0);d[b>>>5]|=128<<24-b%32;b+=c;d[a]=b&4294967295;d[a-1]=b/4294967296|0;b=d.length;for(a=0;a<b;a+=16)h=z(d.slice(a,a+16),h);return h}
"function"===typeof define&&define.amd?define(function(){return r}):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(module.exports=r),exports=r):G.jsSHA=r})(this);
//jsSHA function end