/*
*   License: LGPL
*   作者: melixyen@gmail.com
*   發行單位: 極光駭客
*   version: Beta 0.3
*   
*   lineData格式
*   {
*       tra:[   <==陣列，營運單位，儲存各路線
*           {
*               id: 字串，路線id
*               name: 字串，路線名稱
*               color: 字串，以CSS方式編輯路線的顏色
*               dir: (選擇性)路線趨於順時針或逆時針方向，順時針為0，逆時針為1
*               station: {  <==物件，路線下的所有車站
*                   "tra_1001":{    <==物件，自訂一個車站ID，格式必需為 "營運單位名" + "_" + "車站id"，例如 tra 的 1001 號車站必需為 tra_1001
*                       x: 數字，X座標
*                       y: 數字，Y座標
*                       name: 字串，車站名稱
*                       stationClass: 數字，用於選擇 cfg.stationClassFontSize 與 cfg.stationClassFontMaxWidth 中使用的字體大小和最大寬度值
*                       company: (選擇性)布林，true 時車站名稱會加上營運單位名稱
*                       noClick: (選擇性)布林，false 時不產生 click 事件 div
*                       noDraw: (選擇性)布林，true 時不在 canvas 上畫這個車站，通常用於兩條路線交會時第二條路線不需要再繪製一次車站時使用
*                   }
*               },
*               line: [ <==陣列，將要連續繪製的車站依序放進陣列中串起來成為路線圖
*                   {   
*                       type: "station" "turn" "move" ，station 以該車站為 node，turn 以該車站往 X,Y 方向移動數個 px 後為 node，move 會將 canvas 畫筆移到該車站 id 位置打破連續畫線的狀態可以跳到某個車站再開始畫
*                       id: 字串，對應到前面 station 物件的車站 id，用於讀取該站的 x , y 座標
*                       ox: (type為turn時使用)數字，從該 id 的車站往 x 方向移動後設一個轉折點，需配合 oy 一起設
*                       oy: (type為turn時使用)數字，從該 id 的車站往 y 方向移動後設一個轉折點，需配合 ox 一起設
*                   }
*               ],
*               nameTag: {  <==(選擇性)物件，當存在時會在指定位置書寫路線名稱
*                   fontColor: '#FFF' 字串，以CSS方式編輯路線的顏色
*                   id:'tra_1001', 字串，對應到前面 station 物件的車站 id，用於讀取該站的 x , y 座標
*                   ox: -160, 數字，從該 id 的車站往 x 方向移動，需配合 oy 一起設
*                   oy: -24   數字，從該 id 的車站往 y 方向移動，需配合 ox 一起設
*               }
*           }
*       ]
*   }
*   
*   本程式 lineData 中所有座標均以台鐵台北車站為原點 (0,0) 定位
*   透過 cfg.offsetX 及 cfg.offsetY 控制台鐵台北車站在整張圖中的座標位置
*   
*   預設建立 name space  window.canvasTaiwanRailwayMapJS
*   預設呼叫方式  var a = new canvasTaiwanRailwayMapJS(cfg);
*   初始化方式 a.initAll();
*   
*   canvas 物件最後會在回傳的 ca.el，context 2d 最後會在回傳的 ca.c，可以繼續控制來畫其他的東西
*   預設會有 click 層 div 擋在 canvas 上面，可以透過 cfg.makeClickDiv = false 來關掉這一層，在瀏覽器內打開圖片時就可以直接另存新檔
*/

(function(wind){
    function canvasMap(cfg){
        cfg = cfg || {};
        defaultCfg = {
            baseWidth: 1550,//canvas 畫布寬
            baseHeight: 3330,//canvas 畫布高
            canTouch: ("ontouchend" in document),
            canvasBgcolor: 'rgba(255,255,255,0.9)',
            canvasID: null,//canvas 的 id，不需要則為 null
            companyNameObj: {tra: '台鐵', trtc: '北捷', thsr: '高鐵', tymetro: '桃捷', crtc: '中捷'},
            divID: null,//外層包 div 時的 id，不需要則為 null
            divWidth: null,
            divHeight: null,
            drawPlanLine: true,
            drawPlanLineOriginalColor: true,
            drawPlanColor: '#EEE',
            divOverflowStyle: null,//'auto' or 'hidden'
            maxWidthByBrowser: false,//設為 true 時會將圖片寬度縮到小於瀏覽器當下寬度
            lineData: null,//傳入自己的 lineData 取代預設的路網
            linePOS: null,
            lineWidth: 9,//路線圖的線寬
            maekCkickCBFN: function(e){},// 車站被點擊時的 callback function
            maekClickCSSName: 'caTWRMap_',// 車站按鈕 CSS name 前綴，後面會自動連接車站 id，便於從 click 事件取得被點擊的車站 id
            makeClickBaseCSSName: 'canvasTWRMapButton',// 車站按鈕 CSS name
            makeClickDiv: true,// 車站是否可被點擊
            makeClickDivID: null,
            makeClickDivCSSName: 'canvasTWRMapClickDiv',
            offsetX: 600,
            offsetY: 400,
            renderDiv: true,
            renderID: 'body',// body 時直接 render 在 document.body 上，或者傳入要 render 的 div id，也可以是 DOM Element
            stationClassFontSize: [18,18,16,14,12,10],
            stationClassFontMaxWidth: [100,90,80,80,70,60],
            stationNameColor: '#000',
            zIndex: 130,
            zoom: 1
        }
        cfg = $.extend(defaultCfg, cfg);
        if(cfg.maxWidthByBrowser){
            if(cfg.baseWidth > document.documentElement.clientWidth){
                cfg.divWidth = document.documentElement.clientWidth-10;
            }
        }
        
        var onlyDoPlanLine = false;
        var pos = {
            badu: {x: 650, y: -240},
            hualian: {x: 820, y: 870},
            taidong: {x: 820, y: 1720},
            tauoyuan: {x: -240, y: 530},
            hsinchu: {x: -240, y: 1000},
            taichung: {x: 100, y: 1530},
            changhua: {x: -240, y: 1780},
            chayi: {x: -170, y: 2180},
            tainan: {x: -400, y: 2480},
            kaohsiung: {x: -300, y: 2880}
        }
        if(cfg.linePOS) pos = cfg.linePOS;
        
        var lineData = {
            planLine: [
                
            ],
            tra: [
                {
            		id: "tra_xibu",
                    name: "[台鐵] 西部幹線(基隆-竹南)",
                    color: "#000050",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1001', 
                        ox: -160, 
                        oy: -24
                    },
            		dir: "1",
                    line: [
                        {type: 'station', id: 'tra_1001'},
                        {type: 'station', id: 'tra_1030'},
                        {type: 'station', id: 'tra_1004'},
                        {type: 'station', id: 'tra_1031'},
                        {type: 'station', id: 'tra_1006'},
                        {type: 'turn', id: 'tra_1008', ox: 260, oy: -20},
                        {type: 'turn', id: 'tra_1008', ox: 160, oy: 0},
                        {type: 'station', id: 'tra_1008'},
                        {type: 'turn', id: 'tra_1008', ox: -40, oy: 0},
                        {type: 'station', id: 'tra_1009'},
                        {type: 'station', id: 'tra_1011'},
                        {type: 'station', id: 'tra_1032'},
                        {type: 'station', id: 'tra_1012'},
                        {type: 'station', id: 'tra_1013'},
                        {type: 'station', id: 'tra_1014'},
                        {type: 'station', id: 'tra_fengming'},
                        {type: 'station', id: 'tra_1015'},
                        {type: 'station', id: 'tra_1028'}
                    ],
            		station: {
                        "tra_1001": {x: pos.badu.x, y: -320, name: '基隆', stationClass: 1 },
                        "tra_1029": {x: pos.badu.x, y: -280, name: '三坑', stationClass: 4 },
                        "tra_1002": {x: pos.badu.x, y: pos.badu.y, name: '八堵', stationClass: 2 },
                        "tra_1003": {x: pos.badu.x, y: -200, name: '七堵', stationClass: 2 },
                        "tra_1030": {x: pos.badu.x, y: -160, name: '百福', stationClass: 4 },
                        "tra_1004": {x: pos.badu.x, y: -120, name: '五堵', stationClass: 4 },
                        "tra_1005": {x: pos.badu.x, y: -80, name: '汐止', stationClass: 2 },
                        "tra_1031": {x: pos.badu.x, y: -20, name: '汐科', stationClass: 4, company: true},
                        "tra_1006": {x: 550, y: -20, name: '南港', stationClass: 3, company: true, noDraw: false },
                        "tra_1007": {x: 450, y: -20, name: '松山', stationClass: 2, company: true },
                        "tra_1008": {x: 0, y: 0, name: '臺北', stationClass: 0, company: true },
                        "tra_1009": {x: -130, y: 90, name: '萬華', stationClass: 4},
                        "tra_1011": {x: -300, y: 90, name: '板橋', stationClass: 1, company: true },
                        "tra_1032": {x: -370, y: 100, name: '浮洲', stationClass: 4},
                        "tra_1012": {x: -440, y: 170, name: '樹林', stationClass: 2},
                        "tra_4102": {x: -440, y: 255, name: '南樹林', stationClass: 4, noClick: true},
                        "tra_1013": {x: -440, y: 285, name: '山佳', stationClass: 4},
                        "tra_1014": {x: -440, y: 310, name: '鶯歌', stationClass: 3, company: true},
                        "tra_fengming": {x: -440, y: 460, name: '鳳鳴', stationClass: 4, noClick: true},
                        "tra_1015": {x: pos.tauoyuan.x, y: pos.tauoyuan.y, name: '桃園', stationClass: 1, company: true},
                        "tra_1016": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+130, name: '內壢', stationClass: 4},
                        "tra_1017": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+200, name: '中壢', stationClass: 2, company: true},
                        "tra_1018": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+230, name: '埔心', stationClass: 4},
                        "tra_1019": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+255, name: '楊梅', stationClass: 4},
                        "tra_1020": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+290, name: '富岡', stationClass: 4},
                        "tra_1036": {x: pos.tauoyuan.x, y: pos.tauoyuan.y+315, name: '新富', stationClass: 4},
                        "tra_1033": {x: pos.hsinchu.x, y: pos.hsinchu.y-130, name: '北湖', stationClass: 4},
                        "tra_1021": {x: pos.hsinchu.x, y: pos.hsinchu.y-105, name: '湖口', stationClass: 4},
                        "tra_1022": {x: pos.hsinchu.x, y: pos.hsinchu.y-80, name: '新豐', stationClass: 4},
                        "tra_1023": {x: pos.hsinchu.x, y: pos.hsinchu.y-55, name: '竹北', stationClass: 4},
                        "tra_1024": {x: pos.hsinchu.x, y: pos.hsinchu.y-30, name: '北新竹', stationClass: 4},
                        "tra_1025": {x: pos.hsinchu.x, y: pos.hsinchu.y, name: '新竹', stationClass: 1},
                        "tra_1035": {x: pos.hsinchu.x, y: pos.hsinchu.y+30, name: '三姓橋', stationClass: 4},
                        "tra_1026": {x: pos.hsinchu.x, y: pos.hsinchu.y+55, name: '香山', stationClass: 4},
                        "tra_1027": {x: pos.hsinchu.x, y: pos.hsinchu.y+80, name: '崎頂', stationClass: 4},
                        "tra_1028": {x: pos.hsinchu.x, y: pos.hsinchu.y+110, name: '竹南', stationClass: 3}
                    } 
                }, {
                    id: "tra_shan",
                    name: "[台鐵]山線",
                    color: "#104020",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1310', 
                        ox: 20, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'tra_1028'},
                        {type: 'station', id: 'tra_1302'},
                        {type: 'turn', id: 'tra_1304', ox: -40, oy: -30},
                        {type: 'station', id: 'tra_1304'},
                        {type: 'station', id: 'tra_1314'},
                        {type: 'station', id: 'tra_1315'},
                        {type: 'station', id: 'tra_1319'},
                        {type: 'station', id: 'tra_1322'},
                        {type: 'station', id: 'tra_1320'},
                        {type: 'turn', id: 'tra_1320', ox: 0, oy: 55},
                        {type: 'station', id: 'tra_1324'},
                        {type: 'station', id: 'tra_1321'},
                        {type: 'station', id: 'tra_1120'}
                    ],
                    station: {
                        "tra_1028": {x: pos.hsinchu.x, y: pos.hsinchu.y+110, name: '竹南', stationClass: 3, noDraw: true},
                        "tra_1302": {x: pos.hsinchu.x+80, y: pos.hsinchu.y+120, name: '造橋', stationClass: 4 },
                        "tra_1304": {x: pos.hsinchu.x+170, y: pos.hsinchu.y+150, name: '豐富', stationClass: 3 },
                        "tra_1305": {x: pos.hsinchu.x+210, y: pos.hsinchu.y+180, name: '苗栗', stationClass: 3, company: true},
                        "tra_1307": {x: pos.hsinchu.x+250, y: pos.hsinchu.y+205, name: '南勢', stationClass: 4 },
                        "tra_1308": {x: pos.hsinchu.x+280, y: pos.hsinchu.y+230, name: '銅鑼', stationClass: 4 },
                        "tra_1310": {x: pos.hsinchu.x+310, y: pos.hsinchu.y+255, name: '三義', stationClass: 4 },
                        "tra_1314": {x: pos.hsinchu.x+340, y: pos.hsinchu.y+280, name: '泰安', stationClass: 4 },
                        "tra_1315": {x: pos.taichung.x, y: pos.taichung.y-220, name: '后里', stationClass: 4 },
                        "tra_1317": {x: pos.taichung.x, y: pos.taichung.y-190, name: '豐原', stationClass: 4 },
                        "tra_1318": {x: pos.taichung.x, y: pos.taichung.y-130, name: '潭子', stationClass: 4 },
                        "tra_songzhu": {x: pos.taichung.x, y: pos.taichung.y-85, name: '松竹', stationClass: 3, noClick: true, company: true},
                        "tra_1323": {x: pos.taichung.x, y: pos.taichung.y-60, name: '太原', stationClass: 4 },
                        "tra_1319": {x: pos.taichung.x, y: pos.taichung.y, name: '台中', stationClass: 1, company: true},
                        "tra_1322": {x: pos.taichung.x, y: pos.taichung.y+70, name: '大慶', stationClass: 3, company: true},
                        "tra_1320": {x: pos.taichung.x, y: pos.taichung.y+150, name: '烏日', stationClass: 3, company: true},
                        "tra_1324": {x: pos.taichung.x-200, y: pos.taichung.y+205, name: '新烏日', stationClass: 2, company: true},
                        "tra_1321": {x: pos.taichung.x-280, y: pos.taichung.y+220, name: '成功', stationClass: 4 },
                        "tra_1120": {x: pos.changhua.x, y: pos.changhua.y, name: '彰化', stationClass: 1, noDraw: true, company: true}
                    }
                }, {
                    id: "tra_zhjy",
                    name: "[台鐵]西部幹線(彰化-嘉義)",
                    color: "#707010",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1210', 
                        ox: 20, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'tra_1120'},
                        {type: 'station', id: 'tra_1203'},
                        {type: 'station', id: 'tra_1207'},
                        {type: 'station', id: 'tra_1208'},
                        {type: 'station', id: 'tra_1215'}
                    ],
                    station: {
                        "tra_1120": {x: pos.changhua.x, y: pos.changhua.y, name: '彰化', stationClass: 1, company: true},
                        "tra_1202": {x: pos.changhua.x+25, y: pos.changhua.y+27, name: '花壇', stationClass: 4 },
                        "tra_1240": {x: pos.changhua.x+50, y: pos.changhua.y+50, name: '大村', stationClass: 4 },
                        "tra_1203": {x: pos.changhua.x+75, y: pos.changhua.y+75, name: '員林', stationClass: 2 },
                        "tra_1204": {x: pos.changhua.x+75, y: pos.changhua.y+100, name: '永靖', stationClass: 4 },
                        "tra_1205": {x: pos.changhua.x+75, y: pos.changhua.y+123, name: '社頭', stationClass: 4 },
                        "tra_1206": {x: pos.changhua.x+75, y: pos.changhua.y+148, name: '田中', stationClass: 3 },
                        "tra_1207": {x: pos.changhua.x+75, y: pos.changhua.y+173, name: '二水', stationClass: 3 },
                        "tra_1208": {x: pos.chayi.x, y: pos.chayi.y-200, name: '林內', stationClass: 4 },
                        "tra_1209": {x: pos.chayi.x, y: pos.chayi.y-177, name: '石榴', stationClass: 4 },
                        "tra_1210": {x: pos.chayi.x, y: pos.chayi.y-152, name: '斗六', stationClass: 2 },
                        "tra_1211": {x: pos.chayi.x, y: pos.chayi.y-126, name: '斗南', stationClass: 4 },
                        "tra_1212": {x: pos.chayi.x, y: pos.chayi.y-103, name: '石龜', stationClass: 4 },
                        "tra_1213": {x: pos.chayi.x, y: pos.chayi.y-80, name: '大林', stationClass: 4 },
                        "tra_1214": {x: pos.chayi.x, y: pos.chayi.y-55, name: '民雄', stationClass: 4 },
                        "tra_1241": {x: pos.chayi.x, y: pos.chayi.y-30, name: '嘉北', stationClass: 4 },
                        "tra_1215": {x: pos.chayi.x, y: pos.chayi.y, name: '嘉義', stationClass: 1, company: true}
                    }
                }, {
                    id: "tra_jygx",
                    name: "[台鐵]西部幹線(嘉義-高雄)",
                    color: "#302040",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1218', 
                        ox: 20, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'tra_1215'},
                        {type: 'station', id: 'tra_1218'},
                        {type: 'station', id: 'tra_1219'},
                        {type: 'station', id: 'tra_1223'},
                        {type: 'station', id: 'tra_1225'},
                        {type: 'station', id: 'tra_1244'},
                        {type: 'station', id: 'tra_1239'},
                        {type: 'station', id: 'tra_1228'},
                        {type: 'station', id: 'tra_1236'},
                        {type: 'station', id: 'tra_1238'}
                    ],
                    station: {
                        "tra_1215": {x: pos.chayi.x, y: pos.chayi.y, name: '嘉義', stationClass: 1, company: true, noDraw: true},
                        "tra_1217": {x: pos.chayi.x, y: pos.chayi.y+30, name: '水上', stationClass: 4 },
                        "tra_1218": {x: pos.chayi.x, y: pos.chayi.y+53, name: '南靖', stationClass: 4 },
                        "tra_1219": {x: pos.tainan.x+210, y: pos.tainan.y-225, name: '後壁', stationClass: 4 },
                        "tra_1220": {x: pos.tainan.x+200, y: pos.tainan.y-200, name: '新營', stationClass: 3 },
                        "tra_1221": {x: pos.tainan.x+190, y: pos.tainan.y-175, name: '柳營', stationClass: 4 },
                        "tra_1222": {x: pos.tainan.x+180, y: pos.tainan.y-150, name: '林鳳營', stationClass: 4 },
                        "tra_1223": {x: pos.tainan.x+170, y: pos.tainan.y-125, name: '隆田', stationClass: 4 },
                        "tra_1224": {x: pos.tainan.x+120, y: pos.tainan.y-125, name: '拔林', stationClass: 4 },
                        "tra_1225": {x: pos.tainan.x+70, y: pos.tainan.y-125, name: '善化', stationClass: 4 },
                        "tra_1244": {x: pos.tainan.x+50, y: pos.tainan.y-102, name: '南科', stationClass: 4 },
                        "tra_1226": {x: pos.tainan.x+40, y: pos.tainan.y-78, name: '新市', stationClass: 4 },
                        "tra_1227": {x: pos.tainan.x+30, y: pos.tainan.y-54, name: '永康', stationClass: 4 },
                        "tra_1239": {x: pos.tainan.x+20, y: pos.tainan.y-30, name: '大橋', stationClass: 4 },
                        "tra_1228": {x: pos.tainan.x, y: pos.tainan.y, name: '台南', stationClass: 1, company: true},
                        "tra_1229": {x: pos.tainan.x, y: pos.tainan.y+28, name: '保安', stationClass: 4 },
                        "tra_1243": {x: pos.tainan.x, y: pos.tainan.y+52, name: '仁德', stationClass: 4 },
                        "tra_1230": {x: pos.tainan.x, y: pos.tainan.y+76, name: '中洲', stationClass: 2 },
                        "tra_1231": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-300, name: '大湖', stationClass: 4 },
                        "tra_1232": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-275, name: '路竹', stationClass: 4 },
                        "tra_1233": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-250, name: '岡山', stationClass: 4 },
                        "tra_1234": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-205, name: '橋頭', stationClass: 3, company: true},
                        "tra_1235": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-150, name: '楠梓', stationClass: 4 },
                        "tra_1242": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-100, name: '新左營', stationClass: 3 },
                        "tra_1236": {x: pos.kaohsiung.x-100, y: pos.kaohsiung.y-50, name: '左營', stationClass: 4 },
                        "tra_1238": {x: pos.kaohsiung.x, y: pos.kaohsiung.y, name: '高雄', stationClass: 1, company: true}
                    }
                }, {
                    id: "tra_yilan",
                    name: "[台鐵]宜蘭線",
                    color: "#500000",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1818', 
                        ox: -118, 
                        oy: 0
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_1002'},
                        {type: 'station', id: 'tra_1805'},
                        {type: 'station', id: 'tra_1811'},
                        {type: 'station', id: 'tra_1818'},
                        {type: 'station', id: 'tra_1826'},
                        {type: 'station', id: 'tra_1827'}
                    ],
                    station: {
                        "tra_1002": {x: pos.badu.x, y: pos.badu.y, name: '八堵', stationClass: 2, noDraw: true},
                        "tra_1802": {x: pos.badu.x+60, y: pos.badu.y, name: '暖暖', stationClass: 4 },
                        "tra_1803": {x: pos.badu.x+120, y: pos.badu.y, name: '四腳亭', stationClass: 4 },
                        "tra_1804": {x: pos.badu.x+180, y: pos.badu.y, name: '瑞芳', stationClass: 3 },
                        "tra_1805": {x: pos.badu.x+240, y: pos.badu.y, name: '猴硐', stationClass: 4 },
                        "tra_1806": {x: pos.badu.x+240, y: pos.badu.y+60, name: '三貂嶺', stationClass: 4 },
                        "tra_1807": {x: pos.badu.x+240, y: pos.badu.y+90, name: '牡丹', stationClass: 4 },
                        "tra_1808": {x: pos.badu.x+240, y: pos.badu.y+120, name: '雙溪', stationClass: 4 },
                        "tra_1809": {x: pos.badu.x+240, y: pos.badu.y+150, name: '貢寮', stationClass: 4 },
                        "tra_1810": {x: pos.badu.x+240, y: pos.badu.y+180, name: '福隆', stationClass: 3 },
                        "tra_1811": {x: pos.badu.x+240, y: pos.badu.y+260, name: '石城', stationClass: 4 },
                        "tra_1812": {x: pos.badu.x+230, y: pos.badu.y+290, name: '大里', stationClass: 4 },
                        "tra_1813": {x: pos.badu.x+220, y: pos.badu.y+320, name: '大溪', stationClass: 4 },
                        "tra_1814": {x: pos.badu.x+210, y: pos.badu.y+350, name: '龜山', stationClass: 4 },
                        "tra_1815": {x: pos.badu.x+200, y: pos.badu.y+380, name: '外澳', stationClass: 4 },
                        "tra_1816": {x: pos.badu.x+190, y: pos.badu.y+410, name: '頭城', stationClass: 4 },
                        "tra_1817": {x: pos.badu.x+180, y: pos.badu.y+440, name: '頂埔', stationClass: 4 },
                        "tra_1818": {x: pos.badu.x+170, y: pos.badu.y+470, name: '礁溪', stationClass: 4 },
                        "tra_1819": {x: pos.badu.x+170, y: pos.badu.y+500, name: '四城', stationClass: 4 },
                        "tra_1820": {x: pos.badu.x+170, y: pos.badu.y+530, name: '宜蘭', stationClass: 2 },
                        "tra_1821": {x: pos.badu.x+170, y: pos.badu.y+560, name: '二結', stationClass: 4 },
                        "tra_1822": {x: pos.badu.x+170, y: pos.badu.y+590, name: '中里', stationClass: 4 },
                        "tra_1823": {x: pos.badu.x+170, y: pos.badu.y+620, name: '羅東', stationClass: 2 },
                        "tra_1824": {x: pos.badu.x+170, y: pos.badu.y+650, name: '冬山', stationClass: 4 },
                        "tra_1825": {x: pos.badu.x+170, y: pos.badu.y+680, name: '新馬', stationClass: 4 },
                        "tra_1826": {x: pos.badu.x+170, y: pos.badu.y+710, name: '蘇澳新', stationClass: 3 },
                        "tra_1827": {x: pos.badu.x+240, y: pos.badu.y+710, name: '蘇澳', stationClass: 2 }
                    }
                }, {
                    id: "tra_beihui",
                    name: "[台鐵]北迴線",
                    color: "#004060",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1709', 
                        ox: -118, 
                        oy: 0
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_1826'},
                        {type: 'station', id: 'tra_1715'}
                    ],
                    station: {
                        "tra_1826": {x: pos.badu.x+170, y: pos.badu.y+710, name: '蘇澳新', stationClass: 3, noDraw: true },
                        "tra_1703": {x: pos.hualian.x, y: pos.hualian.y-330, name: '永樂', stationClass: 5},
                        "tra_1704": {x: pos.hualian.x, y: pos.hualian.y-300, name: '東澳', stationClass: 4},
                        "tra_1705": {x: pos.hualian.x, y: pos.hualian.y-270, name: '南澳', stationClass: 4},
                        "tra_1706": {x: pos.hualian.x, y: pos.hualian.y-240, name: '武塔', stationClass: 4},
                        "tra_1708": {x: pos.hualian.x, y: pos.hualian.y-210, name: '漢本', stationClass: 4},
                        "tra_1709": {x: pos.hualian.x, y: pos.hualian.y-180, name: '和平', stationClass: 4},
                        "tra_1710": {x: pos.hualian.x, y: pos.hualian.y-150, name: '和仁', stationClass: 4},
                        "tra_1711": {x: pos.hualian.x, y: pos.hualian.y-120, name: '崇德', stationClass: 4},
                        "tra_1712": {x: pos.hualian.x, y: pos.hualian.y-90, name: '新城', stationClass: 4},
                        "tra_1713": {x: pos.hualian.x, y: pos.hualian.y-60, name: '景美', stationClass: 4},
                        "tra_1714": {x: pos.hualian.x, y: pos.hualian.y-30, name: '北埔', stationClass: 4},
                        "tra_1715": {x: pos.hualian.x, y: pos.hualian.y, name: '花蓮', stationClass: 0 }
                    }
                }, {
                    id: "tra_huadongi",
                    name: "[台鐵]台東線",
                    color: "#605040",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1616', 
                        ox: -118, 
                        oy: 0
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_1715'},
                        {type: 'station', id: 'tra_1624'},
                        {type: 'station', id: 'tra_1626'},
                        {type: 'station', id: 'tra_1628'},
                        {type: 'station', id: 'tra_1630'},
                        {type: 'station', id: 'tra_1632'}
                    ],
                    station: {
                        "tra_1715": {x: pos.hualian.x, y: pos.hualian.y, name: '花蓮', stationClass: 0, noDraw: true},
                        "tra_1602": {x: pos.hualian.x, y: pos.hualian.y+40, name: '吉安', stationClass: 4},
                        "tra_1604": {x: pos.hualian.x, y: pos.hualian.y+70, name: '志學', stationClass: 4},
                        "tra_1605": {x: pos.hualian.x, y: pos.hualian.y+100, name: '平和', stationClass: 4},
                        "tra_1606": {x: pos.hualian.x, y: pos.hualian.y+130, name: '壽豐', stationClass: 4},
                        "tra_1607": {x: pos.hualian.x, y: pos.hualian.y+160, name: '豐田', stationClass: 4},
                        "tra_1609": {x: pos.hualian.x, y: pos.hualian.y+190, name: '南平', stationClass: 4},
                        "tra_1610": {x: pos.hualian.x, y: pos.hualian.y+220, name: '鳳林', stationClass: 4},
                        "tra_1611": {x: pos.hualian.x, y: pos.hualian.y+250, name: '萬榮', stationClass: 4},
                        "tra_1612": {x: pos.hualian.x, y: pos.hualian.y+280, name: '光復', stationClass: 4},
                        "tra_1613": {x: pos.hualian.x, y: pos.hualian.y+310, name: '大富', stationClass: 4},
                        "tra_1614": {x: pos.hualian.x, y: pos.hualian.y+340, name: '富源', stationClass: 4},
                        "tra_1616": {x: pos.hualian.x, y: pos.hualian.y+370, name: '瑞穗', stationClass: 4},
                        "tra_1617": {x: pos.hualian.x, y: pos.hualian.y+400, name: '三民', stationClass: 4},
                        "tra_1619": {x: pos.hualian.x, y: pos.hualian.y+430, name: '玉里', stationClass: 4},
                        "tra_1621": {x: pos.hualian.x, y: pos.hualian.y+460, name: '東里', stationClass: 4},
                        "tra_1622": {x: pos.hualian.x, y: pos.hualian.y+490, name: '東竹', stationClass: 4},
                        "tra_1623": {x: pos.hualian.x, y: pos.hualian.y+520, name: '富里', stationClass: 4},
                        "tra_1624": {x: pos.taidong.x, y: pos.taidong.y-210, name: '池上', stationClass: 4},
                        "tra_1625": {x: pos.taidong.x, y: pos.taidong.y-180, name: '海端', stationClass: 4},
                        "tra_1626": {x: pos.taidong.x, y: pos.taidong.y-150, name: '關山', stationClass: 4},
                        "tra_1628": {x: pos.taidong.x, y: pos.taidong.y-120, name: '瑞和', stationClass: 4},
                        "tra_1629": {x: pos.taidong.x, y: pos.taidong.y-90, name: '瑞源', stationClass: 4},
                        "tra_1630": {x: pos.taidong.x, y: pos.taidong.y-60, name: '鹿野', stationClass: 4},
                        "tra_1631": {x: pos.taidong.x, y: pos.taidong.y-30, name: '山里', stationClass: 4},
                        "tra_1632": {x: pos.taidong.x, y: pos.taidong.y, name: '台東', stationClass: 2}
                    }
                }, {
                    id: "tra_pingxu",
                    name: "[台鐵]平溪線",
                    color: "#003030",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_1908', 
                        ox: -53, 
                        oy: 21
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_2003'},
                        {type: 'station', id: 'tra_6103'},
                        {type: 'station', id: 'tra_1804'},
                        {type: 'move', id: 'tra_1806'},
                        {type: 'station', id: 'tra_1903'},
                        {type: 'station', id: 'tra_1908'}
                    ],
                    station: {
                        "tra_2003": {x: pos.badu.x+230, y: pos.badu.y-80, name: '八斗子', stationClass: 4 },
                        "tra_6103": {x: pos.badu.x+180, y: pos.badu.y-80, name: '海科館', stationClass: 4 },
                        "tra_1804": {x: pos.badu.x+180, y: pos.badu.y, name: '瑞芳', stationClass: 3, noDraw: true},
                        "tra_1805": {x: pos.badu.x+240, y: pos.badu.y+30, name: '猴硐', stationClass: 4, noDraw: true },
                        "tra_1806": {x: pos.badu.x+240, y: pos.badu.y+60, name: '三貂嶺', stationClass: 4, noDraw: true },
                        "tra_1903": {x: pos.badu.x+180, y: pos.badu.y+60, name: '大華', stationClass: 4 },
                        "tra_1904": {x: pos.badu.x+180, y: pos.badu.y+90, name: '十分', stationClass: 4 },
                        "tra_1905": {x: pos.badu.x+180, y: pos.badu.y+120, name: '望古', stationClass: 4 },
                        "tra_1906": {x: pos.badu.x+180, y: pos.badu.y+150, name: '嶺腳', stationClass: 4 },
                        "tra_1907": {x: pos.badu.x+180, y: pos.badu.y+180, name: '平溪', stationClass: 4 },
                        "tra_1908": {x: pos.badu.x+180, y: pos.badu.y+210, name: '菁桐', stationClass: 4 }
                    }
                }, {
                    id: "tra_liujia",
                    name: "[台鐵]內灣／六家線",
                    color: "#403090",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_2208', 
                        ox: -60, 
                        oy: 22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_1025'},
                        {type: 'turn', id: 'tra_1025', ox: 14, oy: 0},
                        {type: 'turn', id: 'tra_1024', ox: 14, oy: 0},
                        //{type: 'station', id: 'tra_1024'},
                        {type: 'station', id: 'tra_2203'},
                        {type: 'station', id: 'tra_2214'},
                        {type: 'move', id: 'tra_2203'},
                        {type: 'station', id: 'tra_2210'}
                    ],
                    station: {
                        "tra_1025": {x: pos.hsinchu.x, y: pos.hsinchu.y, name: '新竹', stationClass: 1, noDraw: true},
                        "tra_1024": {x: pos.hsinchu.x, y: pos.hsinchu.y-30, name: '北新竹', stationClass: 4, noDraw: true},
                        "tra_2212": {x: pos.hsinchu.x+47, y: pos.hsinchu.y-30, name: '千甲', stationClass: 4 },
                        "tra_2213": {x: pos.hsinchu.x+90, y: pos.hsinchu.y-30, name: '新莊', stationClass: 4 },
                        "tra_2203": {x: pos.hsinchu.x+140, y: pos.hsinchu.y-30, name: '竹中', stationClass: 3 },
                        "tra_2214": {x: pos.hsinchu.x+140, y: pos.hsinchu.y-60, name: '六家', stationClass: 3, company: true},
                        "tra_2204": {x: pos.hsinchu.x+260, y: pos.hsinchu.y-30, name: '上員', stationClass: 4 },
                        "tra_2211": {x: pos.hsinchu.x+300, y: pos.hsinchu.y-30, name: '榮華', stationClass: 4 },
                        "tra_2205": {x: pos.hsinchu.x+340, y: pos.hsinchu.y-30, name: '竹東', stationClass: 4 },
                        "tra_2206": {x: pos.hsinchu.x+380, y: pos.hsinchu.y-30, name: '橫山', stationClass: 4 },
                        "tra_2207": {x: pos.hsinchu.x+420, y: pos.hsinchu.y-30, name: '九讚頭', stationClass: 4 },
                        "tra_2208": {x: pos.hsinchu.x+460, y: pos.hsinchu.y-30, name: '合興', stationClass: 4 },
                        "tra_2209": {x: pos.hsinchu.x+500, y: pos.hsinchu.y-30, name: '富貴', stationClass: 4 },
                        "tra_2210": {x: pos.hsinchu.x+540, y: pos.hsinchu.y-30, name: '內灣', stationClass: 3}
                    }
                }, {
                    id: "tra_shalun",
                    name: "[台鐵]沙崙線",
                    color: "#124060",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tra_5101', 
                        ox: -53, 
                        oy: 21
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'tra_1230'},
                        {type: 'station', id: 'tra_5102'}
                    ],
                    station: {
                        "tra_1230": {x: pos.tainan.x, y: pos.tainan.y+76, name: '中洲', stationClass: 3, noDraw: true},
                        "tra_5101": {x: pos.tainan.x+110, y: pos.tainan.y+76, name: '長榮大學', stationClass: 4 },
                        "tra_5102": {x: pos.tainan.x+188, y: pos.tainan.y+76, name: '沙崙', stationClass: 3 }
                    }
                }
            ],
            thsr: [
                {
                    id: "thsr_1",
                    name: "台灣高鐵",
                    color: "#ef5210",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'thsr_03', 
                        ox: -235, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'thsr_01'},
                        {type: 'turn', id: 'thsr_02', ox: 260, oy: -23},
                        {type: 'turn', id: 'thsr_02', ox: 160, oy: 0},
                        {type: 'station', id: 'thsr_02'},
                        {type: 'turn', id: 'thsr_02', ox: -40, oy: 0},
                        {type: 'turn', id: 'thsr_02', ox: -130, oy: 90},
                        {type: 'station', id: 'thsr_03'},
                        {type: 'turn', id: 'thsr_04', ox: 0, oy: -587},//{type: 'turn', id: 'thsr_04', ox: 40, oy: 0},
                        {type: 'station', id: 'thsr_04'},
                        {type: 'turn', id: 'thsr_04', ox: 0, oy: 30},
                        {type: 'turn', id: 'thsr_05', ox: 0, oy: -90},
                        {type: 'station', id: 'thsr_05'},
                        {type: 'station', id: 'thsr_07'},
                        {type: 'turn', id: 'thsr_08', ox: -240, oy: -210},
                        {type: 'turn', id: 'thsr_08', ox: -240, oy: -130},
                        {type: 'station', id: 'thsr_08'},
                        {type: 'turn', id: 'thsr_09', ox: 210, oy: 3},
                        {type: 'station', id: 'thsr_09'},
                        {type: 'station', id: 'thsr_10'},
                        {type: 'station', id: 'thsr_11'},
                        {type: 'turn', id: 'thsr_11', ox: 0, oy: 230},
                        {type: 'station', id: 'thsr_12'},
                        {type: 'station', id: 'thsr_13'}
                    ],
                    station: {
                        "thsr_01": {x: 550, y: 5, name: '南港', stationClass: 3, company: true, noClick: true },
                        "thsr_02": {x: 0, y: 28, name: '臺北', stationClass: 0, company: true, noClick: true},
                        "thsr_03": {x: -300, y: 118, name: '板橋', stationClass: 1, company: true, noClick: true},
                        "thsr_04": {x: pos.tauoyuan.x-290, y: pos.tauoyuan.y+175, name: '桃園', stationClass: 3, company: true, noClick: true},
                        "thsr_05": {x: pos.hsinchu.x+218, y: pos.hsinchu.y-60, name: '新竹', stationClass: 3, company: true, noClick: true},
                        "thsr_07": {x: pos.hsinchu.x+115, y: pos.hsinchu.y+150, name: '苗栗', stationClass: 4, company: true, noClick: true},
                        "thsr_08": {x: pos.taichung.x-128, y: pos.taichung.y+180, name: '台中', stationClass: 3, company: true, noClick: true},
                        "thsr_09": {x: pos.changhua.x-128, y: pos.changhua.y+128, name: '彰化', stationClass: 4, company: true, noClick: true},
                        "thsr_10": {x: pos.chayi.x-200, y: pos.chayi.y-150, name: '雲林', stationClass: 4, company: true, noClick: true},
                        "thsr_11": {x: pos.chayi.x-200, y: pos.chayi.y, name: '嘉義', stationClass: 4, company: true, noClick: true},
                        "thsr_12": {x: pos.tainan.x+240, y: pos.tainan.y+75, name: '台南', stationClass: 4, company: true, noClick: true},
                        "thsr_13": {x: pos.kaohsiung.x+50, y: pos.kaohsiung.y-100, name: '左營', stationClass: 4, company: true, noClick: true}
                    }
                }
            ],
            trtc: [
                {
                    id: "trtc_5",
                    name: "[北捷]板南線(5)",
                    color: "#005eb8",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_097', 
                        ox: -30, 
                        oy: 23
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'trtc_031'},
                        {type: 'station', id: 'trtc_097'},
                        {type: 'station', id: 'trtc_096'},
                        {type: 'station', id: 'trtc_095'},
                        {type: 'station', id: 'trtc_094'},
                        {type: 'station', id: 'trtc_051'},
                        {type: 'turn', id: 'trtc_051', ox: -50, oy: 0},
                        {type: 'station', id: 'trtc_086'},
                        {type: 'station', id: 'trtc_085'},
                        {type: 'station', id: 'trtc_084'},
                        {type: 'station', id: 'trtc_083'},
                        {type: 'station', id: 'trtc_082'},
                        {type: 'station', id: 'trtc_081'},
                        {type: 'station', id: 'trtc_076'}
                    ],
                    station: {
                        "trtc_031": {x: 550, y: -60, name: '南港展覽館', stationClass: 3 },
                        "trtc_097": {x: 550, y: 30, name: '南港', stationClass: 3, company: true },
                        "trtc_096": {x: 492, y: 30, name: '昆陽', stationClass: 4 },
                        "trtc_095": {x: 450, y: 30, name: '後山埤', stationClass: 4 },
                        "trtc_094": {x: 450, y: 60, name: '永春', stationClass: 4 },
                        "trtc_093": {x: 407, y: 60, name: '市政府', stationClass: 3 },
                        "trtc_092": {x: 346, y: 60, name: '國父紀念館', stationClass: 4 },
                        "trtc_091": {x: 282, y: 60, name: '忠孝敦化', stationClass: 4 },
                        "trtc_010": {x: 220, y: 60, name: '忠孝復興', stationClass: 3 },
                        "trtc_089": {x: 150, y: 60, name: '忠孝新生', stationClass: 3 },
                        "trtc_088": {x: 90, y: 60, name: '善導寺', stationClass: 4 },
                        "trtc_051": {x: 10, y: 60, name: '台北車站', stationClass: 0, company: true },
                        "trtc_086": {x: -80, y: 100, name: '西門', stationClass: 3 },
                        "trtc_085": {x: -120, y: 140, name: '龍山寺', stationClass: 4 },
                        "trtc_084": {x: -175, y: 145, name: '江子翠', stationClass: 4 },
                        "trtc_083": {x: -220, y: 145, name: '新埔', stationClass: 4 },
                        "trtc_082": {x: -300, y: 145, name: '板橋', stationClass: 1, company: true },
                        "trtc_081": {x: -300, y: 200, name: '府中', stationClass: 4 },
                        "trtc_080": {x: -300, y: 225, name: '亞東醫院', stationClass: 4 },
                        "trtc_079": {x: -300, y: 250, name: '海山', stationClass: 4 },
                        "trtc_078": {x: -300, y: 275, name: '土城', stationClass: 4 },
                        "trtc_077": {x: -300, y: 300, name: '永寧', stationClass: 4 },
                        "trtc_076": {x: -300, y: 330, name: '頂埔', stationClass: 4 }
                    }
                }, {
                    id: "trtc_2",
                    name: "[北捷]淡水信義線(2)",
                    color: "#cb2c30",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_099', 
                        ox: 18, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'trtc_071'},
                        {type: 'station', id: 'trtc_068'},
                        {type: 'station', id: 'trtc_067'},
                        {type: 'station', id: 'trtc_066'},
                        {type: 'station', id: 'trtc_064'},
                        {type: 'station', id: 'trtc_042'},
                        {type: 'station', id: 'trtc_134'},
                        {type: 'station', id: 'trtc_103'},
                        {type: 'station', id: 'trtc_099'},
                        {type: 'move', id: 'trtc_064'},
                        {type: 'station', id: 'trtc_065'}
                    ],
                    station: {
                    //"trtc_050","trtc_042","trtc_134","trtc_103","trtc_011","trtc_101","trtc_100","trtc_099"
                        "trtc_071": {x: -160, y: -385, name: '淡水', stationClass: 3 },
                        "trtc_070": {x: -160, y: -360, name: '紅樹林', stationClass: 4 },
                        "trtc_069": {x: -160, y: -335, name: '竹圍', stationClass: 4 },
                        "trtc_068": {x: -160, y: -310, name: '關渡', stationClass: 4 },
                        "trtc_067": {x: -110, y: -325, name: '忠義', stationClass: 4 },
                        "trtc_066": {x: -50, y: -335, name: '復興崗', stationClass: 4 },
                        "trtc_065": {x: 70, y: -335, name: '新北投', stationClass: 3, noClick: true},
                        "trtc_064": {x: 10, y: -332, name: '北投', stationClass: 3 },
                        "trtc_063": {x: 10, y: -309, name: '奇岩', stationClass: 4 },
                        "trtc_062": {x: 10, y: -285, name: '唭哩岸', stationClass: 4 },
                        "trtc_061": {x: 10, y: -263, name: '石牌', stationClass: 4 },
                        "trtc_060": {x: 10, y: -239, name: '明德', stationClass: 4 },
                        "trtc_059": {x: 10, y: -217, name: '芝山', stationClass: 4 },
                        "trtc_058": {x: 10, y: -189, name: '士林', stationClass: 4 },
                        "trtc_057": {x: 10, y: -165, name: '劍潭', stationClass: 4 },
                        "trtc_056": {x: 10, y: -133, name: '圓山', stationClass: 4 },
                        "trtc_055": {x: 10, y: -107, name: '民權西路', stationClass: 3 },
                        "trtc_054": {x: 10, y: -80, name: '雙連', stationClass: 4 },
                        "trtc_053": {x: 10, y: -55, name: '中山', stationClass: 3 },
                        "trtc_051": {x: 10, y: 60, name: '台北車站', stationClass: 0, company: true, noDraw: true},
                        "trtc_050": {x: 10, y: 100, name: '台大醫院', stationClass: 4 },
                        "trtc_042": {x: 10, y: 170, name: '中正紀念堂', stationClass: 3 },
                        "trtc_134": {x: 90, y: 150, name: '東門', stationClass: 3 },
                        "trtc_103": {x: 155, y: 150, name: '大安森林公園', stationClass: 4 },
                        "trtc_011": {x: 220, y: 150, name: '大安', stationClass: 3 },
                        "trtc_101": {x: 290, y: 150, name: '信義安和', stationClass: 4 },
                        "trtc_100": {x: 370, y: 150, name: '台北101/世貿', stationClass: 4 },
                        "trtc_099": {x: 435, y: 150, name: '象山', stationClass: 3 }
                    }
                }, {
                    id: "trtc_3",
                    name: "[北捷]松山新店線(3)",
                    color: "#007749",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_033', 
                        ox: -20, 
                        oy: 22
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'trtc_111'},
                        {type: 'station', id: 'trtc_110'},
                        {type: 'station', id: 'trtc_053'},
                        {type: 'station', id: 'trtc_105'},
                        {type: 'station', id: 'trtc_086'},
                        {type: 'station', id: 'trtc_043'},
                        {type: 'station', id: 'trtc_042'},
                        {type: 'station', id: 'trtc_041'},
                        {type: 'station', id: 'trtc_040'},
                        {type: 'station', id: 'trtc_037'},
                        {type: 'station', id: 'trtc_033'},
                        {type: 'move', id: 'trtc_035'},
                        {type: 'station', id: 'trtc_032'}
                    ],
                    station: {
                        "trtc_111": {x: 450, y: -47, name: '松山', stationClass: 2, company: true},
                        "trtc_110": {x: 370, y: -55, name: '南京三民', stationClass: 4},
                        "trtc_109": {x: 300, y: -55, name: '台北小巨蛋', stationClass: 4},
                        "trtc_009": {x: 220, y: -55, name: '南京復興', stationClass: 3},
                        "trtc_132": {x: 150, y: -55, name: '松江南京', stationClass: 3},
                        "trtc_053": {x: 10, y: -55, name: '中山', stationClass: 3, noDraw: true},
                        "trtc_105": {x: -80, y: -25, name: '北門', stationClass: 4 },
                        "trtc_086": {x: -80, y: 100, name: '西門', stationClass: 3, noDraw: true },
                        "trtc_043": {x: -51, y: 130, name: '小南門', stationClass: 4 },
                        "trtc_042": {x: 10, y: 170, name: '中正紀念堂', stationClass: 3, noDraw: true},
                        "trtc_041": {x: 50, y: 220, name: '古亭', stationClass: 3},
                        "trtc_040": {x: 80, y: 250, name: '台電大樓', stationClass: 4 },
                        "trtc_039": {x: 100, y: 280, name: '公館', stationClass: 4 },
                        "trtc_038": {x: 120, y: 310, name: '萬隆', stationClass: 4 },
                        "trtc_037": {x: 140, y: 335, name: '景美', stationClass: 4 },
                        "trtc_036": {x: 140, y: 370, name: '大坪林', stationClass: 4 },
                        "trtc_035": {x: 140, y: 400, name: '七張', stationClass: 4 },
                        "trtc_034": {x: 140, y: 430, name: '新店區公所', stationClass: 4 },
                        "trtc_033": {x: 140, y: 460, name: '新店', stationClass: 3 },
                        "trtc_032": {x: 80, y: 400, name: '小碧潭', stationClass: 4, noClick: true}
                    }
                }, {
                    id: "trtc_4",
                    name: "[北捷]中和新蘆線(4)",
                    color: "#ffa300",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_048', 
                        ox: -20, 
                        oy: 22
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'trtc_048'},
                        {type: 'station', id: 'trtc_045'},
                        {type: 'station', id: 'trtc_041'},
                        {type: 'station', id: 'trtc_134'},
                        {type: 'station', id: 'trtc_089'},
                        {type: 'station', id: 'trtc_132'},
                        {type: 'station', id: 'trtc_131'},
                        {type: 'station', id: 'trtc_130'},
                        {type: 'station', id: 'trtc_128'},
                        {type: 'station', id: 'trtc_127'},
                        {type: 'station', id: 'trtc_125'},
                        {type: 'station', id: 'trtc_124'},
                        {type: 'station', id: 'trtc_123'},
                        {type: 'station', id: 'trtc_179'},
                        {type: 'move', id: 'trtc_128'},
                        {type: 'station', id: 'trtc_178'},
                        {type: 'station', id: 'trtc_176'},
                        {type: 'station', id: 'trtc_174'}
                    ],
                    station: {
                        "trtc_048": {x: -120, y: 370, name: '南勢角', stationClass: 3},
                        "trtc_047": {x: -90, y: 340, name: '景安', stationClass: 3},
                        "trtc_046": {x: -60, y: 310, name: '永安市場', stationClass: 4},
                        "trtc_045": {x: -20, y: 260, name: '頂溪', stationClass: 4},
                        "trtc_041": {x: 50, y: 220, name: '古亭', stationClass: 3, noDraw: true},
                        "trtc_134": {x: 90, y: 150, name: '東門', stationClass: 3, noDraw: true},
                        "trtc_089": {x: 150, y: 60, name: '忠孝新生', stationClass: 3, noDraw: true},
                        "trtc_132": {x: 150, y: -55, name: '松江南京', stationClass: 3, noDraw: true},
                        "trtc_131": {x: 130, y: -80, name: '行天宮', stationClass: 4},
                        "trtc_130": {x: 90, y: -107, name: '中山國小', stationClass: 4},
                        "trtc_055": {x: 10, y: -107, name: '民權西路', stationClass: 3, noDraw: true},
                        "trtc_128": {x: -60, y: -107, name: '大橋頭', stationClass: 4},
                        "trtc_127": {x: -130, y: -80, name: '台北橋', stationClass: 4},
                        "trtc_126": {x: -140, y: -55, name: '菜寮', stationClass: 4},
                        "trtc_125": {x: -155, y: -30, name: '三重', stationClass: 3, company: true},
                        "trtc_124": {x: -240, y: -20, name: '先嗇宮', stationClass: 4},
                        "trtc_123": {x: -290, y: -20, name: '頭前庄', stationClass: 3},
                        "trtc_122": {x: -350, y: -20, name: '新莊', stationClass: 4},
                        "trtc_121": {x: -400, y: -20, name: '輔大', stationClass: 4},
                        "trtc_180": {x: -440, y: -20, name: '丹鳳', stationClass: 4},
                        "trtc_179": {x: -480, y: -20, name: '迴龍', stationClass: 3},
                        "trtc_178": {x: -140, y: -120, name: '三重國小', stationClass: 4},
                        "trtc_177": {x: -175, y: -150, name: '三和國中', stationClass: 4},
                        "trtc_176": {x: -215, y: -180, name: '徐匯中學', stationClass: 4},
                        "trtc_175": {x: -245, y: -210, name: '三民高中', stationClass: 4},
                        "trtc_174": {x: -280, y: -240, name: '蘆洲', stationClass: 3}
                    }
                }, {
                    id: "trtc_1",
                    name: "[北捷]文湖線(1)",
                    color: "#9e652e",
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_019', 
                        ox: -20, 
                        oy: 22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'trtc_019'},
                        {type: 'station', id: 'trtc_018'},
                        {type: 'station', id: 'trtc_017'},
                        {type: 'station', id: 'trtc_014'},
                        {type: 'station', id: 'trtc_013'},
                        {type: 'turn', id: 'trtc_013', ox: -60, oy: 0},
                        {type: 'station', id: 'trtc_012'},
                        {type: 'station', id: 'trtc_021'},
                        {type: 'station', id: 'trtc_022'},
                        {type: 'station', id: 'trtc_026'},
                        {type: 'station', id: 'trtc_027'},
                        {type: 'station', id: 'trtc_028'},
                        {type: 'station', id: 'trtc_029'},
                        {type: 'station', id: 'trtc_031'}
                    ],
                    station: {
                        "trtc_019": {x: 400, y: 420, name: '動物園', stationClass: 3, noClick: true},
                        "trtc_018": {x: 360, y: 380, name: '木柵', stationClass: 4, noClick: true},
                        "trtc_017": {x: 340, y: 350, name: '萬芳社區', stationClass: 4, noClick: true},
                        "trtc_016": {x: 340, y: 320, name: '萬芳醫院', stationClass: 4, noClick: true},
                        "trtc_015": {x: 340, y: 290, name: '辛亥', stationClass: 4, noClick: true},
                        "trtc_014": {x: 340, y: 260, name: '麟光', stationClass: 4, noClick: true},
                        "trtc_013": {x: 280, y: 230, name: '六張犁', stationClass: 4, noClick: true},
                        "trtc_012": {x: 220, y: 200, name: '科技大樓', stationClass: 4, noClick: true},
                        "trtc_011": {x: 220, y: 150, name: '大安', stationClass: 3, noDraw: true},
                        "trtc_010": {x: 220, y: 60, name: '忠孝復興', stationClass: 3, noDraw: true},
                        "trtc_009": {x: 220, y: -55, name: '南京復興', stationClass: 3, noDraw: true},
                        "trtc_008": {x: 220, y: -105, name: '中山國中', stationClass: 4, noClick: true},
                        "trtc_007": {x: 220, y: -130, name: '松山機場', stationClass: 4, noClick: true},
                        "trtc_021": {x: 220, y: -185, name: '大直', stationClass: 4, noClick: true},
                        "trtc_022": {x: 300, y: -235, name: '劍南路', stationClass: 4, noClick: true},
                        "trtc_023": {x: 350, y: -235, name: '西湖', stationClass: 4, noClick: true},
                        "trtc_024": {x: 400, y: -235, name: '港墘', stationClass: 4, noClick: true},
                        "trtc_025": {x: 450, y: -235, name: '文德', stationClass: 4, noClick: true},
                        "trtc_026": {x: 500, y: -235, name: '內湖', stationClass: 4, noClick: true},
                        "trtc_027": {x: 520, y: -205, name: '大湖公園', stationClass: 4, noClick: true},
                        "trtc_028": {x: 540, y: -175, name: '葫洲', stationClass: 4, noClick: true},
                        "trtc_029": {x: 550, y: -150, name: '東湖', stationClass: 4, noClick: true},
                        "trtc_030": {x: 550, y: -85, name: '南港軟體園區', stationClass: 4, noClick: true},
                        "trtc_031": {x: 550, y: -60, name: '南港展覽館', stationClass: 3, noDraw: true}
                    }
                }, {
                    id: "trtc_6",
                    name: "[北捷]環狀線(6)",
                    color: "#fedb00",
                    isPlanLine: true,
                    nameTag: {
                        fontColor: '#425',
                        id:'trtc_y16', 
                        ox: -80, 
                        oy: -22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'trtc_019'},
                        {type: 'station', id: 'trtc_y2'},
                        {type: 'station', id: 'trtc_y3'},
                        {type: 'station', id: 'trtc_y4'},
                        {type: 'station', id: 'trtc_y7'},
                        {type: 'station', id: 'trtc_047'},
                        {type: 'station', id: 'trtc_y11'},
                        {type: 'station', id: 'trtc_y12'},
                        {type: 'station', id: 'trtc_y14'},
                        {type: 'station', id: 'trtc_y15'},
                        {type: 'station', id: 'trtc_y16'},
                        {type: 'station', id: 'trtc_123'},
                        {type: 'station', id: 'trtc_y18'},
                        {type: 'station', id: 'trtc_y19'},
                        {type: 'station', id: 'trtc_y20'},
                        {type: 'station', id: 'trtc_y22'},
                        {type: 'station', id: 'trtc_y23'},
                        {type: 'station', id: 'trtc_y24'},
                        {type: 'station', id: 'trtc_y25'},
                        {type: 'station', id: 'trtc_y27'},
                        {type: 'station', id: 'trtc_y28'},
                        {type: 'station', id: 'trtc_022'},
                        {type: 'station', id: 'trtc_y31'},
                        {type: 'station', id: 'trtc_y32'},
                        {type: 'station', id: 'trtc_y34'},
                        {type: 'station', id: 'trtc_y35'},
                        {type: 'station', id: 'trtc_y36'},
                        {type: 'station', id: 'trtc_y38'},
                        {type: 'station', id: 'trtc_013'},
                        {type: 'station', id: 'trtc_039'},
                        {type: 'station', id: 'trtc_y42'},
                        {type: 'station', id: 'trtc_y8'}
                    ],
                    station: {
                        "trtc_019": {x: 400, y: 420, name: '動物園', stationClass: 3, noDraw: true},
                        "trtc_y1a": {x: 355, y: 420, name: '政大', stationClass: 4, noClick: true},
                        "trtc_y2": {x: 300, y: 420, name: '文山區公所', stationClass: 4, noClick: true},
                        "trtc_y3": {x: 300, y: 395, name: '馬明潭', stationClass: 4, noClick: true},
                        "trtc_y4": {x: 270, y: 370, name: '考試院', stationClass: 4, noClick: true},
                        "trtc_y5": {x: 200, y: 370, name: '寶斗厝', stationClass: 4, noClick: true},
                        "trtc_036": {x: 140, y: 370, name: '大坪林', stationClass: 4, noDraw: true},
                        "trtc_y7": {x: 80, y: 370, name: '十四張', stationClass: 4, noClick: true},
                        "trtc_y8": {x: 10, y: 360, name: '秀朗橋', stationClass: 4, noClick: true},
                        "trtc_y9": {x: -40, y: 350, name: '景平', stationClass: 4, noClick: true},
                        "trtc_047": {x: -90, y: 340, name: '景安', stationClass: 3, noDraw: true},
                        "trtc_y11": {x: -130, y: 270, name: '中和', stationClass: 3, noClick: true},
                        "trtc_y12": {x: -150, y: 240, name: '橋和', stationClass: 4, noClick: true},
                        "trtc_y13": {x: -180, y: 210, name: '中原', stationClass: 4, noClick: true},
                        "trtc_y14": {x: -210, y: 180, name: '板新', stationClass: 4, noClick: true},
                        "trtc_y15": {x: -280, y: 172, name: '板橋 (環狀)', stationClass: 1, noClick: true},
                        "trtc_y16": {x: -210, y: 70, name: '新埔民生', stationClass: 4, noClick: true},
                        "trtc_123": {x: -290, y: -20, name: '頭前庄', stationClass: 3, noDraw: true},
                        "trtc_y18": {x: -290, y: -50, name: '幸福', stationClass: 4, noClick: true},
                        "trtc_y19": {x: -270, y: -106, name: '新北產業園區', stationClass: 1, company: true, noClick: true},
                        "trtc_y19a": {x: -270, y: -132, name: '工商展覽中心', stationClass: 4, noClick: true},
                        "trtc_y19b": {x: -270, y: -156, name: '更寮', stationClass: 4, noClick: true},
                        "trtc_y20": {x: -270, y: -180, name: '中路', stationClass: 4, noClick: true},
                        "trtc_176": {x: -215, y: -180, name: '徐匯中學', stationClass: 4, noDraw: true},
                        "trtc_y22": {x: -160, y: -180, name: '分子尾', stationClass: 4, noClick: true},
                        "trtc_y23": {x: -160, y: -210, name: '重陽橋', stationClass: 4, noClick: true},
                        "trtc_y24": {x: -108, y: -210, name: '社子', stationClass: 4, noClick: true},
                        "trtc_y25": {x: -42, y: -189, name: '士林區公所', stationClass: 4, noClick: true},
                        "trtc_058": {x: 10, y: -189, name: '士林', stationClass: 4, noDraw: true},
                        "trtc_y27": {x: 130, y: -189, name: '林子口', stationClass: 4, noClick: true},
                        "trtc_y28": {x: 200, y: -235, name: '故宮', stationClass: 4, noClick: true},
                        "trtc_022": {x: 300, y: -235, name: '劍南路', stationClass: 4, noDraw: true, noClick: true},
                        "trtc_y30": {x: 330, y: -210, name: '下塔悠', stationClass: 4, noClick: true},
                        "trtc_y31": {x: 360, y: -185, name: '內科', stationClass: 4, noClick: true},
                        "trtc_y32": {x: 400, y: -185, name: '瑞光', stationClass: 4, noClick: true},
                        "trtc_y33": {x: 400, y: -160, name: '下灣仔', stationClass: 4, noClick: true},
                        "trtc_y34": {x: 400, y: -135, name: '舊宗', stationClass: 3, noClick: true},
                        "trtc_y35": {x: 380, y: -77, name: '西松', stationClass: 4, noClick: true},
                        "trtc_y36": {x: 350, y: 30, name: '中崙', stationClass: 4, noClick: true},
                        "trtc_092": {x: 349, y: 60, name: '國父紀念館', stationClass: 4, noDraw: true},
                        "trtc_y38": {x: 330, y: 128, name: '三張犁', stationClass: 4, noClick: true},
                        "trtc_013": {x: 280, y: 230, name: '六張犁', stationClass: 4, noDraw: true, noClick: true},
                        "trtc_y40": {x: 190, y: 255, name: '龍安', stationClass: 4, noClick: true},
                        "trtc_039": {x: 100, y: 280, name: '公館', stationClass: 4, noDraw: true},
                        "trtc_y42": {x: 50, y: 300, name: '福和', stationClass: 4, noClick: true},
                        "trtc_y43": {x: 30, y: 330, name: '得和', stationClass: 4, noClick: true}
                    }
                }, {
                //萬大線 a1d884 民汐線 25aae1 三鶯線 79bce8
                    id: "trtc_7",
                    name: "[北捷]萬大線(7)",
                    color: "#a1d884",
                    isPlanLine: true,
                    nameTag: {
                        fontColor: '#425',
                        id:'trtc_lg19', 
                        ox: 0, 
                        oy: -22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'trtc_042'},
                        {type: 'station', id: 'trtc_lg02'},
                        {type: 'station', id: 'trtc_lg03'},
                        {type: 'station', id: 'trtc_lg05'},
                        {type: 'station', id: 'trtc_y11'},
                        {type: 'station', id: 'trtc_lg07'},
                        {type: 'station', id: 'trtc_lg08'},
                        {type: 'station', id: 'trtc_lg09'},
                        {type: 'station', id: 'trtc_078'},
                        {type: 'station', id: 'trtc_lg12'},
                        {type: 'station', id: 'trtc_lg13'},
                        {type: 'station', id: 'trtc_lg14'},
                        {type: 'station', id: 'trtc_lg15'},
                        {type: 'station', id: 'trtc_lg16'},
                        {type: 'station', id: 'trtc_lg17'},
                        {type: 'station', id: 'trtc_lg18'},
                        {type: 'station', id: 'trtc_lg19'},
                        {type: 'station', id: 'trtc_lg20'},
                        {type: 'station', id: 'trtc_179'}
                    ],
                    station: {
                        "trtc_042": {x: 10, y: 170, name: '中正紀念堂', stationClass: 3, noDraw: true},
                        "trtc_lg02": {x: -20, y: 197, name: '植物園', stationClass: 4, noClick: true},
                        "trtc_lg03": {x: -70, y: 197, name: '南機場', stationClass: 4, noClick: true},
                        "trtc_lg04": {x: -70, y: 220, name: '東園', stationClass: 4, noClick: true},
                        "trtc_lg05": {x: -75, y: 260, name: '永平國小', stationClass: 4, noClick: true},
                        "trtc_y11": {x: -130, y: 270, name: '中和', stationClass: 3, noDraw: true, noClick: true},
                        "trtc_lg07": {x: -150, y: 300, name: '錦和', stationClass: 4, noClick: true},
                        "trtc_lg08": {x: -195, y: 300, name: '四十張', stationClass: 4, noClick: true},
                        "trtc_lg09": {x: -195, y: 275, name: '廷寮', stationClass: 4, noClick: true},
                        "trtc_lg10": {x: -250, y: 275, name: '中正國中', stationClass: 4, noClick: true},
                        "trtc_078": {x: -300, y: 275, name: '土城', stationClass: 4, noDraw: true},
                        "trtc_lg12": {x: -340, y: 275, name: '埤塘', stationClass: 4, noClick: true},
                        "trtc_lg13": {x: -350, y: 250, name: '城林橋', stationClass: 4, noClick: true},
                        "trtc_lg14": {x: -415, y: 200, name: '溪洲', stationClass: 4, noClick: true},
                        "trtc_lg15": {x: -415, y: 230, name: '彭福', stationClass: 4, noClick: true},
                        "trtc_lg16": {x: -480, y: 230, name: '備內', stationClass: 4, noClick: true},
                        "trtc_lg17": {x: -480, y: 170, name: '樹林', stationClass: 4, noClick: true},
                        "trtc_lg18": {x: -450, y: 140, name: '潭底', stationClass: 4, noClick: true},
                        "trtc_lg19": {x: -450, y: 60, name: '台北監理所', stationClass: 4, noClick: true},
                        "trtc_lg20": {x: -480, y: 20, name: '三多', stationClass: 4, noClick: true},
                        "trtc_179": {x: -480, y: -20, name: '迴龍', stationClass: 3, noDraw: true}
                    }
                }, {
                    id: "trtc_sanying",
                    name: "[北捷]三鶯線(?)",
                    color: "#79bce8",
                    isPlanLine: true,
                    nameTag: {
                        fontColor: '#425',
                        id:'trtc_lb04', 
                        ox: -40, 
                        oy: 22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'trtc_076'},
                        {type: 'station', id: 'trtc_lb02'},
                        {type: 'station', id: 'trtc_lb04'},
                        {type: 'station', id: 'trtc_lb05'},
                        {type: 'station', id: 'trtc_lb07'},
                        {type: 'station', id: 'trtc_lb08'},
                        {type: 'station', id: 'trtc_lb09'},
                        {type: 'station', id: 'trtc_lb12'}
                    ],
                    station: {
                        "trtc_076": {x: -300, y: 330, name: '頂埔', stationClass: 4, noDraw: true},
                        "trtc_lb02": {x: -300, y: 355, name: '媽祖田', stationClass: 4, noClick: true},
                        "trtc_lb03": {x: -300, y: 380, name: '挖子', stationClass: 4, noClick: true},
                        "trtc_lb04": {x: -300, y: 405, name: '橫溪', stationClass: 4, noClick: true},
                        "trtc_lb05": {x: -360, y: 405, name: '麥仔園', stationClass: 4, noClick: true},
                        "trtc_lb06": {x: -360, y: 380, name: '三峽', stationClass: 4, noClick: true},
                        "trtc_lb07": {x: -360, y: 355, name: '臺北大學', stationClass: 4, noClick: true},
                        "trtc_lb08": {x: -480, y: 335, name: '鶯歌', stationClass: 3, company: true, noClick: true},
                        "trtc_lb09": {x: -480, y: 360, name: '陶瓷老街', stationClass: 4, noClick: true},
                        "trtc_lb10": {x: -480, y: 385, name: '獅子頭', stationClass: 4, noClick: true},
                        "trtc_lb11": {x: -480, y: 410, name: '德昌', stationClass: 4, noClick: true},
                        "trtc_lb12": {x: -480, y: 435, name: '鳳鳴國中', stationClass: 4, noClick: true}
                    }
                }, {
                    id: "trtc_minxi",
                    name: "[北捷]民汐線(?)",
                    color: "#25aae1",
                    isPlanLine: true,
                    nameTag: {
                        fontColor: '#FFF',
                        id:'trtc_sb15', 
                        ox: -30, 
                        oy: -22
                    },
                    dir: "0",
                    line: [
                        {type: 'station', id: 'trtc_sb01'},
                        {type: 'station', id: 'trtc_sb05'},
                        {type: 'station', id: 'trtc_y34'},
                        {type: 'station', id: 'trtc_sb08'},
                        {type: 'station', id: 'trtc_sb09'},
                        {type: 'station', id: 'trtc_029'},
                        {type: 'station', id: 'trtc_sb11'},
                        {type: 'station', id: 'trtc_sb12'},
                        {type: 'station', id: 'trtc_sb13'},
                        {type: 'station', id: 'trtc_sb14'},
                        {type: 'station', id: 'trtc_sb15'},
                    ],
                    station: {
                        "trtc_sb01": {x: -40, y: -80, name: '大稻埕', stationClass: 4, noClick: true},
                        "trtc_054": {x: 10, y: -80, name: '雙連', stationClass: 4, noDraw: true},
                        "trtc_131": {x: 150, y: -80, name: '行天宮', stationClass: 4, noDraw: true},
                        "trtc_sb04": {x: 200, y: -80, name: '北大台北校區', stationClass: 4, noClick: true},
                        "trtc_sb05": {x: 280, y: -80, name: '東社', stationClass: 4, noClick: true},
                        "trtc_sb06": {x: 330, y: -110, name: '民生社區', stationClass: 4, noClick: true},
                        "trtc_y34": {x: 400, y: -135, name: '舊宗', stationClass: 3, noDraw: true, noClick: true},
                        "trtc_sb08": {x: 465, y: -160, name: '國防醫學中心', stationClass: 4, noClick: true},
                        "trtc_sb09": {x: 500, y: -135, name: '葫蘆洲', stationClass: 4, noClick: true},
                        "trtc_029": {x: 550, y: -150, name: '東湖', stationClass: 4, noDraw: true, noClick: true},
                        "trtc_sb11": {x: 590, y: -160, name: '草濫', stationClass: 4, noClick: true},
                        "trtc_sb12": {x: 590, y: -135, name: '社后', stationClass: 4, noClick: true},
                        "trtc_sb13": {x: 613, y: -45, name: '樟樹灣', stationClass: 4, noClick: true},
                        "trtc_sb14": {x: 708, y: -45, name: '汐科', stationClass: 4, company: true, noClick: true},
                        "trtc_sb15": {x: 708, y: -75, name: '汐止區公所', stationClass: 4, noClick: true}
                    }
                }
            ],
            tymetro: [
                {
                    id: "tymetro_1",
                    name: "[桃捷]機場線",
                    color: "#8e47ad",
                    isPlanLine: false,
                    nameTag: {
                        fontColor: '#FFF',
                        id:'tymetro_a07', 
                        ox: -20, 
                        oy: -20
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'tymetro_a01'},
                        {type: 'station', id: 'tymetro_a02'},
                        {type: 'station', id: 'tymetro_a03'},
                        {type: 'station', id: 'tymetro_a04'},
                        {type: 'station', id: 'tymetro_a05'},
                        {type: 'station', id: 'tymetro_a06'},
                        {type: 'station', id: 'tymetro_a07'},
                        {type: 'station', id: 'tymetro_a08'},
                        {type: 'station', id: 'tymetro_a09'},
                        {type: 'station', id: 'tymetro_a10'},
                        {type: 'station', id: 'tymetro_a11'},
                        {type: 'station', id: 'tymetro_a19'},
                        {type: 'station', id: 'tymetro_a21'},
                        {type: 'station', id: 'tymetro_a22'},
                        {type: 'station', id: 'tymetro_a23'}
                    ],
                    station: {
                        "tymetro_a01": {x: -10, y: -26, name: '臺北車站', stationClass: 1, company: true },
                        "tymetro_a02": {x: -150, y: -6, name: '三重', stationClass: 3, company: true},
                        "tymetro_a02a": {x: -220, y: -45, name: '二重', stationClass: 4, noClick: true},
                        "tymetro_a03": {x: -290, y: -80, name: '新北產業園區', stationClass: 1, company: true},
                        "tymetro_a04": {x: -350, y: -140, name: '新莊副都心', stationClass: 4},
                        "tymetro_a05": {x: -380, y: -110, name: '泰山', stationClass: 4},
                        "tymetro_a05a": {x: -410, y: -80, name: '輔大醫院', stationClass: 4, noClick: true},
                        "tymetro_a06": {x: -440, y: -50, name: '泰山貴和', stationClass: 4},
                        "tymetro_a07": {x: -550, y: -160, name: '體育大學', stationClass: 4},
                        "tymetro_a08": {x: -550, y: -110, name: '長庚醫院', stationClass: 3},
                        "tymetro_a09": {x: -550, y: -60, name: '林口', stationClass: 4},
                        "tymetro_a10": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y-120, name: '山鼻', stationClass: 4},
                        "tymetro_a11": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y-90, name: '坑口', stationClass: 3},
                        "tymetro_a12": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y-60, name: '機場第一航廈', stationClass: 3},
                        "tymetro_a13": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y-30, name: '機場第二航廈', stationClass: 3},
                        "tymetro_a14": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+0, name: '機場第三航廈', stationClass: 3, noClick: true},
                        "tymetro_a14a": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+30, name: '機場旅館', stationClass: 4},
                        "tymetro_a15": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+60, name: '大園', stationClass: 4},
                        "tymetro_a16": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+90, name: '橫山', stationClass: 4},
                        "tymetro_a17": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+120, name: '領航', stationClass: 4},
                        "tymetro_a18": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+150, name: '高鐵桃園站', stationClass: 2, company: true},
                        "tymetro_a19": {x: pos.tauoyuan.x-310, y: pos.tauoyuan.y+200, name: '桃園體育園區', stationClass: 3},
                        "tymetro_a20": {x: pos.tauoyuan.x-230, y: pos.tauoyuan.y+200, name: '興南', stationClass: 4},
                        "tymetro_a21": {x: pos.tauoyuan.x-190, y: pos.tauoyuan.y+200, name: '環北', stationClass: 4},
                        "tymetro_a22": {x: pos.tauoyuan.x-150, y: pos.tauoyuan.y+200, name: '老街溪', stationClass: 4, noClick: true},
                        "tymetro_a23": {x: pos.tauoyuan.x-85, y: pos.tauoyuan.y+200, name: '中壢', stationClass: 3, noClick: true, company: true}
                    }
                }
            ],
            crtc: [
                {
                    id: "crtc_1",
                    name: "[中捷]綠線",
                    color: "#008739",
                    isPlanLine: true,
                    nameTag: {
                        fontColor: '#FFF',
                        id:'crtc_g17', 
                        ox: -130, 
                        oy: 0
                    },
                    dir: "1",
                    line: [
                        {type: 'station', id: 'crtc_g01'},
                        {type: 'station', id: 'crtc_g03'},
                        {type: 'station', id: 'crtc_g04'},
                        {type: 'station', id: 'crtc_g05'},
                        {type: 'station', id: 'crtc_g06'},
                        {type: 'station', id: 'crtc_g08'},
                        {type: 'station', id: 'crtc_g09'},
                        {type: 'station', id: 'crtc_g10'},
                        {type: 'station', id: 'crtc_g11'},
                        {type: 'station', id: 'crtc_g13'},
                        {type: 'station', id: 'crtc_g16'},
                        {type: 'station', id: 'crtc_g17'}
                    ],
                    station: {
                        "crtc_g01": {x: pos.taichung.x+150, y: pos.taichung.y-115, name: '北屯機廠', stationClass: 4, noClick: true },
                        "crtc_g03": {x: pos.taichung.x+150, y: pos.taichung.y-85, name: '下舊社', stationClass: 4, noClick: true },
                        "crtc_g04": {x: pos.taichung.x+80, y: pos.taichung.y-85, name: '松竹', stationClass: 3, noClick: true, company: true},
                        "crtc_g05": {x: pos.taichung.x-64, y: pos.taichung.y-65, name: '二分埔', stationClass: 4, noClick: true },
                        "crtc_g06": {x: pos.taichung.x-120, y: pos.taichung.y-65, name: '文心崇德', stationClass: 4, noClick: true },
                        "crtc_g07": {x: pos.taichung.x-170, y: pos.taichung.y-65, name: '水湳', stationClass: 4, noClick: true },
                        "crtc_g08": {x: pos.taichung.x-220, y: pos.taichung.y-65, name: '文華高中', stationClass: 4, noClick: true },
                        "crtc_g08a": {x: pos.taichung.x-280, y: pos.taichung.y-35, name: '櫻花', stationClass: 4, noClick: true },
                        "crtc_g09": {x: pos.taichung.x-330, y: pos.taichung.y-10, name: '市政府', stationClass: 4, noClick: true },
                        "crtc_g10": {x: pos.taichung.x-330, y: pos.taichung.y+15, name: '溝仔墘', stationClass: 4, noClick: true },
                        "crtc_g10a": {x: pos.taichung.x-260, y: pos.taichung.y+40, name: '文心公園', stationClass: 4, noClick: true },
                        "crtc_g11": {x: pos.taichung.x-190, y: pos.taichung.y+70, name: '南屯', stationClass: 4, noClick: true },
                        "crtc_g12": {x: pos.taichung.x-145, y: pos.taichung.y+70, name: '麻茲埔', stationClass: 4, noClick: true },
                        "crtc_g13": {x: pos.taichung.x-81, y: pos.taichung.y+70, name: '大慶', stationClass: 3, noClick: true, company: true},
                        "crtc_g14": {x: pos.taichung.x-81, y: pos.taichung.y+100, name: '九張犁', stationClass: 4, noClick: true },
                        "crtc_g15": {x: pos.taichung.x-81, y: pos.taichung.y+125, name: '九德', stationClass: 4, noClick: true },
                        "crtc_g16": {x: pos.taichung.x-81, y: pos.taichung.y+150, name: '烏日', stationClass: 3, noClick: true, company: true},
                        "crtc_g17": {x: pos.taichung.x-212, y: pos.taichung.y+180, name: '新烏日', stationClass: 2, noClick: true, company: true}
                    }
                }
            ]
        }
        if(cfg.lineData) lineData = cfg.lineData;
        
        function getStationData(st, company){
            if(!company) company = st.split('_')[0];
            
            if(lineData[company]){
                    for(var i=0; i<lineData[company].length; i++){
                        if(lineData[company][i].station[st]) return lineData[company][i].station[st];
                    }
            }
            if(lineData['planLine']){
                    for(var i=0; i<lineData['planLine'].length; i++){
                        if(lineData['planLine'][i].station[st]) return lineData['planLine'][i].station[st];
                    }
            }
        }

        function getCompanyData(st){
            var preName;
            for(var k in cfg.companyNameObj){
                preName = k + '_';
                if(st.indexOf(preName)==0) return cfg.companyNameObj[k];
            }
            return '';
        }
        
        //================== canvas start =====================
        var ca = {
            el: document.createElement('canvas'),
            div: document.createElement('div'),
            isInit: false,
            cfg: cfg,
            programName: 'Use Canvas Draw Taiwan All Railway Map'
        };
        ca.c = ca.el.getContext('2d');
        var cc = ca.c;
        
        if(cfg.renderDiv){
            ca.div.appendChild(ca.el);
            ca.div.style.position = 'relative';
            ca.div.style.width = ((cfg.divWidth) ? cfg.divWidth : cfg.baseWidth) + 'px';//cfg.baseWidth*cfg.zoom
            ca.div.style.height = ((cfg.divHeight) ? cfg.divHeight : cfg.baseHeight) + 'px';//cfg.baseHeight*cfg.zoom
            ca.div.style.overflow = (cfg.divWidth) ? 'auto' : 'hidden'; 
            if(cfg.divOverflowStyle) ca.div.style.overflow = cfg.divOverflowStyle;
        }
        
        ca.el.width = parseInt(cfg.baseWidth,10);//parseInt(cfg.baseWidth,10)*cfg.zoom
        ca.el.style.width = ((cfg.divWidth) ? cfg.divWidth : cfg.baseWidth) + 'px';//cfg.baseWidth*cfg.zoom
        ca.el.height = parseInt(cfg.baseHeight,10);//parseInt(cfg.baseHeight,10)*cfg.zoom
        ca.el.style.height = ((cfg.divHeight) ? cfg.divHeight : cfg.baseHeight) + 'px';//cfg.baseHeight*cfg.zoom
        ca.el.style.backgroundColor = cfg.canvasBgcolor;
        if(cfg.canvasID) ca.el.id = cfg.canvasID;
        
        ca.x = function(x){return (x + cfg.offsetX);}//(x + cfg.offsetX) * cfg.zoom
        ca.y = function(y){return (y + cfg.offsetY);}//(y + cfg.offsetY) * cfg.zoom
        
        ca.line = function(ust){
            ust = ust || {};
            var st = $.extend({
                color: '#666',
                width: cfg.lineWidth,
                startX: 0,
                startY: 0,
                endX: -20,
                endY: -100
            }, ust);
            
            var sx = ca.x(st.startX), sy = ca.y(st.startY), ex = ca.x(st.endX), ey = ca.y(st.endY);
            
            cc.beginPath();
            cc.moveTo(sx,sy);
            cc.strokeStyle = st.color;
            if(st.aryLine && st.aryLine.length > 0){
                var ax, ay;
                st.aryLine.map(function(da){
                    ax = ca.x(da.x), ay=ca.y(da.y);
                    if(!da.move){
                        cc.lineTo(ax,ay);
                        cc.lineWidth = st.width;
                        cc.stroke();
                    }

                    cc.moveTo(ax,ay);
                });
            }else{
                cc.lineTo(ex,ey);
                cc.lineWidth = st.width;
                cc.stroke();
            }
        }
        
        ca.writeStation = function(ust){
            ust = ust || {};
            var st = $.extend({
                fontColor: (ust.isPlanStation && !cfg.drawPlanLineOriginalColor) ? cfg.drawPlanColor : cfg.stationNameColor,
                borderColor: (ust.isPlanStation && !cfg.drawPlanLineOriginalColor) ? cfg.drawPlanColor : '#000',
                borderWidth: 1,
                bgColor: '#FFF',
                x: 0, y:0,
                stationClass: 0,
                name: '臺北'
            }, ust);
            var fontSize = cfg.stationClassFontSize[st.stationClass];//cfg.stationClassFontSize[st.stationClass] * cfg.zoom
            var fontI = Math.ceil(fontSize);
            var maxWidth = cfg.stationClassFontMaxWidth[st.stationClass];//cfg.stationClassFontMaxWidth[st.stationClass] * cfg.zoom
            var preDS = (st.stationClass==0 || st.useBold) ? 'bold ' : '';
            
            cc.font = preDS + fontSize + 'px ' + 'sans-serif';
            cc.lineWidth = st.borderWidth;
            var strDrawLength = cc.measureText(st.name).width;
            if(strDrawLength > maxWidth) strDrawLength = maxWidth;
            
            var cube = {
                width: Math.ceil(strDrawLength) + 3,
                height: fontI + 4
            }
            cube.x = ca.x(st.x) - Math.ceil(cube.width/2);//ca.x(st.x) - Math.ceil(cube.width * cfg.zoom/2)
            cube.y = ca.y(st.y) - Math.ceil(cube.height/2);//ca.y(st.y) - Math.ceil(cube.height * cfg.zoom/2)
            
            cc.fillStyle = st.bgColor;
            cc.fillRect(cube.x, cube.y, cube.width, cube.height);
            
            cc.strokeStyle = st.borderColor;
            cc.strokeRect(cube.x-st.borderWidth, cube.y-st.borderWidth , cube.width+st.borderWidth*2, cube.height+st.borderWidth*2);
            
            cc.fillStyle = st.fontColor;
            cc.fillText(st.name, cube.x+1, cube.y+fontI, maxWidth);
             
            return cube;
        }
        
        ca.drawLine = function(){
            var paintAryLine = new Array();
            var dLine, aryLine, stData, tmpJ,x, y, sx, sy, ex, ey;
            
            function drawFn(tLine){
                var isPlanLine = (tLine.isPlanLine) ? true : false;
                dLine = tLine.line;
                aryLine = new Array();
                for(var i=0; i<dLine.length; i++){
                    if(i==0) continue;
                    stData = getStationData(dLine[i].id);
                    if(dLine[i].type=='station'){
                        aryLine.push({x: stData.x, y: stData.y});
                    }else if(dLine[i].type=='turn'){
                        aryLine.push({x: stData.x + dLine[i].ox, y: stData.y + dLine[i].oy, turn: true});
                    }else if(dLine[i].type=='move'){
                        aryLine.push({x: stData.x, y: stData.y, move: true});
                    }
                }
                stData = getStationData(dLine[0].id);
                ca.line({
                    startX: stData.x,
                    startY: stData.y,
                    aryLine: aryLine,
                    color: (isPlanLine && !cfg.drawPlanLineOriginalColor) ? cfg.drawPlanColor : tLine.color
                });
            }
            
            function drawNameTagFn(tLine){
                if(!tLine.nameTag) return false;
                var st = getStationData(tLine.nameTag.id);
                var x = ca.x(st.x + tLine.nameTag.ox);
                var y = ca.y(st.y + tLine.nameTag.oy);
                
                var isPlanLine = tLine.isPlanLine;
                var color = (isPlanLine && !cfg.drawPlanLineOriginalColor) ? cfg.drawPlanColor : tLine.color;
                var fontColor = (isPlanLine && !cfg.drawPlanLineOriginalColor) ? '#FFF' : tLine.nameTag.fontColor;
                
                cc.font = '16px sans-serif';
                var strDrawLength = cc.measureText(tLine.name).width;
                
                cc.beginPath();
                cc.strokeStyle = color;
                cc.moveTo(x,y);
                cc.lineTo(x + strDrawLength + 10,y);
                cc.lineWidth = 22;
                cc.stroke();

                cc.fillStyle = fontColor;
                cc.fillText(tLine.name, x+2, y+4, strDrawLength);
            }
            
            var tLine;
            for(var k in lineData){
                for(var ata=0; ata<lineData[k].length; ata++){
                	tLine = lineData[k][ata]
                    if(tLine.isPlanLine && !cfg.drawPlanLine) continue;
                    if(onlyDoPlanLine && !tLine.isPlanLine && !cfg.drawPlanLineOriginalColor) continue;
                    if(!onlyDoPlanLine && tLine.isPlanLine && !cfg.drawPlanLineOriginalColor) continue;
                    drawFn(tLine);
                    drawNameTagFn(tLine);
                }
            }
        }
        
        ca.processStation = function(){
            var writeAryStation = new Array();
            var tLine, tmpJ;

            function pushAryFn(cpm){
                for(var ata=0; ata<cpm.length; ata++){
                    tLine = cpm[ata];
                    if(tLine.isPlanLine && !cfg.drawPlanLine) continue;
                    if(onlyDoPlanLine && !tLine.isPlanLine && !cfg.drawPlanLineOriginalColor) continue;
                    if(!onlyDoPlanLine && tLine.isPlanLine && !cfg.drawPlanLineOriginalColor) continue;
                    for(var k in tLine.station){
                        if(tLine.station[k].noDraw) continue;
                        tmpJ = $.extend({
                            id: k,
                            isPlanStation: (tLine.isPlanLine) ? true : false,
                            lineID: tLine.id
                        },tLine.station[k]);
                        if(tmpJ.company){
                            tmpJ.name = tmpJ.name + ' (' + getCompanyData(tmpJ.id) + ')';
                        }
                        writeAryStation.push(tmpJ);
                    }
                }
            }
            
            for(var k in lineData){
                pushAryFn(lineData[k]);
            }
            ca.writeAryStation = writeAryStation;
        }
        
        ca.drawMap = function(){
        	if(cfg.drawPlanLine && !cfg.drawPlanLineOriginalColor){
        		onlyDoPlanLine = true;
        		ca.processStation();
            	ca.drawLine();
            	ca.writeAryStation.map(function(st,idx){
                	st.cube = ca.writeStation(st);
            	});
            	onlyDoPlanLine = false;
        	}
            ca.processStation();
            ca.drawLine();
            
            ca.writeAryStation.map(function(st,idx){
                st.cube = ca.writeStation(st);
            });
        }

        ca.createClickDiv = function(){
            if(!cfg.makeClickDiv) return false;
            if(!ca.clickDiv){
                ca.clickDiv = document.createElement('div');
                ca.div.appendChild(ca.clickDiv);
            }else{
                ca.clickDiv.innerHTML = '';
            }
            var cl = ca.clickDiv,
                    cw = (cfg.divWidth) ? cfg.divWidth : cfg.baseWidth,
                    ch = (cfg.divHeight) ? cfg.divHeight : cfg.baseHeight;
                cl.style.position = 'absolute';
                cl.style.width = cw + 'px';
                cl.style.height = ch + 'px';
                cl.style.top = '0px';
                cl.style.left = '0px';
                cl.style.zIndex = 2;
                cl.className = cfg.makeClickDivCSSName;
            if(cfg.makeClickDivID) cl.id = cfg.makeClickDivID;
            var zw = (cw != cfg.baseWidth) ? (cw/cfg.baseWidth) : 1;
            var zh = (ch != cfg.baseHeight) ? (ch/cfg.baseHeight) : 1;

            var cube, btn;
            ca.writeAryStation.map(function(st){
                if(st.noDraw || st.noClick || st.isPlanStation) return false;
                cube = st.cube;
                btn = document.createElement('div');
                btn.className = cfg.makeClickBaseCSSName + ' ' + cfg.maekClickCSSName + st.id;
                btn.style.position = 'absolute';
                btn.style.cursor = 'pointer';
                btn.style.width = cube.width*zw + 'px';
                btn.style.height = cube.height*zh + 'px';
                btn.style.left = cube.x*zw + 'px';
                btn.style.top = cube.y*zh + 'px';
                btn.addEventListener('click', cfg.maekCkickCBFN, false);
                cl.appendChild(btn);
            })
        }
        
        ca.init = function(){
            if(ca.isInit) return ca.el;
            if(cfg.renderID && cfg.renderDiv){
                var domA = (typeof(cfg.renderID)=='string') ? document.getElementById(cfg.renderID) : cfg.renderID;
                if(cfg.renderID=='body'){
                    ca.div.style.position = 'absolute';
                    ca.div.style.top = '0px';
                    ca.div.style.left = '0px';
                    ca.div.style.zIndex = cfg.zIndex;
                    if(cfg.divID) ca.div.id = cfg.divID;
                    document.body.appendChild(ca.div);
                }else{
                    domA.appendChild(ca.div);
                }
            }else if(cfg.renderID && !cfg.renderDiv){
                var domA = (typeof(cfg.renderID)=='string') ? document.getElementById(cfg.renderID) : cfg.renderID;
                if(cfg.renderID=='body'){
                    document.body.appendChild(ca.el);
                }else{
                    domA.appendChild(ca.el);
                }
            }
            ca.isInit = true;
            return ca.el;
        }

        ca.initMap = function(){
            ca.drawMap();
            ca.createClickDiv();
        }
        
        ca.initAll = function(){
            ca.init(); 
            ca.initMap();
        }
        
        return ca;
    }
    
    if(wind.TT && wind.TT.lib){
        wind.TT.lib.canvasMap = canvasMap;
    }else{
        wind.canvasTaiwanRailwayMapJS = canvasMap;
    }
})(window);


        //Remove after test
        //setTimeout(function(){  window.a = new TT.lib.canvasMap({ baseWidth: 1400, baseHeight: 910, offsetX: 620 }); a.initAll();  },1000);