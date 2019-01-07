(function(){
if(!window.$trainTaiwanLib) window.$trainTaiwanLib = {};
	
(function(TT){
	TT.os = (function(){
		var ua = navigator.userAgent;
        var rt = {
            isAndroidBrowser: false
        }
        if(ua.indexOf('AppleWebKit/') != -1 && ua.indexOf('Mobile Safari/')!=-1) rt.isAndroidBrowser = true;
        return rt;
    }());

	TT.defined = {
        canUseLocalStorage: (function(){return (window.localStorage) ? true : false;})(),
        debugMode: false,
        defaultCrossDayTime: '04:00:00',
        defaultTRAWeekday: '2',
        defaultMaskText: 'Loading...',
        railBgcolor: 'define_rail_bgcolor_',
        stringOfCompany: {
            "tra": '台灣鐵路局',
            "trtc": '台北捷運',
            "tymetro": '桃園捷運'
        },
        stringSimpleOfCompany: {
            "tra": '台鐵',
            "trtc": '北捷',
            "tymetro": '桃捷'
        },
        timeHour: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        timeMinSec: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29',
                    '30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
        weekStringAry: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        programAbout: {
        },
        programUpdateInfo: [
        ],
        displayPri: {
                "tra": ['tra_shan','tra_hai','tra_liujia','tra_pingxi','tra_jiji','tra_shalun','tra_huadong','tra_beihui','tra_yilan','tra_xibu','tra_zhjy','tra_jygx','tra_pingdong'],
                "trtc": ['trtc_5','trtc_2','trtc_3','trtc_4','trtc_1'],
                "tymetro": ['tymetro_1']
        },
        GetP: (function(){
            var s = location.search, aryParam, tmpParam, rt;
            if(s.indexOf('?')!=-1){
                rt = {};
                aryParam = s.split('?')[1].split('&');
                aryParam.map(function(tmpA){
                    tmpParam = tmpA.split('=');
                    rt[tmpParam[0]] = tmpParam[1];
                });
            }
            return rt;
        })(),
        usePTX: false,
        zxcv: 1
    }
    
    
    function classWindow(ucfg){
        ucfg = ucfg || {};
        var defaultCfg = {
            mask: false,
            height: 'auto',
            width: 'auto',
            baseClass: ' ttWindow',
            cls: '',
            id: TT.ui.genRandomId(),
            div: '',
            items: [],
            html: '',
            renderTo: 'body',
            onShow: function(){},
            zIndex: '120'
        }
        var cfg = $.extend(defaultCfg, ucfg);
        if(typeof(cfg.width)=='number') cfg.width = cfg.width + 'px';
        if(typeof(cfg.height)=='number') cfg.height = cfg.height + 'px';
        var me = this;
        
        me.el = document.createElement('div');
        me.el.className = cfg.baseClass + ' ' + cfg.cls;
        me.el.id = cfg.id;
        me.el.style.zIndex = cfg.zIndex;
        me.el.style.width = cfg.width;
        me.el.style.height = cfg.height;
        me.el.innerHTML = '<div class="inner" id="' + cfg.id + '_inner"></div><div class=" ttWindowClose" closeID="' + cfg.id + '">X</div>';
        
        me.getInner = function(){
            return document.getElementById(cfg.id + '_inner');
        }
        me.setInnerHTML = function(html){
            document.getElementById(cfg.id + '_inner').innerHTML = html;
        }
        
        me.init = function(){
            if(!document.getElementById(cfg.id)){
                if(cfg.renderTo=='body'){
                    document.body.appendChild(me.el);
                }else{
                    document.getElementById(cfg.renderTo).appendChild(me.el);
                }
                me.inner = me.getInner();
                if(typeof(cfg.div)=='string'){
                    me.inner.innerHTML = cfg.div;
                }else{
                    me.inner.appendChild(cfg.div);
                }
                
                if(cfg.html != ''){me.inner.innerHTML = cfg.html;}
                for(var i=0; i<cfg.items.length; i++){
                    me.inner.appendChild(cfg.items[i]);
                }
            }
            me.el.style.display = 'none';
        }
        
        me.addClass = function(cls){
            var ary = me.el.className.split(' ');
            for(var i=0; i<ary.length; i++){
                if(ary[i]==cls) return me.el.className;
            }
            me.el.className = me.el.className + ' ' + cls;
            return me.el.className;
        }
        me.removeClass = function(cls){
            var ary = me.el.className.split(' '), rt = '';;
            for(var i=0; i<ary.length; i++){
                if(ary[i]!=cls){
                    rt += ' ' + ary[i];
                }
            }
            me.el.className = rt;
            return rt;
        }
        
        me.resetPosition = function(){
            var dh = TT.fn.getDocumentHeight(), dw = TT.fn.getDocumentWidth();
            var wh = me.el.clientHeight, ww = me.el.clientWidth;
            
            var top = Math.ceil((dh-wh)/2);
            var left = Math.ceil((dw-ww)/2);
            
            if(top < 0) top = 0;
            if(left < 0) left = 0;
            
            me.setPosition(top, left);
        }
        me.setPosition = function(top,left){
            me.el.style.top = top + 'px';
            me.el.style.left = left + 'px';
        }
        
        me.show = function(objShow){
            objShow = objShow || {};
            if(me.isShow) return false;
            me.isShow = true;
            me.init();
            me.el.style.display = '';
            me.resetPosition();
            if(cfg.mask){
                TT.ui.mask(' ');
            }
            me.showCfg = objShow;
            cfg.onShow(me);
        }
        
        me.close = function(){
            me.el.style.display = 'none';
            TT.ui.unmask();
            me.isShow = false;
        }
        me.clickFn = function(e){
            if(e.target.className.indexOf('ttWindowClose')>=0){
                var id = e.target.attributes.getNamedItem('closeID');
                me.close();
            }
        }
        me.el.addEventListener('click', me.clickFn, false);
    }
    function classMapSelector(ucfg){
        ucfg = ucfg || {};
        var defaultCfg = {
            mask: false,
            height: 'auto',
            width: 'auto',
            autoScroll: false,
            baseClass: ' ttMapSelector',
            cls: '',
            id: TT.ui.genRandomId(),
            items: [],
            html: '',
            isRendered: false,
            onShow: function(){},
            zIndex: '132'
        }
        var cfg = $.extend(defaultCfg, ucfg);
        if(typeof(cfg.width)=='number') cfg.width = cfg.width + 'px';
        if(typeof(cfg.height)=='number') cfg.height = cfg.height + 'px';
        var me = this;
        
        me.el = document.createElement('div');
        me.el.className = cfg.baseClass + ' ' + cfg.cls;
        me.el.id = cfg.id;
        me.el.style.zIndex = cfg.zIndex;
        me.el.style.width = cfg.width;
        me.el.style.height = cfg.height;
        if(cfg.overflowStyle) me.el.style.overflow = cfg.overflowStyle;
        me.el.innerHTML = '<div class="header" id="' + cfg.id + '_header"></div>' + 
            '<div class="main" id="' + cfg.id + '_main"></div><div class=" ttWindowClose" closeID="' + cfg.id + '">X</div>';
        
        me.init = function(){
            if(!document.getElementById(cfg.id)){
                document.body.appendChild(me.el);
                me.isRendered = true;
                var tmpD;
                for(var i=0; i<cfg.items.length; i++){
                    tmpD = '<div class="tabName">' + cfg.items[i].headerText + '</div>';
                    document.getElementById(cfg.id+ '_header').innerHTML += tmpD;
                    document.getElementById(cfg.id+ '_main').appendChild(cfg.items[i]);
                }
                me.itemSwitch(cfg.items[0].headerText);
            }
            me.el.style.display = 'none';
        }
        
        me.itemSwitch = function(val){
            var dm = document.getElementById(cfg.id + '_header');
            for(var i=0; i<dm.childNodes.length; i++){
                dm.childNodes[i].className = dm.childNodes[i].className.replace(' onUse','');
                cfg.items[i].style.zIndex = '2';
                cfg.items[i].style.opacity = '0.2';
                if(val==dm.childNodes[i].innerHTML){
                    dm.childNodes[i].className = dm.childNodes[i].className + ' onUse';
                    cfg.items[i].style.opacity = '1';
                    cfg.items[i].style.zIndex = '5';
                    me.itemActiveString = val;
                }
            }
        }
        
        me.addClass = function(cls){
            var ary = me.el.className.split(' ');
            for(var i=0; i<ary.length; i++){
                if(ary[i]==cls) return me.el.className;
            }
            me.el.className = me.el.className + ' ' + cls;
            return me.el.className;
        }
        me.removeClass = function(cls){
            var ary = me.el.className.split(' '), rt = '';;
            for(var i=0; i<ary.length; i++){
                if(ary[i]!=cls){
                    rt += ' ' + ary[i];
                }
            }
            me.el.className = rt;
            return rt;
        }
        
        me.resetPosition = function(){
            var dh = TT.fn.getDocumentHeight(), dw = TT.fn.getDocumentWidth();
            var wh = me.el.clientHeight, ww = me.el.clientWidth;
            
            var top = 0;
            var left = 0;//Math.ceil((dw*0.025));
            
            me.setPosition(top, left);
            //resize window
            if(cfg.autoScroll){
                me.el.style.width = (dw-20) + 'px';
                me.el.style.height = (dh-20) + 'px';
                var domMain = document.getElementById(cfg.id + '_main');
                domMain.style.width = me.el.style.width;
                domMain.style.height = (dh-50) + 'px';
                domMain.style.overflow = 'auto';
            }
        }
        me.setPosition = function(top,left){
            me.el.style.top = top + 'px';
            me.el.style.left = left + 'px';
        }
        
        me.show = function(scfg){
            if(me.isShow) return false;
            if(typeof(domA)=='string') domA = document.getElementById(domA);
            TT.ui.bodyScroll(0);
            me.isShow = true;
            me.init();
            me.el.style.display = '';
            me.resetPosition();
            TT.ui.mask(' ');
            cfg.onShow(me, cfg, scfg);
        }
        
        me.close = function(){
            me.el.style.display = 'none';
            TT.ui.unmask();
            me.isShow = false;
        }
        me.clickFn = function(e){
            if(e.target.className.indexOf('ttWindowClose')>=0){
                var id = e.target.attributes.getNamedItem('closeID');
                me.close();
            }
            if(e.target.className.indexOf('tabName')!=-1){
                me.itemSwitch(e.target.innerHTML);
            }
        }
        me.el.addEventListener('click', me.clickFn, false);
    }
    TT.lib = {
        classWindow: classWindow,
        classMapSelector: classMapSelector,
        apply: function(objA, objB, flagDoNotCopyExist){//將物件 objB 內容覆蓋 objA 後傳回
        	for(var k in objB){
        		if(!objA[k] || (objA[k] && !flagDoNotCopyExist)){
        			objA[k] = objB[k];
        		}
        	}
        	return objA;
        }
    }
    
    
    TT.ui = {
        randomIdNum: 0,
        bodyScroll: function(val){
            var sysTop;
            if(document.documentElement && document.documentElement.scrollTop>0){
                if(val || val===0) document.documentElement.scrollTop = val;
                sysTop = document.documentElement.scrollTop;
            }else if(document.body && document.body.scrollTop>0){
                if(val || val===0) document.body.scrollTop = val;
                sysTop = document.body.scrollTop;
            }
            return sysTop;
        },
        createDiv: function(id, cls, appendT){
            var dom = document.createElement('div');
            if(id && id=='_gen') id = TT.ui.genRandomId();
            if(id) dom.id = id;
            if(cls) dom.className = cls;
            if(appendT){
                if(appendT == 'body'){
                    document.body.appendChild(dom);
                }else{
                    document.getElementById(appendT).appendChild(dom);
                }
            }
            return dom;
        },
        createMapSelector: function(){
            if(TT.ui.mapSelector) return false;
            var cfg = {}, afterSelectCbFn, win;
            var astObj = TT.fn.getCommon_allTrainStation();
            var astLine = {};
            cfg.autoScroll = false;//(TT.os.isAndroidBrowser) ? false : true;
            astObj.allAry.map(function(objA){
                var line = (objA.byLine);
                if(!astLine[line]) astLine[line] = new Array();
                astLine[line].push(objA);
            });
            
            var divLine = (function(){
                var div = document.createElement('div');
                div.className = 'line_selector';
                var allHTML, htLine = '', tmpST, htStation = ''; 
                for(var k in astLine){
                    htLine += '<div class="lineName ' + TT.defined.railBgcolor + k + '" clickOnLine="1" lineID="' + k + '">' + TT.fn.getCommon_lineName(k) + '</div>';
                    tmpST = '';
                    astLine[k].map(function(sta){
                        tmpST += '<div class="stationName ' + 'mmm'+TT.defined.railBgcolor + k + '" clickOnStation="1" stationID="' + sta.id + '">' + TT.fn.getCommon_stationDataOfID(sta.id).name + '</div>';
                    });
                    htStation += '<div style="display:none;" class="stationGroup ' + k + ' ' + TT.defined.railBgcolor + k + '" lineID="' + k + '">' + tmpST + '</div>';
                }
                htLine = '<div class="allLine">' + htLine +'</div>';
                htStation = '<div class="allStation">' + htStation +'</div>';
                allHTML = htLine + htStation;
                div.innerHTML = allHTML;
                div.headerText = '使用路線列表選擇車站';
                
                div.addEventListener('click', function(e){
                    var t = e.target;
                    if(t.attributes.getNamedItem('clickOnLine')){
                        var id = t.attributes.getNamedItem('lineID').value;
                        $('.line_selector .allLine .lineName').each(function(idx,dom){
                            dom.className = dom.className.replace(' select','');
                        });
                        $('.line_selector .allStation .stationGroup').hide();
                        $('.line_selector .allStation .stationGroup.' + id).show();
                        t.className = t.className + ' select';
                    }else if(t.attributes.getNamedItem('clickOnStation')){
                        var id = t.attributes.getNamedItem('stationID').value;
                        if(afterSelectCbFn){
                            afterSelectCbFn(id);
                        }
                        win.close();
                        TT.ui.msg.show(TT.fn.getCommon_stationDataOfID(id).name,600);
                    }
                }, false);
                return div;
            })();
            var divLineAfterFn = function(){
            
            }
            
            
            var divNet = (function(){
                var div = document.createElement('div');
                div.className = 'line_selector';
                div.headerText = '使用路網圖選擇車站';
                return div;
            })();
            
            cfg.items = [divLine, divNet];
            cfg.onShow = function(wwin, wcfg, scfg){
                //scfg from call show take parameter
                scfg = scfg || {};
                afterSelectCbFn = scfg.afterSelectCbFn;
                win = wwin;
                if(TT.lib.canvasMap && !TT.ui.mapSelector.canvasMap){
                    var canvasMap = new TT.lib.canvasMap({
                        drawPlanLine: true,
                        drawPlanLineOriginalColor: false
                        //,baseWidth: 1550, baseHeight: 2350
                    });
                    canvasMap.initAll();
                    divNet.style.width = canvasMap.cfg.baseWidth + 'px';
                    divNet.style.height = canvasMap.cfg.baseHeight + 'px';
                    divNet.appendChild(canvasMap.div);
                    TT.ui.mapSelector.canvasMap = canvasMap;
                }
            }
            TT.ui.mapSelector = new TT.lib.classMapSelector(cfg);
            TT.ui.mapSelector.el.addEventListener('click', function(e){
                var me = TT.ui.mapSelector;
                var t = e.target;
                if(t.className.indexOf('canvasTWRMapButton')!=-1){
                    if(me.itemActiveString==divNet.headerText){
                        var id = t.className.split('caTWRMap_')[1];
                        if(afterSelectCbFn){
                            afterSelectCbFn(id);
                        }
                        win.close();
                        TT.ui.msg.show(TT.fn.getCommon_stationDataOfID(id).name,600);
                    }else{
                        me.itemSwitch(divNet.headerText);
                    }
                }
                if(t.className.indexOf('canvasTWRMapClickDiv')!=-1){
                    me.itemSwitch(divNet.headerText);
                }
            }, false);
        },
        formatMinute2HM: function(mi){
            if(typeof(mi)=='string' && mi.indexOf(':') > 0){
                mi = Math.ceil(TT.fn.transTime2Sec(mi)/60)
            }
            
            if(mi<60){
                return mi + ' 分';
            }else{
                return Math.floor(mi/60) + ' 小時 ' + (mi % 60) + ' 分';
            }
        },
        genRandomId: function(){
            return 'ttGenID_' + TT.ui.randomIdNum++;;
        },
        mask: function(str){
        },
        unmask: function(){
        },
        msg: (function(){
            var rt = {};
            rt.show = function(str, delay){
                delay = (delay) ? delay : 3000;
                //var div = TT.ui.createDiv('_gen', 'msg show', 'body');
                var div = TT.ui.createDiv('_gen', '', 'body');
                //Give CSS for msg frame
                div.style.minWidth = '100px';
                div.style.maxWidth = '50%';
                div.style.padding = '20px';
                div.style.backgroundColor = '#2080D0';
                div.style.color = '#FFF';
                div.style.position = 'fixed';
                div.style.opacity = 1;
                div.style.transition = 'opacity 0.9s ease 0.1s';
                div.style.zIndex = 151;
                div.style.textAlign = 'center';
                
                div.innerHTML = str;
                var divWidth = div.offsetWidth, divHeight = div.offsetHeight;
                var dw = TT.fn.getDocumentWidth(), dh = TT.fn.getDocumentHeight();
                div.style.top = (dh - divHeight) / 2 + 'px';
                div.style.left = (dw - divWidth) / 2 + 'px';
                var time1 = setTimeout(function(){
                    //div.className += ' afterEffect';
                    div.style.opacity = '0';
                },delay);
                var time2 = setTimeout(function(){
                    document.body.removeChild(div);
                },delay+1000);
                div.addEventListener('click', function(e){
                    clearTimeout(time1);
                    clearTimeout(time2);
                    document.body.removeChild(div);
                }, false);
                return div;
            }
            rt.alert = function(st){
                alert(st);
            }
            
            return rt;
        })(),
        printStatus: function(str){
        },
        transWeekToString: function(w){
            w = parseInt(w,10);
            var ary = ['日','一','二','三','四','五','六'];
            return '星期' + ary[w];
        }
    }
    
    TT.msg = TT.ui.msg;
})($trainTaiwanLib);
})();