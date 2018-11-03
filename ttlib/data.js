(function(){
if(!window.__createLibTT) window.__createLibTT = {};

__createLibTT.data = function(TT){
	TT.data = {
        tra: {
        	defined: {
        		"CarClass": [
        			{"id": "1100", "name": "自強", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1101", "name": "自強", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1102", "name": "太魯閣號", "ename": "Tze-Chiang Limited Express(Tarko)", "color": "#FD8A10"},
        			{"id": "1103", "name": "自強", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1106", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1107", "name": "普悠瑪號", "ename": "Tze-Chiang Limited Express(Puyuma)", "color": "#ff0030"},
        			{"id": "1108", "name": "自強", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1109", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110A", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110B", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110C", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110D", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110E", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "110F", "name": "自強號", "ename": "Tze-Chiang Limited Express", "color": "#fd7a10"},
        			{"id": "1110", "name": "莒光", "ename": "Chu-Kuang Express", "color": "#ff1070"},
        			{"id": "1111", "name": "莒光", "ename": "Chu-Kuang Express", "color": "#ff1070"},
        			{"id": "1114", "name": "莒光", "ename": "Chu-Kuang Express", "color": "#ff1070"},
        			{"id": "1115", "name": "莒光", "ename": "Chu-Kuang Express", "color": "#ff1070"},
        			{"id": "1120", "name": "復興", "ename": "Fu-Hsing Semi Express", "color": "#32CFBC"},
        			{"id": "1130", "name": "電車", "ename": "Electric Multiple Unit"},
        			{"id": "1131", "name": "區間車", "ename": "Local Train"},
        			{"id": "1132", "name": "區間快", "ename": "Fast Local Train", "color": "#32CFBC"},
        			{"id": "1140", "name": "普快車", "ename": "Ordinary train"},
        			{"id": "1141", "name": "柴快車", "ename": "Disel Rail Car"},
        			{"id": "1150", "name": "柴油車", "ename": "na"}
        		]
        	},
            running_ary: [{
                    id: 'eTemu', cate: 'express', CarClass: ['1107','1102'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線太魯閣號、普悠瑪號',
                    rangeSplit: 'tra_1715',
                    lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
                    mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007', 'tra_1715', 'tra_1619', 'tra_1632'],
                    maybeStop: ['tra_1006','tra_1003','tra_1820','tra_1823','tra_1606','tra_1610','tra_1612','tra_1616','tra_1626'],
                    lessStop: ['tra_1002','tra_1804', 'tra_1816', 'tra_1818','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630']
                }, {
                    id: 'eZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線自強號',
                    rangeSplit: 'tra_1715',
                    lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
                    mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007','tra_1820','tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
                    maybeStop: ['tra_1003','tra_1804','tra_1816','tra_1818','tra_1826','tra_1705','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630'],
                    lessStop: ['tra_1009','tra_1006','tra_1005','tra_1002','tra_1808','tra_1810','tra_1709']
                }, {
                    id: 'eJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '0', area: 'e', range: ['tra_1012','tra_1632'], name: '東部幹線莒光號',
                    rangeSplit: 'tra_1715',
                    lineOf: ['tra_xibu','tra_yilan','tra_beihui','tra_huadong'],
                    mustStop: ['tra_1012', 'tra_1011', 'tra_1008', 'tra_1007','tra_1804','tra_1816','tra_1818','tra_1820','tra_1823', 'tra_1715', 'tra_1619', 'tra_1632'],
                    maybeStop: ['tra_1005','tra_1003','tra_1826','tra_1705','tra_1712','tra_1602','tra_1604','tra_1611','tra_1623','tra_1624','tra_1630'],
                    lessStop: ['tra_1009','tra_1002','tra_1805','tra_1808','tra_1810','tra_1704','tra_1709','tra_1607','tra_1621','tra_1622']
                }, {//西部對號
                    id: 'wZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 'w', range: ['tra_1003','tra_1411'], name: '西部幹線自強號',
                    lineOf: ['tra_xibu','tra_shan','tra_zhjy','tra_jygx','tra_pingdong'],
                    mustStop: ['tra_1003','tra_1007','tra_1008','tra_1011','tra_1015','tra_1017','tra_1025','tra_1305','tra_1317','tra_1319','tra_1120','tra_1210','tra_1215','tra_1228','tra_1242','tra_1238','tra_1402','tra_1406','tra_1411'],
                    maybeStop: ['tra_1005','tra_1028','tra_1203','tra_1206','tra_1211','tra_1220','tra_1404'],
                    lessStop: ['tra_1006','tra_1012','tra_1214','tra_1225','tra_1227','tra_1233']
                }, {
                    id: 'wJv', cate: 'express', CarClass: ['1110','11111','1114','1115'], dir: '1', area: 'w', range: ['tra_1003','tra_1411'], name: '西部幹線莒光號',
                    lineOf: ['tra_xibu','tra_hai','tra_zhjy','tra_jygx','tra_pingdong'],
                    mustStop: ['tra_1003','tra_1005','tra_1007','tra_1008','tra_1011','tra_1012','tra_1015','tra_1017','tra_1019','tra_1021','tra_1025','tra_1028',
                        'tra_1105', 'tra_1109', 'tra_1110', 'tra_1112', 'tra_1114', 'tra_1115',
                        'tra_1120','tra_1203','tra_1206','tra_1210','tra_1211','tra_1215','tra_1220','tra_1223','tra_1225','tra_1228','tra_1233','tra_1242','tra_1238','tra_1402','tra_1406','tra_1411'],
                    maybeStop: ['tra_1023','tra_1207','tra_1213','tra_1214','tra_1227','tra_1404'],
                    lessStop: ['tra_1014','tra_1107','tra_1117','tra_1214','tra_1226','tra_1231','tra_1232']
                }, {//南迴線對號
                    id: 'sZi', cate: 'express', CarClass: ['1100','1101','1103','1108','1109','110A','110B','110C','110D','110E','110F'], dir: '1', area: 's', range: ['tra_1242','tra_1632'], name: '南迴線自強號',
                    lineOf: ['tra_jygx','tra_pingdong'],
                    mustStop: ['tra_1242', 'tra_1238','tra_1402','tra_1406','tra_1411','tra_1418','tra_1508','tra_1514','tra_1516','tra_1632'],
                    maybeStop: ['tra_1413','tra_1415','tra_1512'],
                    lessStop: ['tra_1404','tra_1510','tra_1517']
                }, {
                    id: 'sJvFu', cate: 'express', CarClass: ['1110','11111','1114','1115','1120'], dir: '1', area: 's', range: ['tra_1242','tra_1632'], name: '南迴線莒光號、復興號',
                    lineOf: ['tra_jygx','tra_pingdong'],
                    mustStop: ['tra_1242', 'tra_1238','tra_1402','tra_1406','tra_1411','tra_1418','tra_1508','tra_1512','tra_1514','tra_1516','tra_1632'],
                    maybeStop: ['tra_1404','tra_1413','tra_1415','tra_1510','tra_1517'],
                    lessStop: []
                }, {
                    id: 'eLocal1', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1012','tra_1827'], name: '宜蘭線區間車', stopAll: true,
                    lineOf: ['tra_xibu','tra_yilan']
                }, {
                    id: 'eLocal2', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1820','tra_1715'], name: '北迴線區間車', stopAll: true,
                    lineOf: ['tra_yilan','tra_beihui']
                }, {
                    id: 'eLocal3', cate: 'local', CarClass: ['1131'], dir: '0', area: 'e', range: ['tra_1715','tra_1632'], name: '臺東線區間車', stopAll: true, maybeStop: ['tra_1608'],//當stopAll 時 maybeStop 表示為不一定停靠
                    lineOf: ['tra_huadong']
                }, {
                    id: 'wLocal1', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1001','tra_1025'], name: '基隆新竹段區間車', stopAll: true,
                    lineOf: ['tra_xibu']
                }, {
                    id: 'wLocal2', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1025','tra_1120'], name: '山線區間車', stopAll: true,
                    lineOf: ['tra_xibu','tra_shan']
                }, {
                    id: 'wLocal3', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1025','tra_1120'], name: '海線區間車', stopAll: true,
                    lineOf: ['tra_xibu','tra_hai']
                }, {
                    id: 'wLocal4', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1120','tra_1215'], name: '彰化嘉義段區間車', stopAll: true,
                    lineOf: ['tra_zhjy']
                }, {
                    id: 'wLocal5', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1215','tra_1411'], name: '嘉義潮州段區間車', stopAll: true,
                    lineOf: ['tra_jygx','tra_pingdong']
                }, {
                    id: 'wLocal6', cate: 'local', CarClass: ['1131'], dir: '1', area: 'w', range: ['tra_1411','tra_1418'], name: '潮州枋寮段區間車', stopAll: true,
                    lineOf: ['tra_pingdong']
                }, {
                    id: 'sLocal', cate: 'local', CarClass: ['1131'], dir: '1', area: 's', range: ['tra_1418','tra_1632'], name: '南迴線區間車', stopAll: true,
                    lineOf: ['']
                }, {
                    id: 'subPX', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'e', range: ['tra_2003','tra_1908'], name: '平溪線', stopAll: true,
                    lineOf: ['tra_pingxi']
                }, {
                    id: 'subLJ', cate: 'local', CarClass: ['1131'], dir: '0', area: 'w', range: ['tra_1025','tra_2214'], name: '六家線', stopAll: true,
                    lineOf: ['tra_liujia']
                }, {
                    id: 'subNW', cate: 'local', CarClass: ['1150','1131'], dir: '0', area: 'w', range: ['tra_2203','tra_2210'], name: '內灣線', stopAll: true,
                    lineOf: ['tra_liujia']
                }, {
                    id: 'subJJ', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['tra_1207','tra_2707'], name: '集集線', stopAll: true,
                    lineOf: ['tra_jiji']
                }, {
                    id: 'subSL', cate: 'local', CarClass: ['1150','1131'], dir: '1', area: 'w', range: ['tra_1228','tra_5102'], name: '沙崙線', stopAll: true,
                    lineOf: ['tra_jygx','tra_shalun']
            }],
        	sect_ary: ['pingdong','kaohsiung','tainan','chiayi','yunlin','changhua','taichung','miaoli','hsinchu','taoyuan','taipei','keelung',
                    'northeast','yilan','beihui','hualian','taidong'
            ],
            station_ary: [//big: e for big station of east(dongbu), w for big station of west(xibu), s for south link(nanhuei)
                {id:"tra_1001", name: "基隆", estring: "keelung", sect: "keelung"},
                {id:"tra_1029", name: "三坑", estring: "sankeng", sect: "keelung"},
                {id:"tra_1002", name: "八堵", estring: "badu", sect: "keelung", big: 'e'},
                {id:"tra_1003", name: "七堵", estring: "qidu", sect: "keelung", big: 'ew'},
                {id:"tra_1030", name: "百福", estring: "baifu", sect: "keelung"},
                {id:"tra_1004", name: "五堵", estring: "wudu", sect: "taipei"},
                {id:"tra_1005", name: "汐止", estring: "xizhisijhih", sect: "taipei"},
                {id:"tra_1031", name: "汐科", estring: "xikesike", sect: "taipei"},
                {id:"tra_1006", name: "南港", estring: "nangang", sect: "taipei"},
                {id:"tra_1007", name: "松山", estring: "songshan", sect: "taipei", big: 'ew', bigMaster: true},
                {id:"tra_1008", name: "台北", estring: "taipeitaibei", sect: "taipei", big: 'ew', bigMaster: true},
                {id:"tra_1009", name: "萬華", estring: "wanhua", sect: "taipei"},
                {id:"tra_1011", name: "板橋", estring: "banqiao", sect: "taipei", big: 'ew', bigMaster: true},
                {id:"tra_1032", name: "浮洲", estring: "fuzhou", sect: "taipei"},
                {id:"tra_1012", name: "樹林", estring: "shulin", sect: "taipei", big: 'e'},
                {id:"tra_1034", name: "南樹林", estring: "nanshulin", sect: "taipei"},
                {id:"tra_1013", name: "山佳", estring: "shanjia", sect: "taipei"},
                {id:"tra_1014", name: "鶯歌", estring: "yingge", sect: "taipei"},
                {id:"tra_1015", name: "桃園", estring: "taoyuan", sect: "taoyuan", big: 'w'},
                {id:"tra_1016", name: "內壢", estring: "neili", sect: "taoyuan"},
                {id:"tra_1017", name: "中壢", estring: "zhongli", sect: "taoyuan", big: 'w'},
                {id:"tra_1018", name: "埔心", estring: "puxin", sect: "taoyuan"},
                {id:"tra_1019", name: "楊梅", estring: "yangmei", sect: "taoyuan"},
                {id:"tra_1020", name: "富岡", estring: "fugan", sect: "taoyuan"},
                {id:"tra_1036", name: "新富", estring: "xinfu", sect: "taoyuan"},
                {id:"tra_1033", name: "北湖", estring: "beihu", sect: "hsinchu"},
                {id:"tra_1021", name: "湖口", estring: "hukou", sect: "hsinchu"},
                {id:"tra_1022", name: "新豐", estring: "xinfeng", sect: "hsinchu"},
                {id:"tra_1023", name: "竹北", estring: "zhubei", sect: "hsinchu"},
                {id:"tra_1024", name: "北新竹", estring: "northhsinchubeixinzhu", sect: "hsinchu"},
                {id:"tra_1025", name: "新竹", estring: "hsinchuxinzhu", sect: "hsinchu", big: 'w'},
                {id:"tra_1035", name: "三姓橋", estring: "sanxingqiao", sect: "hsinchu"},
                {id:"tra_1026", name: "香山", estring: "xiangshan", sect: "hsinchu"},
                {id:"tra_1027", name: "崎頂", estring: "jidingciding", sect: "hsinchu"},
                {id:"tra_1028", name: "竹南", estring: "zhunan", sect: "hsinchu", big: 'w'},
                {id:"tra_1302", name: "造橋", estring: "zaoqiao", sect: "miaoli"},
                {id:"tra_1304", name: "豐富", estring: "fengfu", sect: "miaoli"},
                {id:"tra_1305", name: "苗栗", estring: "miaoli", sect: "miaoli", big: 'w'},
                {id:"tra_1307", name: "南勢", estring: "nanshi", sect: "miaoli"},
                {id:"tra_1308", name: "銅鑼", estring: "tongluo", sect: "miaoli"},
                {id:"tra_1310", name: "三義", estring: "sanyi", sect: "miaoli"},
                {id:"tra_1314", name: "泰安", estring: "taian", sect: "miaoli"},
                {id:"tra_1315", name: "后里", estring: "houli", sect: "taichung"},
                {id:"tra_1317", name: "豐原", estring: "fengyuan", sect: "taichung", big: 'w'},
                {id:"tra_1325", name: "栗林", estring: "lilin", sect: "taichung"},
                {id:"tra_1318", name: "潭子", estring: "tanzi", sect: "taichung"},
                {id:"tra_1326", name: "頭家厝", estring: "toujiacuo", sect: "taichung"},
                {id:"tra_1327", name: "松竹", estring: "toujiacuo", sect: "songzhu"},
                {id:"tra_1323", name: "太原", estring: "taiyuan", sect: "taichung"},
                {id:"tra_1328", name: "精武", estring: "jingwu", sect: "taichung"},
                {id:"tra_1319", name: "台中", estring: "taizhongtaichung", sect: "taichung", big: 'w'},
                {id:"tra_1329", name: "五權", estring: "wuquan", sect: "taichung"},
                {id:"tra_1322", name: "大慶", estring: "daqing", sect: "taichung"},
                {id:"tra_1320", name: "烏日", estring: "wuri", sect: "taichung"},
                {id:"tra_1324", name: "新烏日", estring: "xinwuri", sect: "taichung"},
                {id:"tra_1321", name: "成功", estring: "chenggong", sect: "taichung"},
                {id:"tra_1120", name: "彰化", estring: "zhanghuachanghua", sect: "changhua", big: 'w'},
                {id:"tra_1202", name: "花壇", estring: "huatan", sect: "changhua"},
                {id:"tra_1240", name: "大村", estring: "dacundatsun", sect: "changhua"},
                {id:"tra_1203", name: "員林", estring: "yuanlin", sect: "changhua", big: 'w'},
                {id:"tra_1204", name: "永靖", estring: "yongjing", sect: "changhua"},
                {id:"tra_1205", name: "社頭", estring: "shetou", sect: "changhua"},
                {id:"tra_1206", name: "田中", estring: "tianzhong", sect: "changhua"},
                {id:"tra_1207", name: "二水", estring: "ershuiershuei", sect: "changhua"},
                {id:"tra_1208", name: "林內", estring: "linnei", sect: "yunlin"},
                {id:"tra_1209", name: "石榴", estring: "shilioushihliou", sect: "yunlin"},
                {id:"tra_1210", name: "斗六", estring: "douliou", sect: "yunlin", big: 'w'},
                {id:"tra_1211", name: "斗南", estring: "dounan", sect: "yunlin"},
                {id:"tra_1212", name: "石龜", estring: "shigueishihguei", sect: "yunlin"},
                {id:"tra_1213", name: "大林", estring: "dalin", sect: "yunlin"},
                {id:"tra_1214", name: "民雄", estring: "minxiong", sect: "chiayi"},
                {id:"tra_1241", name: "嘉北", estring: "jiabei", sect: "chiayi"},
                {id:"tra_1215", name: "嘉義", estring: "jiayichiayi", sect: "chiayi", big: 'w'},
                {id:"tra_1217", name: "水上", estring: "shuishangshueishang", sect: "chiayi"},
                {id:"tra_1218", name: "南靖", estring: "nanjing", sect: "chiayi"},
                {id:"tra_1219", name: "後壁", estring: "houbi", sect: "tainan"},
                {id:"tra_1220", name: "新營", estring: "xinyingsinying", sect: "tainan", big: 'w'},
                {id:"tra_1221", name: "柳營", estring: "liouying", sect: "tainan"},
                {id:"tra_1222", name: "林鳳營", estring: "linfengyinglinfongying", sect: "tainan"},
                {id:"tra_1223", name: "隆田", estring: "longtian", sect: "tainan"},
                {id:"tra_1224", name: "拔林", estring: "balin", sect: "tainan"},
                {id:"tra_1225", name: "善化", estring: "shanghua", sect: "tainan"},
                {id:"tra_1244", name: "南科", estring: "nanke", sect: "tainan"},
                {id:"tra_1226", name: "新市", estring: "xinshisinshih", sect: "tainan"},
                {id:"tra_1227", name: "永康", estring: "yungkangyongkang", sect: "tainan"},
                {id:"tra_1239", name: "大橋", estring: "daqiaodaciao", sect: "tainan"},
                {id:"tra_1228", name: "台南", estring: "tainan", sect: "tainan", big: 'w'},
                {id:"tra_1229", name: "保安", estring: "baoan", sect: "tainan"},
                {id:"tra_1243", name: "仁德", estring: "rende", sect: "tainan"},
                {id:"tra_1230", name: "中州", estring: "zhongzhoujhongjhou", sect: "tainan"},
                {id:"tra_1231", name: "大湖", estring: "dahu", sect: "kaohsiung"},
                {id:"tra_1232", name: "路竹", estring: "luzhulujhu", sect: "kaohsiung"},
                {id:"tra_1233", name: "岡山", estring: "ganshan", sect: "kaohsiung", big: 'w'},
                {id:"tra_1234", name: "橋頭", estring: "qiaotou", sect: "kaohsiung"},
                {id:"tra_1235", name: "楠梓", estring: "nanzi", sect: "kaohsiung"},
                {id:"tra_1242", name: "新左營", estring: "xingzouying", sect: "kaohsiung", big: 's'},
                {id:"tra_1236", name: "左營", estring: "zouying", sect: "kaohsiung"},
                {id:"tra_1245", name: "內惟", estring: "neiwei", sect: "kaohsiung"},
                {id:"tra_1246", name: "美術館", estring: "meishuguanmuseumoffinearts", sect: "kaohsiung"},
                {id:"tra_1237", name: "鼓山", estring: "gushan", sect: "kaohsiung"},
                {id:"tra_1247", name: "三塊厝", estring: "sankuaicuo", sect: "kaohsiung"},
                {id:"tra_1238", name: "高雄", estring: "kaohsiunggaoxung", sect: "kaohsiung", big: 'ws'},
                {id:"tra_1419", name: "民族", estring: "mingzhu", sect: "kaohsiung"},
                {id:"tra_1420", name: "科工館", estring: "kegongguanscienceandtecnologymuseum", sect: "kaohsiung"},
                {id:"tra_1421", name: "正義", estring: "zhengyi", sect: "kaohsiung"},
                {id:"tra_1402", name: "鳳山", estring: "fongshanfengshan", sect: "kaohsiung", big: 'w'},
                {id:"tra_1403", name: "後庄", estring: "hozhuang", sect: "kaohsiung"},
                {id:"tra_1404", name: "九曲堂", estring: "jiuqutang", sect: "kaohsiung"},
                {id:"tra_1405", name: "六塊厝", estring: "liukuaicuo", sect: "pingdong"},
                {id:"tra_1406", name: "屏東", estring: "pingtungpingdong", sect: "pingdong", big: 'ws'},
                {id:"tra_1407", name: "歸來", estring: "gueilai", sect: "pingdong"},
                {id:"tra_1408", name: "麟洛", estring: "linluo", sect: "pingdong"},
                {id:"tra_1409", name: "西勢", estring: "xishi", sect: "pingdong"},
                {id:"tra_1410", name: "竹田", estring: "zhutian", sect: "pingdong"},
                {id:"tra_1411", name: "潮州", estring: "chaozhouchaojhou", sect: "pingdong", big: 'ws'},
                {id:"tra_1412", name: "崁頂", estring: "kanding", sect: "pingdong"},
                {id:"tra_1413", name: "南州", estring: "nanzho", sect: "pingdong"},
                {id:"tra_1414", name: "鎮安", estring: "zhengan", sect: "pingdong"},
                {id:"tra_1415", name: "林邊", estring: "linbian", sect: "pingdong"},
                {id:"tra_1416", name: "佳冬", estring: "jiadong", sect: "pingdong"},
                {id:"tra_1417", name: "東海", estring: "donghai", sect: "pingdong"},
                {id:"tra_1418", name: "枋寮", estring: "fangliao", sect: "pingdong"},
                {id:"tra_1802", name: "暖暖", estring: "nuannuan", sect: "northeast"},
                {id:"tra_1803", name: "四腳亭", estring: "sijiaoting", sect: "northeast"},
                {id:"tra_1804", name: "瑞芳", estring: "ruifang", sect: "northeast", big: 'e'},
                {id:"tra_1805", name: "猴硐", estring: "houdong", sect: "northeast"},
                {id:"tra_1806", name: "三貂嶺", estring: "sandiaoling", sect: "northeast"},
                {id:"tra_1807", name: "牡丹", estring: "mudan", sect: "northeast"},
                {id:"tra_1808", name: "雙溪", estring: "shuangxi", sect: "northeast"},
                {id:"tra_1809", name: "貢寮", estring: "gongliao", sect: "northeast"},
                {id:"tra_1810", name: "福隆", estring: "fulong", sect: "northeast"},
                {id:"tra_1811", name: "石城", estring: "shicheng", sect: "yilan"},
                {id:"tra_1812", name: "大里", estring: "dali", sect: "yilan"},
                {id:"tra_1813", name: "大溪", estring: "daxidasi", sect: "yilan"},
                {id:"tra_1814", name: "龜山", estring: "gueishan", sect: "yilan"},
                {id:"tra_1815", name: "外澳", estring: "waiao", sect: "yilan"},
                {id:"tra_1816", name: "頭城", estring: "toucheng", sect: "yilan", big: 'e'},
                {id:"tra_1817", name: "頂埔", estring: "dingpu", sect: "yilan"},
                {id:"tra_1818", name: "礁溪", estring: "jiaoxijiaohsi", sect: "yilan"},
                {id:"tra_1819", name: "四城", estring: "sicheng", sect: "yilan"},
                {id:"tra_1820", name: "宜蘭", estring: "yilan", sect: "yilan", big: 'e'},
                {id:"tra_1821", name: "二結", estring: "erjie", sect: "yilan"},
                {id:"tra_1822", name: "中里", estring: "zhongli", sect: "yilan"},
                {id:"tra_1823", name: "羅東", estring: "luodong", sect: "yilan", big: 'e'},
                {id:"tra_1824", name: "冬山", estring: "dongshan", sect: "yilan"},
                {id:"tra_1825", name: "新馬", estring: "xinmasinma", sect: "yilan"},
                {id:"tra_1826", name: "蘇澳新", estring: "suaoxinsuaosin", sect: "yilan", big: 'e'},
                {id:"tra_1827", name: "蘇澳", estring: "suao", sect: "yilan"},
                {id:"tra_1703", name: "永樂", estring: "yongle", sect: "beihui"},
                {id:"tra_1704", name: "東澳", estring: "dongao", sect: "beihui"},
                {id:"tra_1705", name: "南澳", estring: "nanao", sect: "beihui", big: 'e'},
                {id:"tra_1706", name: "武塔", estring: "wuta", sect: "beihui"},
                {id:"tra_1708", name: "漢本", estring: "hanben", sect: "beihui"},
                {id:"tra_1709", name: "和平", estring: "heping", sect: "beihui"},
                {id:"tra_1710", name: "和仁", estring: "heren", sect: "beihui"},
                {id:"tra_1711", name: "崇德", estring: "chongde", sect: "hualian"},
                {id:"tra_1712", name: "新城", estring: "xinchengsincheng", sect: "hualian", big: 'e'},
                {id:"tra_1713", name: "景美", estring: "jingmei", sect: "hualian"},
                {id:"tra_1714", name: "北埔", estring: "beipu", sect: "hualian"},
                {id:"tra_1715", name: "花蓮", estring: "hualienhualian", sect: "hualian", big: 'e'},//sect:hualian
                {id:"tra_1602", name: "吉安", estring: "jian", sect: "hualian"},
                {id:"tra_1604", name: "志學", estring: "zhixue", sect: "hualian"},
                {id:"tra_1605", name: "平和", estring: "pinghe", sect: "hualian"},
                {id:"tra_1606", name: "壽豐", estring: "shoufeng", sect: "hualian"},
                {id:"tra_1607", name: "豐田", estring: "fengtian", sect: "hualian"},
                {id:"tra_1608", name: "林榮新光", estring: "lingrongzinguanglingrongshinkong", sect: "hualian"},
                {id:"tra_1609", name: "南平", estring: "nanping", sect: "hualian"},
                {id:"tra_1610", name: "鳳林", estring: "fenglinfonglin", sect: "hualian"},
                {id:"tra_1611", name: "萬榮", estring: "wanrong", sect: "hualian"},
                {id:"tra_1612", name: "光復", estring: "guangfu", sect: "hualian"},
                {id:"tra_1613", name: "大富", estring: "dafu", sect: "hualian"},
                {id:"tra_1614", name: "富源", estring: "fuyuan", sect: "hualian"},
                {id:"tra_1616", name: "瑞穗", estring: "ruisui", sect: "hualian"},
                {id:"tra_1617", name: "三民", estring: "sanmin", sect: "hualian"},
                {id:"tra_1619", name: "玉里", estring: "yuli", sect: "hualian", big: 'e'},
                {id:"tra_1621", name: "東里", estring: "dongli", sect: "hualian"},
                {id:"tra_1622", name: "東竹", estring: "dongzhu", sect: "hualian"},
                {id:"tra_1623", name: "富里", estring: "fuli", sect: "hualian"},
                {id:"tra_1624", name: "池上", estring: "chishang", sect: "taidong"},
                {id:"tra_1625", name: "海端", estring: "haiduan", sect: "taidong"},
                {id:"tra_1626", name: "關山", estring: "guanshan", sect: "taidong"},
                {id:"tra_1628", name: "瑞和", estring: "ruihe", sect: "taidong"},
                {id:"tra_1629", name: "瑞源", estring: "ruiyuan", sect: "taidong"},
                {id:"tra_1630", name: "鹿野", estring: "luye", sect: "taidong"},
                {id:"tra_1631", name: "山里", estring: "shanli", sect: "taidong"},
                {id:"tra_1632", name: "台東", estring: "taitungtaidong", sect: "taidong", big: 'es'},
                {id:"tra_1102", name: "談文", estring: "tanwen", sect: "miaoli"},
                {id:"tra_1104", name: "大山", estring: "dashan", sect: "miaoli"},
                {id:"tra_1105", name: "後龍", estring: "holong", sect: "miaoli", big: 'w'},
                {id:"tra_1106", name: "龍港", estring: "longgang", sect: "miaoli"},
                {id:"tra_1107", name: "白沙屯", estring: "baishatuen", sect: "miaoli"},
                {id:"tra_1108", name: "新埔", estring: "xinpu", sect: "miaoli"},
                {id:"tra_1109", name: "通霄", estring: "tongxiao", sect: "miaoli", big: 'w'},
                {id:"tra_1110", name: "苑裡", estring: "yuanli", sect: "miaoli", big: 'w'},
                {id:"tra_1111", name: "日南", estring: "rinan", sect: "taichung"},
                {id:"tra_1112", name: "大甲", estring: "dajia", sect: "taichung", big: 'w'},
                {id:"tra_1113", name: "臺中港", estring: "taizhonggang", sect: "taichung"},
                {id:"tra_1114", name: "清水", estring: "qingshui", sect: "taichung", big: 'w'},
                {id:"tra_1115", name: "沙鹿", estring: "lugang", sect: "taichung", big: 'w'},
                {id:"tra_1116", name: "龍井", estring: "longjing", sect: "taichung"},
                {id:"tra_1117", name: "大肚", estring: "dadu", sect: "taichung"},
                {id:"tra_1118", name: "追分", estring: "zhuifen", sect: "taichung"},
                {id:"tra_2003", name:"八斗子", estring:"badouzi", sect:"northeast"},
                {id:"tra_6103", name:"海科館", estring:"haikeguan", sect:"northeast"},
                {id:"tra_1903", name:"大華", estring:"dahua", sect:"northeast"},
                {id:"tra_1904", name:"十分", estring:"shifenshihfen", sect:"northeast"},
                {id:"tra_1905", name:"望古", estring:"wanggu", sect:"northeast"},
                {id:"tra_1906", name:"嶺腳", estring:"lingjiao", sect:"northeast"},
                {id:"tra_1907", name:"平溪", estring:"pingxipingsi", sect:"northeast"},
                {id:"tra_1908", name:"菁桐", estring:"jingtong", sect:"northeast"},
                {id:"tra_2212", name:"千甲", estring:"qianjia", sect:"hsinchu"},
                {id:"tra_2213", name:"新莊", estring:"xinzhuang", sect:"hsinchu"},
                {id:"tra_2203", name:"竹中", estring:"zhuzhong", sect:"hsinchu"},
                {id:"tra_2214", name:"六家", estring:"liujia", sect:"hsinchu"},
                {id:"tra_2204", name:"上員", estring:"shangyuan", sect:"hsinchu"},
                {id:"tra_2211", name:"榮華", estring:"ronghua", sect:"hsinchu"},
                {id:"tra_2205", name:"竹東", estring:"zhudong", sect:"hsinchu"},
                {id:"tra_2206", name:"橫山", estring:"zhuzhong", sect:"hsinchu"},
                {id:"tra_2207", name:"九讚頭", estring:"jiouzantou", sect:"hsinchu"},
                {id:"tra_2208", name:"合興", estring:"hexinghesing", sect:"hsinchu"},
                {id:"tra_2209", name:"富貴", estring:"fuguei", sect:"hsinchu"},
                {id:"tra_2210", name:"內灣", estring:"neiwan", sect:"hsinchu"},
                {id:"tra_2702", name:"源泉", estring:"yuanciyuanyuanquan", sect:"changhua"},
                {id:"tra_2703", name:"濁水", estring:"zhuoshuijhoushuei", sect:"changhua"},
                {id:"tra_2704", name:"龍泉", estring:"longquanlungcyuan", sect:"changhua"},
                {id:"tra_2705", name:"集集", estring:"jiji", sect:"changhua"},
                {id:"tra_2706", name:"水里", estring:"shuilishueili", sect:"changhua"},
                {id:"tra_2707", name:"車埕", estring:"checheng", sect:"changhua"},
                {id:"tra_5101", name:"長榮大學", estring:"changrongdaxuechangjungchristianuniversity", sect:"tainan"},
                {id:"tra_5102", name:"沙崙", estring:"shalun", sect:"tainan"}
            ],
            line: [
            	{
            		id: "tra_xibu",
                    name: "西部幹線(基隆-竹南)",
                    trainSect: ["keelung", "taipei", "taoyuan", "hsinchu"],
                    color: "#000050",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_yilan": {station: "tra_1002", dir: "0"},
                        "tra_shan": {station: "tra_1028", dir: "1"},
                        "tra_hai": {station: "tra_1028", dir: "1"},
                        "tra_liujia": {station: "tra_1025", dir: "0"}
                    },
            		station: ["tra_1001","tra_1029","tra_1002","tra_1003","tra_1030","tra_1004","tra_1005","tra_1031","tra_1006","tra_1007","tra_1008","tra_1009","tra_1011","tra_1032","tra_1012","tra_1034","tra_1013","tra_1014",//taipei
                        "tra_1015","tra_1016","tra_1017","tra_1018","tra_1019","tra_1020","tra_1036","tra_1033","tra_1021","tra_1022","tra_1023","tra_1024","tra_1025","tra_1035","tra_1026","tra_1027","tra_1028"]
            	}, {
            		id: "tra_shan",
                    name: "山線(竹南-彰化)",
                    trainSect: ["hsinchu", "miaoli", "taichung", "changhua"],
                    color: "#104020",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_xibu": {station: "tra_1028", dir: "0"},
                        "tra_zhjy": {station: "tra_1120", dir: "1"}
                    },
            		station: ["tra_1028","tra_1302","tra_1304","tra_1305","tra_1307","tra_1308","tra_1310","tra_1314","tra_1315","tra_1317", "tra_1325",
                        "tra_1318","tra_1326","tra_1327","tra_1323","tra_1328","tra_1319","tra_1329","tra_1322","tra_1320","tra_1324","tra_1321","tra_1120"]
            	}, {
            		id: "tra_zhjy",
                    name: "西部幹線(彰化-嘉義)",
                    trainSect: ["changhua", "yunlin", "chiayi"],
                    color: "#707010",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_shan": {station: "tra_1120", dir: "0"},
                        "tra_hai": {station: "tra_1120", dir: "0"},
                        "tra_jiji": {station: "tra_1207", dir: "1"},
                        "tra_jygx": {station: "tra_1215", dir: "1"}
                    },
            		station: ["tra_1120","tra_1202","tra_1240","tra_1203","tra_1204","tra_1205","tra_1206","tra_1207","tra_1208","tra_1209","tra_1210","tra_1211","tra_1212","tra_1213","tra_1214","tra_1241","tra_1215"]
            	}, {
            		id: "tra_jygx",
                    name: "西部幹線(嘉義-高雄)",
                    trainSect: ["chiayi", "tainan", "kaohsiung"],
                    color: "#302040",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_zhjy": {station: "tra_1215", dir: "0"},
                        "tra_pingdong": {station: "tra_1238", dir: "1"},
                        "tra_shalun": {station: "tra_1230", dir: "1"}
                    },
            		station: ["tra_1215","tra_1217","tra_1218","tra_1219","tra_1220","tra_1221","tra_1222","tra_1223","tra_1224","tra_1225","tra_1244","tra_1226","tra_1227","tra_1239","tra_1228",
                        "tra_1229","tra_1243","tra_1230","tra_1231","tra_1232","tra_1233","tra_1234","tra_1235","tra_1242","tra_1236","tra_1245","tra_1246","tra_1237","tra_1247","tra_1238"]
            	}, {
            		id: "tra_pingdong",
                    name: "屏東線",
                    trainSect: ["kaohsiung", "pingdong"],
                    color: "#7D3810",
            		dir: "1",
                    area: 'w',
                    innerNeedTransAt: 'tra_1411',
                    link: {
                        "tra_jygx": {station: "tra_1238", dir: "0"}
                    },
            		station: ["tra_1238","tra_1419","tra_1420","tra_1421","tra_1402","tra_1403","tra_1404","tra_1405","tra_1406","tra_1407","tra_1408","tra_1409",
                        "tra_1410","tra_1411","tra_1412","tra_1413","tra_1414","tra_1415","tra_1416","tra_1417","tra_1418"]
            	}, {
            		id: "tra_yilan",
                    name: "宜蘭線",
                    trainSect: ["taipei", "keelung", "northeast", "yilan"],
                    color: "#500000",
            		dir: "0",
                    area: 'e',
                    link: {
                        "tra_xibu": {station: "tra_1002", dir: "1"},
                        "tra_beihui": {station: "tra_1826", dir: "0"},
                        "tra_pingxi": {station: "tra_1804", dir: "0"}
                    },
                    //commonCrossLineStation: ["tra_1012","tra_1032","tra_1011","tra_1009","tra_1008","tra_1007","tra_1006","tra_1031","tra_1005","tra_1004","tra_1030","tra_1003"],
            		station: ["tra_1002","tra_1802","tra_1803","tra_1804","tra_1805","tra_1806","tra_1807","tra_1808","tra_1809","tra_1810",//taipei
                        "tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819","tra_1820","tra_1821","tra_1822","tra_1823","tra_1824","tra_1825","tra_1826","tra_1827"]
                }, {
            		id: "tra_beihui",
                    name: "北迴線(蘇澳-花蓮)",
                    trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian"],
                    color: "#004060",
            		dir: "0",
                    area: 'e',
                    link: {
                        "tra_yilan": {station: "tra_1826", dir: "1"},
                        "tra_huadong": {station: "tra_1715", dir: "0"}
                    },
            		station: ["tra_1826","tra_1703","tra_1704","tra_1705","tra_1706","tra_1708","tra_1709","tra_1710","tra_1711","tra_1712","tra_1713","tra_1714","tra_1715"]
                }, {
            		id: "tra_huadong",
                    name: "台東線",
                    trainSect: ["taipei", "keelung", "northeast","yilan","beihui","hualian","taidong"],
                    color: "#605040",
            		dir: "0",
                    area: 'e',
                    link: {
                        "tra_beihui": {station: "tra_1715", dir: "1"}
                    },
            		station: ["tra_1715","tra_1602","tra_1604","tra_1605","tra_1606","tra_1607","tra_1608","tra_1609","tra_1610","tra_1611","tra_1612","tra_1613","tra_1614","tra_1616","tra_1617","tra_1619",
                        "tra_1621","tra_1622","tra_1623","tra_1624","tra_1625","tra_1626","tra_1628","tra_1629","tra_1630","tra_1631","tra_1632"]
                }, {
            		id: "tra_hai",
                    name: "海線",
                    trainSect: ["miaoli","taichung"],
                    color: "#2050C0",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_xibu": {station: "tra_1028", dir: "0"},
                        "tra_zhjy": {station: "tra_1120", dir: "1"}
                    },
            		station: ["tra_1028","tra_1102","tra_1104","tra_1105","tra_1106","tra_1107","tra_1108","tra_1109","tra_1110","tra_1111","tra_1112","tra_1113","tra_1114","tra_1115","tra_1116","tra_1117","tra_1118","tra_1120"]
                }, {
            		id: "tra_pingxi",
                    name: "平溪線",
                    trainSect: ["northeast"],
                    color: "#003030",
            		dir: "0",
                    area: 'e',
                    protectStation: ["tra_1804"],
                    link: {
                        "tra_yilan": {station: "tra_1804", dir: "1"}
                    },
            		station: ["tra_2003","tra_6103","tra_1804","tra_1805","tra_1806","tra_1903","tra_1904","tra_1905","tra_1906","tra_1907","tra_1908"]
                }, {
            		id: "tra_liujia",
                    name: "內灣／六家線",
                    trainSect: ["hsinchu"],
                    color: "#403090",
            		dir: "0",
                    area: 'w',
                    protectStation: ["tra_1024","tra_1025"],
                    protectStationSect: {
                        "tra_1024": "taoyuan,hsinchu"
                    },
                    subWorkingArea: {
                    	transAt: "tra_2203",
                    	transStationID: "zhuzhongtra1",
                    	station: ["tra_2204","tra_2211","tra_2205","tra_2206","tra_2207","tra_2208","tra_2209","tra_2210"]
                    },
                    link: {
                        "tra_xibu": {station: "tra_1025", dir: "1"}
                    },
            		station: ["tra_1025","tra_1024","tra_2212","tra_2213","tra_2203","tra_2214","tra_2204","tra_2211","tra_2205","tra_2206","tra_2207","tra_2208","tra_2209","tra_2210"]
                }, {
            		id: "tra_jiji",
                    name: "集集線",
                    trainSect: ["changhua"],
                    color: "#22A050",
            		dir: "1",
                    area: 'w',
                    link: {
                        "tra_zhjy": {station: "tra_1207", dir: "0"}
                    },
            		station: ["tra_1207","tra_2702","tra_2703","tra_2704","tra_2705","tra_2706","tra_2707"]
                }, {
            		id: "tra_shalun",
                    name: "沙崙線",
                    trainSect: ["tainan"],
                    color: "#124060",
            		dir: "1",
                    area: 'w',
                    protectStation: ["tra_1230"],
                    link: {
                        "tra_jygx": {station: "tra_1230", dir: "0"}
                    },
            		station: ["tra_1230","tra_5101","tra_5102"]
                }
            ]
        },
        trtc: {
            station_ary: [
                //Bannan Line
                {id:"trtc_031", name: "南港展覽館", estring: "nangangzhanlanguantaipeinangangexhibitioncenter"},
                {id:"trtc_097", name: "南港", estring: "nangang"},
                {id:"trtc_096", name: "昆陽", estring: "kunyang"},
                {id:"trtc_095", name: "後山埤", estring: "houshanpi"},
                {id:"trtc_094", name: "永春", estring: "yongchun"},
                {id:"trtc_093", name: "市政府", estring: "taipeicityhallshizhengfu"},
                {id:"trtc_092", name: "國父紀念館", estring: "sunyatsenmemorialhallguofujinianguan"},
                {id:"trtc_091", name: "忠孝敦化", estring: "zhongxiaodunhua"},
                {id:"trtc_010", name: "忠孝復興", estring: "zhongxiaofuxing"},
                {id:"trtc_089", name: "忠孝新生", estring: "zhongxiaoxinsheng"},
                {id:"trtc_088", name: "善導寺", estring: "shandaosishandaotemple"},
                {id:"trtc_086", name: "西門", estring: "ximen"},
                {id:"trtc_085", name: "龍山寺", estring: "longshansilongshantemple"},
                {id:"trtc_084", name: "江子翠", estring: "jiangzicui"},
                {id:"trtc_083", name: "新埔", estring: "xinpu"},
                {id:"trtc_082", name: "板橋", estring: "banqiao"},
                {id:"trtc_081", name: "府中", estring: "fuzhong"},
                {id:"trtc_080", name: "亞東醫院", estring: "yadongyiyuanfareasternhospital"},
                {id:"trtc_079", name: "海山", estring: "haishan"},
                {id:"trtc_078", name: "土城", estring: "tucheng"},
                {id:"trtc_077", name: "永寧", estring: "yongning"},
                {id:"trtc_076", name: "頂埔", estring: "dingpu"},
                //TamsuiXinyi Line
                {id:"trtc_071", name: "淡水", estring: "danshuitamsui"},
                {id:"trtc_070", name: "紅樹林", estring: "hongshulin"},
                {id:"trtc_069", name: "竹圍", estring: "zhuwei"},
                {id:"trtc_068", name: "關渡", estring: "guandu"},
                {id:"trtc_067", name: "忠義", estring: "zhongyi"},
                {id:"trtc_066", name: "復興崗", estring: "fuxinggang"},
                {id:"trtc_064", name: "北投", estring: "beitou"},
                {id:"trtc_063", name: "奇岩", estring: "qiyan"},
                {id:"trtc_062", name: "唭哩岸", estring: "qilian"},
                {id:"trtc_061", name: "石牌", estring: "shipai"},
                {id:"trtc_060", name: "明德", estring: "mingde"},
                {id:"trtc_059", name: "芝山", estring: "zhishan"},
                {id:"trtc_058", name: "士林", estring: "shilin"},
                {id:"trtc_057", name: "劍潭", estring: "jiantan"},
                {id:"trtc_056", name: "圓山", estring: "yuanshan"},
                {id:"trtc_055", name: "民權西路", estring: "mingquanwrdmingquanxilu"},
                {id:"trtc_054", name: "雙連", estring: "shuanglian"},
                {id:"trtc_053", name: "中山", estring: "zhongshan"},
                {id:"trtc_051", name: "台北車站", estring: "taipeichezhantaipeimainstation"},
                {id:"trtc_050", name: "台大醫院", estring: "taidayiyuanntuhospital"},
                {id:"trtc_134", name: "東門", estring: "dongmen"},
                {id:"trtc_103", name: "大安森林公園", estring: "daanparkdaansenlingongyuan"},
                {id:"trtc_011", name: "大安", estring: "daan"},
                {id:"trtc_101", name: "信義安和", estring: "xinyianhe"},
                {id:"trtc_100", name: "台北101/世貿", estring: "taipei101worldtradecentertaipei101shimao"},
                {id:"trtc_099", name: "象山", estring: "xiangshan"},
                //ZhongHeXinLu Line
                {id:"trtc_048", name: "南勢角", estring: "nanshijiao"},
                {id:"trtc_047", name: "景安", estring: "jingan"},
                {id:"trtc_046", name: "永安市場", estring: "yonganshichangyonganmarket"},
                {id:"trtc_045", name: "頂溪", estring: "dingxi"},
                {id:"trtc_131", name: "行天宮", estring: "xingtiantemplexingtiangong"},
                {id:"trtc_130", name: "中山國小", estring: "zhongshanguoxiaozhongshanelementaryschool"},
                {id:"trtc_128", name: "大橋頭", estring: "daqiaotou"},
                {id:"trtc_127", name: "台北橋", estring: "taibeiqiaotaipeibridge"},
                {id:"trtc_126", name: "菜寮", estring: "cailiao"},
                {id:"trtc_125", name: "三重", estring: "sanchong"},
                {id:"trtc_124", name: "先嗇宮", estring: "xiansetemplexiansegong"},
                {id:"trtc_123", name: "頭前庄", estring: "touqianzhuang"},
                {id:"trtc_122", name: "新莊", estring: "xinzhuang"},
                {id:"trtc_121", name: "輔大", estring: "fudafujenuniversity"},
                {id:"trtc_180", name: "丹鳳", estring: "danfeng"},
                {id:"trtc_179", name: "迴龍", estring: "huilong"},
                {id:"trtc_178", name: "三重國小", estring: "sanchongguoxiaosanchongelementaryschool"},
                {id:"trtc_177", name: "三和國中", estring: "sanheguozhongsanhejuniorhighschool"},
                {id:"trtc_176", name: "徐匯中學", estring: "xuhuizhongxuestignatiushighschool"},
                {id:"trtc_175", name: "三民高中", estring: "sanmingaozhongsanminseniorhighschool"},
                {id:"trtc_174", name: "蘆洲", estring: "luzhou"},
                //SongShanXinDian Line
                {id:"trtc_111", name: "松山", estring: "songshan"},
                {id:"trtc_110", name: "南京三民", estring: "nanjingsanmin"},
                {id:"trtc_109", name: "台北小巨蛋", estring: "taipeiarenataibeixiaojudan"},
                {id:"trtc_009", name: "南京復興", estring: "nanjingfuxing"},
                {id:"trtc_132", name: "松江南京", estring: "songjiangnanjing"},
                {id:"trtc_105", name: "北門", estring: "beimen"},
                {id:"trtc_043", name: "小南門", estring: "xiaonanmen"},
                {id:"trtc_042", name: "中正紀念堂", estring: "zhongzhengjiniantangchiangkaishekmemorialhall"},
                {id:"trtc_041", name: "古亭", estring: "guting"},
                {id:"trtc_040", name: "台電大樓", estring: "taidiandaloutaipowerbuilding"},
                {id:"trtc_039", name: "公館", estring: "gongguan"},
                {id:"trtc_038", name: "萬隆", estring: "wanlong"},
                {id:"trtc_037", name: "景美", estring: "jingmei"},
                {id:"trtc_036", name: "大坪林", estring: "dapinglin"},
                {id:"trtc_035", name: "七張", estring: "qizhang"},
                {id:"trtc_034", name: "新店區公所", estring: "xindiandistrictofficexindianqugongsuo"},
                {id:"trtc_033", name: "新店", estring: "xindian"}
            ],
            line: [
                {
                    id: "trtc_5",
                    name: "板南線(5)",
                    color: "#005eb8",
                    dir: "1",
                    outArea: [{
                        dir: "1",
                        station: "trtc_079~trtc_076",
                        transAt: "trtc_080",
                        waitingNextMinute: 4
                    }],
                    station: ["trtc_031","trtc_097","trtc_096","trtc_095","trtc_094","trtc_093","trtc_092","trtc_091","trtc_010","trtc_089","trtc_088","trtc_051","trtc_086","trtc_085","trtc_084","trtc_083","trtc_082","trtc_081","trtc_080","trtc_079","trtc_078","trtc_077","trtc_076"]
                }, {
                    id: "trtc_2",
                    name: "淡水信義線(2)",
                    color: "#cb2c30",
                    dir: "1",
                    outArea: [{
                        dir: "1",
                        station: "trtc_071~trtc_066",
                        transAt: "trtc_064",
                        waitingNextMinute: 4
                    }, {
                        dir: "1",
                        station: "trtc_101~trtc_099",
                        transAt: "trtc_011",
                        waitingNextMinute: 4
                    }],
                    station: ["trtc_071","trtc_070","trtc_069","trtc_068","trtc_067","trtc_066","trtc_064","trtc_063","trtc_062","trtc_061","trtc_060","trtc_059","trtc_058","trtc_057","trtc_056","trtc_055","trtc_054","trtc_053","trtc_051","trtc_050","trtc_042","trtc_134","trtc_103","trtc_011","trtc_101","trtc_100","trtc_099"]
                }, {
                    id: "trtc_3",
                    name: "松山新店線(3)",
                    color: "#007749",
                    dir: "1",
                    outArea: [{
                        dir: "1",
                        station: "trtc_039~trtc_033",
                        transAt: "trtc_040",
                        waitingNextMinute: 4
                    }],
                    station: ["trtc_111","trtc_110","trtc_109","trtc_009","trtc_132","trtc_053","trtc_105","trtc_086","trtc_043","trtc_042","trtc_041","trtc_040","trtc_039","trtc_038","trtc_037","trtc_036","trtc_035","trtc_034","trtc_033"]
                }, {
                    id: "trtc_4",
                    name: "中和新蘆線(4)",
                    color: "#ffa300",
                    dir: "1",
                    splitStation: ['trtc_128'],
                    outArea: [{
                        dir: "1",
                        station: "trtc_127~trtc_179",
                        transAt: "trtc_128",
                        isSubLine: true,
                        waitingNextMinute: 4
                    }, {
                        dir: "1",
                        station: "trtc_178~trtc_174",
                        transAt: "trtc_128",
                        isSubLine: true,
                        waitingNextMinute: 4
                    }],
                    station: ["trtc_048","trtc_047","trtc_046","trtc_045","trtc_041","trtc_134","trtc_089","trtc_132","trtc_131","trtc_130","trtc_055","trtc_128","trtc_127","trtc_126","trtc_125","trtc_124","trtc_123","trtc_122","trtc_121","trtc_180","trtc_179",
                        "trtc_178", "trtc_177", "trtc_176", "trtc_175", "trtc_174"]
                }
            ],
            offset_time: {
                "trtc_5": {
                    "trtc_097": {
                        "LineDir": "1", "trtc_031":-2, "trtc_097":0, "trtc_096":2, "trtc_095":4, "trtc_094":6, "trtc_093":8, "trtc_092":9, "trtc_091":11, "trtc_010":12, "trtc_089":15, "trtc_088":16, "trtc_051":18, "trtc_086":21
                            , "trtc_085":23, "trtc_084":27, "trtc_083":28, "trtc_082":30, "trtc_081":32, "trtc_080":34, "trtc_079":37, "trtc_078":39, "trtc_077":41, "trtc_076":45
                    }
                },
                "trtc_2": {
                    "trtc_071": {
                        "LineDir": "1", "trtc_071":0, "trtc_070":3, "trtc_069":6, "trtc_068":9, "trtc_067":11, "trtc_066":13, "trtc_064":16, "trtc_063":18, "trtc_062":19, "trtc_061":21, "trtc_060":23, "trtc_059":24, "trtc_058":26, "trtc_057":28, "trtc_056":31, "trtc_055":33, "trtc_054":34, "trtc_053":35, "trtc_051":37
                            , "trtc_050":39, "trtc_042":41, "trtc_134":44, "trtc_103":46, "trtc_011":47, "trtc_101":49, "trtc_100":51, "trtc_099":53
                    }
                },
                "trtc_3": {
                    "trtc_111": {
                        "LineDir": "1", "trtc_111":0, "trtc_110":3, "trtc_109":5, "trtc_009":7, "trtc_132":9, "trtc_053":11, "trtc_105":14, "trtc_086":16
                            , "trtc_043":18, "trtc_042":19, "trtc_041":21, "trtc_040":23, "trtc_039":24, "trtc_038":27, "trtc_037":29, "trtc_036":31, "trtc_035":32, "trtc_034":34, "trtc_033":36
                    }
                },
                "trtc_4": {
                    "trtc_048": {
                        "LineDir": "1", "trtc_048":0, "trtc_047":2, "trtc_046":4, "trtc_045":6, "trtc_041":10, "trtc_134":14, "trtc_089":16, "trtc_132":19, "trtc_131":20, "trtc_130":24, "trtc_055":25, "trtc_128":26
                            , "trtc_127":29, "trtc_126":31, "trtc_125":33, "trtc_124":35, "trtc_123":38, "trtc_122":39, "trtc_121":42, "trtc_180":44, "trtc_179":47
                            , "trtc_178":29, "trtc_177":32, "trtc_176":33, "trtc_175":35, "trtc_174":38
                    }
                }
            },
            station_time: {
                "trtc_3": {
                    "trtc_111": {
                        weekday: [
                            [//Xindian to SongShan
                                [],[],[],[],[],[],
                                ["07","13","19","26","30","36","40","43","19","52","57"],
                                ["00","04","07","10","13","16","19","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","06","09","12","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","06","10","12","15","18","22","24","27","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58"],
                                ["03","06","11","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["03","06","09","12","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","06","09","12","16","19","21","24","27","30","33","37","39","42","46","48","51","54","58"],
                                ["01","05","08","11","15","19","22","26","29","33","36","40","43","47","50","54","57"],
                                ["01","04","07","11","15","18","22","25","29","32","36","39","43","46","50","53","57"],
                                ["00","04","07","11","14","18","21","25","28","32","35","39","43","48","52","55"],
                                ["00","05","11","15","24","36","48"],
                                ["00","12","24","35","42","54"]
                            ], [//SongShan to Xindian
                                [],[],[],[],[],[],
                                ["00","04","14","21","27","32","36","40","43","45","49","52","54","57"],
                                ["00","04","07","10","13","16","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","06","09","12","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","07","12","15","19","24","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59"],
                                ["03","07","11","15","19","23","27","31","35","39","43","47","51","54","57"],
                                ["00","03","06","08","12","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57"],
                                ["00","03","06","09","12","15","18","21","24","27","30","33","36","39","42","45","48","51","54","57",],
                                ["00","03","06","09","13","16","20","23","27","30","34","36","40","44","48","51","55","58"],
                                ["02","05","09","12","16","19","23","26","30","33","37","40","44","47","51","54","58"],
                                ["01","05","08","12","15","19","22","26","29","33","36","40","43","47","50","54","57"],
                                ["01","04","08","11","15","18","22","25","28","32","36","39","44","49","52","55"],
                                ["00","06","12","18","24","36","48"],
                                ["00"]
                            ]
                        ]
                    }
                }
            }
        },
        tymetro: {
        	defined: {
        		"CarClass": [
        			{"id": "directly", "name": "直達車", "ename": "Express", "color": "#A1A"},
        			{"id": "normal", "name": "普通車", "ename": "Local", "color": "#33F"}
        		]
        	},
        	sect_ary: ['taoyuan','taipei'],
            station_ary: [
                //Airport Line
                {id:"tymetro_a01", name: "臺北車站", estring: "taipeichezhantaipeimainstation", sect: 'taipei', big: 'd'},
                {id:"tymetro_a02", name: "三重", estring: "sanchong", sect: 'taipei'},
                {id:"tymetro_a03", name: "新北產業園區", estring: "xinbeichanyeyuanqui", sect: 'taipei', big: 'd'},
                {id:"tymetro_a04", name: "新莊副都心", estring: "xinzhungfuduxin", sect: 'taipei'},
                {id:"tymetro_a05", name: "泰山", estring: "taishan", sect: 'taipei'},
                {id:"tymetro_a06", name: "泰山貴和", estring: "taishanguehe", sect: 'taipei'},
                {id:"tymetro_a07", name: "體育大學", estring: "tiyvdaxue", sect: 'taipei'},
                {id:"tymetro_a08", name: "長庚醫院", estring: "changgengyiyuan", sect: 'taoyuan', big: 'd'},
                {id:"tymetro_a09", name: "林口", estring: "linkou", sect: 'taoyuan'},
                {id:"tymetro_a10", name: "山鼻", estring: "shanbi", sect: 'taoyuan'},
                {id:"tymetro_a11", name: "坑口", estring: "kengkou", sect: 'taoyuan'},
                {id:"tymetro_a12", name: "機場第一航廈", estring: "terminal1", sect: 'taoyuan', big: 'd'},
                {id:"tymetro_a13", name: "機場第二航廈", estring: "terminal2", sect: 'taoyuan', big: 'd'},
                {id:"tymetro_a14a", name: "機場旅館", estring: "airporthotel", sect: 'taoyuan'},
                {id:"tymetro_a15", name: "大園", estring: "dayuan", sect: 'taoyuan'},
                {id:"tymetro_a16", name: "橫山", estring: "hengshan", sect: 'taoyuan'},
                {id:"tymetro_a17", name: "領航", estring: "linghang", sect: 'taoyuan'},
                {id:"tymetro_a18", name: "高鐵桃園站", estring: "gaotietaoyuanzhan", sect: 'taoyuan'},
                {id:"tymetro_a19", name: "桃園體育園區", estring: "taoyuantiyuyuanqui", sect: 'taoyuan'},
                {id:"tymetro_a20", name: "興南", estring: "xingnan", sect: 'taoyuan'},
                {id:"tymetro_a21", name: "環北", estring: "huanbei", sect: 'taoyuan'}
            ],
            line: [
                {
                    id: "tymetro_1",
                    name: "機場捷運",
                    trainSect: ["taipei", "taoyuan"],
                    color: "#8e47ad",
                    dir: "1",
                    station: ["tymetro_a01","tymetro_a02","tymetro_a03","tymetro_a04","tymetro_a05","tymetro_a06","tymetro_a07","tymetro_a08","tymetro_a09","tymetro_a10","tymetro_a11","tymetro_a12","tymetro_a13","tymetro_a14a","tymetro_a15","tymetro_a16","tymetro_a17","tymetro_a18","tymetro_a19","tymetro_a20","tymetro_a21"]
                }
            ]
        },
        transStation: [
                {
                    id: 'taidongtra1', name: "台東",
                    changeLine: ["tra_huadong", "tra_huadong"],
                    changeStation: ['tra_1632','tra_1632'],
                    walkMinute: 4
                }, {
                    id: 'yulitra1', name: "玉里",
                    changeLine: ["tra_huadong", "tra_huadong"],
                    changeStation: ['tra_1619','tra_1619'],
                    walkMinute: 4
                }, {
                    id: 'hualiantra1', name: "花蓮",
                    changeLine: ["tra_beihui", "tra_huadong"],
                    changeStation: ['tra_1715','tra_1715'],
                    walkMinute: 4
                }, {
                    id: 'xingcheng', name: "新城",
                    changeLine: ["tra_beihui", "tra_beihui"],
                    changeStation: ['tra_1712','tra_1712'],
                    walkMinute: 2
                }, {
                    id: 'nanaotra1', name: "南澳",
                    changeLine: ["tra_beihui", "tra_beihui"],
                    changeStation: ['tra_1705','tra_1705'],
                    walkMinute: 2
                }, {
                    id: 'suaoxintra1', name: "蘇澳新",
                    changeLine: ["tra_yilan", "tra_beihui"],
                    changeStation: ['tra_1826','tra_1826'],
                    walkMinute: 4
                }, {
                    id: 'luodongtra1', name: "羅東",
                    changeLine: ["tra_yilan", "tra_yilan"],
                    changeStation: ['tra_1823','tra_1823'],
                    walkMinute: 4
                }, {
                    id: 'yilantra1', name: "宜蘭",
                    changeLine: ["tra_yilan", "tra_yilan"],
                    changeStation: ['tra_1820','tra_1820'],
                    walkMinute: 4
                }, {
                    id: 'toucheng1', name: "頭城",
                    changeLine: ["tra_yilan", "tra_yilan"],
                    changeStation: ['tra_1816','tra_1816'],
                    walkMinute: 4
                }, {
                    id: 'ruifangtra1', name: "瑞芳",
                    changeLine: ["tra_yilan", "tra_pingxi"],
                    changeStation: ['tra_1804','tra_1804'],
                    walkMinute: 4
                }, {
                    id: 'badutra1', name: "八堵",
                    changeLine: ["tra_xibu", "tra_yilan"],
                    changeStation: ['tra_1002','tra_1002'],
                    walkMinute: 3
                }, {
                    id: 'qidutra1', name: "七堵",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1003','tra_1003'],
                    walkMinute: 3
                }, {
                    id: 'songshantra1', name: "松山",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1007','tra_1007'],
                    walkMinute: 3
                }, {
                    id: 'taipeitra1', name: "台北",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1008','tra_1008'],
                    walkMinute: 3
                }, {
                    id: 'banqiaotra1', name: "板橋",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1011','tra_1011'],
                    walkMinute: 3
                }, {
                    id: 'taoyuantra1', name: "桃園",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1015','tra_1015'],
                    walkMinute: 3
                }, {
                    id: 'zhonglitra1', name: "中壢",
                    changeLine: ["tra_xibu", "tra_xibu"],
                    changeStation: ['tra_1017','tra_1017'],
                    walkMinute: 3
                }, {
                    id: 'northhsinchutra1', name: "北新竹",
                    changeLine: ["tra_xibu", "tra_liujia"],
                    changeStation: ['tra_1024','tra_1024'],
                    walkMinute: 4
                }, {
                    id: 'hsinchutra1', name: "新竹",
                    changeLine: ["tra_xibu", "tra_liujia"],
                    changeStation: ['tra_1025','tra_1025'],
                    walkMinute: 4
                }, {
                    id: 'zhunantra1', name: "竹南",
                    changeLine: ["tra_xibu", "tra_shan"],
                    changeStation: ['tra_1028','tra_1028'],
                    walkMinute: 3
                }, {
                    id: 'zhunantra2', name: "竹南", changeLine: ["tra_xibu", "tra_hai"], changeStation: ['tra_1028','tra_1028'], walkMinute: 3
                }, {
                    id: 'zhunantra3', name: "竹南", changeLine: ["tra_shan", "tra_hai"], changeStation: ['tra_1028','tra_1028'], walkMinute: 3
                }, {
                    id: 'miaolitra1', name: "苗栗",
                    changeLine: ["tra_shan", "tra_shan"],
                    changeStation: ['tra_1305','tra_1305'],
                    walkMinute: 4
                }, {
                    id: 'fengyuantra1', name: "豐原",
                    changeLine: ["tra_shan", "tra_shan"],
                    changeStation: ['tra_1317','tra_1317'],
                    walkMinute: 4
                }, {
                    id: 'taizhongtra1', name: "台中",
                    changeLine: ["tra_shan", "tra_shan"],
                    changeStation: ['tra_1319','tra_1319'],
                    walkMinute: 4
                }, {
                    id: 'zhanghuatra1', name: "彰化",
                    changeLine: ["tra_shan", "tra_zhjy"],
                    changeStation: ['tra_1120','tra_1120'],
                    walkMinute: 4
                }, {
                    id: 'zhanghuatra2', name: "彰化", changeLine: ["tra_hai", "tra_zhjy"], changeStation: ['tra_1120','tra_1120'], walkMinute: 4
                }, {
                    id: 'zhanghuatra3', name: "彰化", changeLine: ["tra_shan", "tra_hai"], changeStation: ['tra_1120','tra_1120'], walkMinute: 4
                }, {
                    id: 'yuanlintra1', name: "員林",
                    changeLine: ["tra_zhjy", "tra_zhjy"],
                    changeStation: ['tra_1203','tra_1203'],
                    walkMinute: 4
                }, {
                    id: 'douliutra1', name: "斗六",
                    changeLine: ["tra_zhjy", "tra_zhjy"],
                    changeStation: ['tra_1210','tra_1210'],
                    walkMinute: 4
                }, {
                    id: 'jiayitra1', name: "嘉義",
                    changeLine: ["tra_zhjy", "tra_jygx"],
                    changeStation: ['tra_1215','tra_1215'],
                    walkMinute: 4
                }, {
                    id: 'xinyingtra1', name: "新營",
                    changeLine: ["tra_jygx", "tra_jygx"],
                    changeStation: ['tra_1220','tra_1220'],
                    walkMinute: 4
                }, {
                    id: 'tainantra1', name: "台南",
                    changeLine: ["tra_jygx", "tra_shalun"],
                    changeStation: ['tra_1228','tra_1228'],
                    walkMinute: 4
                }, {
                    id: 'zhongzhoutra1', name: "中洲",
                    changeLine: ["tra_jygx", "tra_shalun"],
                    changeStation: ['tra_1230','tra_1230'],
                    walkMinute: 4
                }, {
                    id: 'gangshantra1', name: "岡山",
                    changeLine: ["tra_jygx", "tra_jygx"],
                    changeStation: ['tra_1233','tra_1233'],
                    walkMinute: 4
                }, {
                    id: 'gaoxungtra1', name: "高雄",
                    changeLine: ["tra_jygx", "tra_pingdong"],
                    changeStation: ['tra_1238','tra_1238'],
                    walkMinute: 4
                }, {
                    id: 'fongshantra1', name: "鳳山",
                    changeLine: ["tra_pingdong", "tra_pingdong"],
                    changeStation: ['tra_1402','tra_1402'],
                    walkMinute: 1
                }, {
                    id: 'pingdongtra1', name: "屏東",
                    changeLine: ["tra_pingdong", "tra_pingdong"],
                    changeStation: ['tra_1406','tra_1406'],
                    walkMinute: 1
                }, {
                    id: 'chaozhoutra1', name: "潮州",
                    changeLine: ["tra_pingdong", "tra_pingdong"],
                    changeStation: ['tra_1411','tra_1411'],
                    walkMinute: 1
                }, {
                    id: 'holongtra1', name: "後龍",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1105','tra_1105'],
                    walkMinute: 1
                }, {
                    id: 'tongxiaotra1', name: "通霄",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1109','tra_1109'],
                    walkMinute: 1
                }, {
                    id: 'yuanlitra1', name: "苑裡",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1110','tra_1110'],
                    walkMinute: 1
                }, {
                    id: 'dajiatra1', name: "大甲",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1112','tra_1112'],
                    walkMinute: 1
                }, {
                    id: 'qingshuitra1', name: "清水",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1114','tra_1114'],
                    walkMinute: 1
                }, {
                    id: 'shalutra1', name: "沙鹿",
                    changeLine: ["tra_hai", "tra_hai"],
                    changeStation: ['tra_1115','tra_1115'],
                    walkMinute: 1
                }, {
                    id: 'zhuzhongtra1', name: "竹中",
                    changeLine: ["tra_liujia", "tra_liujia"],
                    changeStation: ['tra_2203','tra_2203'],
                    walkMinute: 3
                }, {
                    id: 'nangang1', name: "南港",
                    changeLine: ["tra_xibu", "trtc_5"],
                    changeStation: ['tra_1006','trtc_097'],
                    video: {
                        "tra_1006": {width:420, height:315, src:'https://www.youtube.com/embed/AIQETgZdBKM'},
                        "trtc_097": {width:420, height:315, src:'https://www.youtube.com/embed/HNBdfyBxMa8'}
                    },
                    walkMinute: 5
                }, {
                    id: 'songshan1', name: "松山",
                    changeLine: ["tra_xibu", "trtc_3"],
                    changeStation: ['tra_1007','trtc_111'],
                    video: {
                        "tra_1007": {width:420, height:315, src:'https://www.youtube.com/embed/CFX9EdLwT9A'},
                        "trtc_111": {width:420, height:315, src:'https://www.youtube.com/embed/64ADnwMTLyQ'}
                    },
                    walkMinute: 6
                }, {
                    id: 'ximen1', name: "西門",
                    changeLine: ["trtc_5", "trtc_3"],
                    changeStation: ['trtc_086','trtc_086'],
                    walkMinute: 1
                }, {
                    id: 'zhongshan1', name: "中山",
                    changeLine: ["trtc_3", "trtc_2"],
                    changeStation: ['trtc_053','trtc_053'],
                    walkMinute: 2
                }, {
                    id: 'taipei1', name: "台北",
                    changeLine: ["tra_xibu", "trtc_5"],
                    changeStation: ['tra_1008','trtc_051'],
                    walkMinute: 7
                }, {
                    id: 'taipei2', name: "台北",
                    changeLine: ["tra_xibu", "trtc_2"],
                    changeStation: ['tra_1008','trtc_051'],
                    walkMinute: 4
                }, {
                    id: 'taipei3', name: "台北",
                    changeLine: ["trtc_5", "trtc_2"],
                    changeStation: ['trtc_051','trtc_051'],
                    walkMinute: 3
                }, {
                    id: 'taipei4', name: "台北",//機捷台鐵
                    changeLine: ["tra_xibu", "tymetro_1"],
                    changeStation: ['tra_1008','tymetro_a01'],
                    video: {
                        "tra_1008": {width:420, height:315, src:'https://www.youtube.com/embed/dxfIJJ0b_3o'},
                        "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/ulOu7N85QRo'}
                    },
                    walkMinute: 7
                }, {
                    id: 'taipei5', name: "台北",//機捷淡水線
                    changeLine: ["trtc_2", "tymetro_1"],
                    changeStation: ['trtc_051','tymetro_a01'],
                    video: {
                        "trtc_2": {width:420, height:315, src:'https://www.youtube.com/embed/gq7FJbhUN7U'},
                        "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/A6PPO4zqxJI'}
                    },
                    walkMinute: 12
                }, {
                    id: 'taipei6', name: "台北",//機捷板南線
                    changeLine: ["trtc_5", "tymetro_1"],
                    changeStation: ['trtc_051','tymetro_a01'],
                    video: {
                        "trtc_5": {width:420, height:315, src:'https://www.youtube.com/embed/n7FgZ1-sDyk'},
                        "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/uaLbpXkDiX4'}
                    },
                    walkMinute: 11
                }, {
                    id: 'taipei7', name: "北門",//機捷松山線
                    changeLine: ["trtc_3", "tymetro_1"],
                    changeStation: ['trtc_105','tymetro_a01'],
                    video: {
                        "trtc_105": {width:420, height:315, src:'https://www.youtube.com/embed/X_sjsSHqsoU'},
                        "tymetro_a01": {width:420, height:315, src:'https://www.youtube.com/embed/g5nm5Sbn6bw'}
                    },
                    walkMinute: 11
                }, {
                    id: 'sanchong1', name: "三重",//機捷新莊線
                    changeLine: ["trtc_4", "tymetro_1"],
                    changeStation: ['trtc_125','tymetro_a02'],
                    walkMinute: 7
                }, {
                    id: 'cksmh1', name: "中正紀念堂",
                    changeLine: ["trtc_3", "trtc_2"],
                    changeStation: ['trtc_042','trtc_042'],
                    walkMinute: 1
                }, {
                    id: 'banqiao1', name: "板橋",
                    changeLine: ["tra_xibu", "trtc_5"],
                    changeStation: ['tra_1011','trtc_082'],
                    walkMinute: 7
                }, {
                    id: 'mqxl1', name: "民權西路",
                    changeLine: ["trtc_2", "trtc_4"],
                    changeStation: ['trtc_055','trtc_055'],
                    walkMinute: 3
                }, {
                    id: 'dongmen1', name: "東門",
                    changeLine: ["trtc_2", "trtc_4"],
                    changeStation: ['trtc_134','trtc_134'],
                    walkMinute: 1
                }, {
                    id: 'guting1', name: "古亭",
                    changeLine: ["trtc_3", "trtc_4"],
                    changeStation: ['trtc_041','trtc_041'],
                    walkMinute: 1
                }, {
                    id: 'zhongxiaoxs1', name: "忠孝新生",
                    changeLine: ["trtc_5", "trtc_4"],
                    changeStation: ['trtc_089','trtc_089'],
                    walkMinute: 2
                }, {
                    id: 'sjnanjing1', name: "松江南京",
                    changeLine: ["trtc_3", "trtc_4"],
                    changeStation: ['trtc_132','trtc_132'],
                    walkMinute: 2
                }, {
                    id: 'daqiaotou1', name: "大橋頭",
                    changeLine: ["trtc_4", "trtc_4"],
                    changeStation: ['trtc_128','trtc_128'],
                    walkMinute: 1
                }, {
                    id: 'changgengyiyuan1', name: "長庚醫院",
                    changeLine: ["tymetro_1", "tymetro_1"],
                    changeStation: ['tymetro_a08','tymetro_a08'],
                    walkMinute: 0
                }
        ],
        routeMap: [
            {
                id: 'traInnerTrans_tra_xibu,tra_jygx',
                fromToLine: ["tra_xibu","tra_jygx"],
                sect: ['keelung','taipei','taoyuan','hsinchu','chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["qidutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["songshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["taipeitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["banqiaotra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["taoyuantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["zhonglitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_jygx"],
                        transStation: ["hsinchutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["jiayitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["xinyingtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["tainantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["gangshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["gaoxungtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_zhjy',
                fromToLine: ["tra_xibu","tra_zhjy"],
                sect: ['keelung','taipei','taoyuan','hsinchu','changhua','yunlin','chiayi'],
                route: [
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["qidutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["songshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["taipeitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["banqiaotra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["taoyuantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["zhonglitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["hsinchutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["zhunantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["zhanghuatra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["yuanlintra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["douliutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_zhjy"],
                        transStation: ["jiayitra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_shan',
                fromToLine: ["tra_xibu","tra_shan"],
                sect: ['keelung','taipei','taoyuan','hsinchu','miaoli','taichung','changhua'],
                route: [
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["qidutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["songshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["taipeitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["banqiaotra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["taoyuantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["zhonglitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_xibu"],
                        transStation: ["hsinchutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_shan"],
                        transStation: ["zhunantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_shan"],
                        transStation: ["miaolitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_shan"],
                        transStation: ["fengyuantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_shan"],
                        transStation: ["taizhongtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_shan"],
                        transStation: ["zhanghuatra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_shan,tra_zhjy',
                fromToLine: ["tra_shan","tra_zhjy"],
                sect: ['miaoli','taichung','changhua','yunlin','chiayi'],
                route: [
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["miaolitra1"]
                    },
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["fengyuantra1"]
                    },
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["taizhongtra1"]
                    },
                    {
                        line: ["tra_shan", "tra_zhjy"],
                        transStation: ["zhanghuatra1"]
                    },
                    {
                        line: ["tra_shan", "tra_zhjy"],
                        transStation: ["yuanlintra1"]
                    },
                    {
                        line: ["tra_shan", "tra_zhjy"],
                        transStation: ["douliutra1"]
                    },
                    {
                        line: ["tra_shan", "tra_zhjy"],
                        transStation: ["jiayitra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_shan,tra_jygx',
                fromToLine: ["tra_shan","tra_jygx"],
                sect: ['miaoli','taichung','changhua','chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["miaolitra1"]
                    },
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["fengyuantra1"]
                    },
                    {
                        line: ["tra_shan", "tra_shan"],
                        transStation: ["taizhongtra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["zhanghuatra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["jiayitra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["xinyingtra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["tainantra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["gangshantra1"]
                    },
                    {
                        line: ["tra_shan", "tra_jygx"],
                        transStation: ["gaoxungtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_zhjy,tra_jygx',
                fromToLine: ["tra_zhjy","tra_jygx"],
                sect: ['changhua','yunlin','chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_zhjy", "tra_zhjy"],
                        transStation: ["zhanghuatra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_zhjy"],
                        transStation: ["yuanlintra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_zhjy"],
                        transStation: ["douliutra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_jygx"],
                        transStation: ["jiayitra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_jygx"],
                        transStation: ["xinyingtra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_jygx"],
                        transStation: ["tainantra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_jygx"],
                        transStation: ["gangshantra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_jygx"],
                        transStation: ["gaoxungtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_jygx,tra_pingdong',
                fromToLine: ["tra_jygx","tra_pingdong"],
                sect: ['chiayi','tainan','kaohsiung','pingdong'],
                route: [
                    {
                        line: ["tra_jygx", "tra_pingdong"],
                        transStation: ["gaoxungtra1"]
                    },
                    {
                        line: ["tra_pingdong", "tra_pingdong"],
                        transStation: ["fongshantra1"]
                    },
                    {
                        line: ["tra_pingdong", "tra_pingdong"],
                        transStation: ["chaozhoutra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_pingdong',
                fromToLine: ["tra_pingdong","tra_pingdong"],
                sect: ['kaohsiung','pingdong'],
                route: [
                    {
                        line: ["tra_pingdong", "tra_pingdong"],
                        transStation: ["chaozhoutra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_yilan,tra_beihui',
                fromToLine: ["tra_yilan","tra_beihui"],
                sect: ['northeast','yilan','beihui','hualian'],
                route: [
                    {
                        line: ["tra_beihui", "tra_beihui"],
                        transStation: ["hualiantra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_beihui"],
                        transStation: ["suaoxintra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["luodongtra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["yilantra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["ruifangtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_yilan,tra_huadong',
                fromToLine: ["tra_yilan","tra_huadong"],
                sect: ['northeast','yilan','beihui','hualian','taidong'],
                route: [
                    {
                        line: ["tra_huadong", "tra_huadong"],
                        transStation: ["taidongtra1"]
                    },
                    {
                        line: ["tra_huadong", "tra_huadong"],
                        transStation: ["yulitra1"]
                    },
                    {
                        line: ["tra_beihui", "tra_huadong"],
                        transStation: ["hualiantra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_beihui"],
                        transStation: ["suaoxintra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["luodongtra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["yilantra1"]
                    },
                    {
                        line: ["tra_yilan", "tra_yilan"],
                        transStation: ["ruifangtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_beihui,tra_huadong',
                fromToLine: ["tra_beihui","tra_huadong"],
                sect: ['yilan','beihui','hualian','taidong'],
                route: [
                    {
                        line: ["tra_huadong", "tra_huadong"],
                        transStation: ["taidongtra1"]
                    },
                    {
                        line: ["tra_huadong", "tra_huadong"],
                        transStation: ["yulitra1"]
                    },
                    {
                        line: ["tra_beihui", "tra_huadong"],
                        transStation: ["hualiantra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_yilan,tra_pingxi',
                fromToLine: ["tra_yilan","tra_pingxi"],
                fromToLineReg: [
                	"^tra_pingxi$",
                	"^tra_yilan$|^tra_beihui$|^tra_huadong$"
                ],
                sect: ['northeast','yilan','beihui','hualian','taidong'],
                route: [
                    {
                        line: ["tra_yilan", "tra_pingxi"],
                        transStation: ["ruifangtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_yilan',
                fromToLine: ["tra_xibu","tra_yilan"],
                fromToLineReg: [
                	"^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_shalun$",
                	"^tra_yilan$|^tra_beihui$|^tra_huadong$"
                ],
                sect: ['kaohsiung','tainan','chiayi','yunlin','changhua','taichung','miaoli','hsinchu','taoyuan','taipei','keelung','northeast','yilan','beihui','hualian','taidong'],
                route: [
                    {
                        line: ["tra_xibu", "tra_yilan"],
                        transStation: ["banqiaotra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan"],
                        transStation: ["taipeitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan"],
                        transStation: ["songshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan"],
                        transStation: ["qidutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan"],
                        transStation: ["badutra1"]
                    }
                ]
            /*}, {
                id: 'traInnerTrans_tra_xibu,tra_beihui',
                fromToLine: ["tra_xibu","tra_beihui"],
                sect: ['taoyuan','taipei','keelung','northeast','yilan','beihui','hualian'],
                route: [
                    {
                        line: ["tra_xibu", "tra_beihui"],
                        transStation: ["banqiaotra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_beihui"],
                        transStation: ["taipeitra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_beihui"],
                        transStation: ["songshantra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_beihui"],
                        transStation: ["qidutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_beihui"],
                        transStation: ["badutra1"]
                    }
                ]*/
            }, {
                id: 'traInnerTrans_tra_shan,tra_pingxi',
                fromToLine: ["tra_shan","tra_pingxi"],
                fromToLineReg: [
                	"^tra_shan$|^tra_zhjy$|^tra_jygx$",
                	"^tra_pingxi$"
                ],
                sect: ['northeast','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_shan", "tra_pingxi"],
                        transStation: ["banqiaotra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_pingxi',
                fromToLine: ["tra_xibu","tra_pingxi"],
                fromToLineReg: [
                	"^tra_xibu$|^tra_shan$|^tra_zhjy$|^tra_jygx$",
                	"^tra_pingxi$"
                ],
                sect: ['hsinchu','taoyuan','taipei','keelung','northeast'],
                route: [
                    {
                        line: ["tra_yilan", "tra_pingxi"],
                        transStation: ["ruifangtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["banqiaotra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["taipeitra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["songshantra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["qidutra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["badutra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_shan", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["banqiaotra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_zhjy", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["banqiaotra1", "ruifangtra1"]
                    },
                    {
                        line: ["tra_jygx", "tra_yilan" ,"tra_pingxi"],
                        transStation: ["banqiaotra1", "ruifangtra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_liujia',
                fromToLine: ["tra_xibu","tra_liujia"],
                sect: ['hsinchu','taoyuan','taipei','keelung','northeast'],
                route: [
                    {
                        line: ["tra_xibu", "tra_liujia"],
                        transStation: ["hsinchutra1"]
                    },
                    {
                        line: ["tra_xibu", "tra_liujia"],
                        transStation: ["northhsinchutra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_shan,tra_liujia',
                fromToLine: ["tra_shan","tra_liujia"],
                fromToLineReg: [
                	"^tra_shan$|^tra_zhjy$|^tra_jygx$",
                	"^tra_liujia$"
                ],
                sect: ['hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_xibu", "tra_liujia"],
                        transStation: ["hsinchutra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_yilan,tra_liujia',
                fromToLine: ["tra_yilan","tra_liujia"],
                fromToLineReg: [
                	"^tra_liujia$",
                	"^tra_yilan$|^tra_beihui$|^tra_huadong$"
                ],
                sect: ['hsinchu','yilan','northeast','beihui','hualian','taidong'],
                route: [
                    {
                        line: ["tra_yilan", "tra_xibu"],
                        transStation: ["banqiaotra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_jygx,tra_shalun',
                fromToLine: ["tra_jygx","tra_shalun"],
                sect: ['chiayi','tainan','kaohsiung'],
                route: [
                    {
                        line: ["tra_jygx", "tra_shalun"],
                        transStation: ["zhongzhoutra1"]
                    },
                    {
                        line: ["tra_jygx", "tra_shalun"],
                        transStation: ["tainantra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_xibu,tra_shalun',
                fromToLine: ["tra_xibu","tra_shalun"],
                fromToLineReg: [
                	"^tra_xibu$|^tra_shan$|^tra_zhjy$",
                	"^tra_shalun$"
                ],
                sect: ['northeast','keelung','taipei','taoyuan','hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan'],
                route: [
                    {
                        line: ["tra_xibu", "tra_shalun"],
                        transStation: ["tainantra1"]
                    }
                ]
            }, {//TRA sub line to sub line
                id: 'traInnerTrans_tra_pingxi,tra_liujia',
                fromToLine: ["tra_pingxi","tra_liujia"],
                sect: ['hsinchu','northeast'],
                route: [
                    {
                        line: ["tra_pingxi", "tra_xibu", "tra_yilan" ,"tra_liujia"],
                        transStation: ["ruifangtra1", "banqiaotra1", "hsinchutra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_pingxi,tra_shalun',
                fromToLine: ["tra_pingxi","tra_shalun"],
                sect: ['northeast','tainan'],
                route: [
                    {
                        line: ["tra_pingxi", "tra_yilan", "tra_xibu" ,"tra_shalun"],
                        transStation: ["ruifangtra1", "banqiaotra1", "tainantra1"]
                    }
                ]
            }, {
                id: 'traInnerTrans_tra_liujia,tra_shalun',
                fromToLine: ["tra_liujia","tra_shalun"],
                sect: ['hsinchu','tainan'],
                route: [
                    {
                        line: ["tra_liujia", "tra_xibu","tra_shalun"],
                        transStation: ["hsinchutra1", "tainantra1"]
                    }
                ]
            }, {//TRA to TRTC
                id: 'tra_xibu,trtc_3',
                fromToLine: ["tra_xibu","trtc_3"],
                sect: ['taipei','keelung','taoyuan','hsinchu'],
                route: [
                    {
                        bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
                        line: ["tra_xibu", "trtc_3"],
                        transStation: ["songshan1"]
                    },
                    {
                        bypassStationReg: '^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$',
                        line: ["tra_xibu", "trtc_2", "trtc_3"],
                        transStation: ["taipei2", "zhongshan1"]
                    },
                    {
                        line: ["tra_xibu", "trtc_5", "trtc_3"],
                        transStation: ["banqiao1", "ximen1"]
                    },
                    {
                        bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_053$|^trtc_105$|^trtc_086$',
                        line: ["tra_xibu", "trtc_2", "trtc_3"],
                        transStation: ["taipei2", "cksmh1"]
                    }
                ]
            }, {
                id: 'tra_xibu,trtc_5',
                fromToLine: ["tra_xibu","trtc_5"],
                sect: ['taipei','keelung','taoyuan','hsinchu'],
                route: [
                    {
                        bypassStationReg: '^trtc_08[0-2]$|^trtc_07[6-9]$',
                        line: ["tra_xibu", "trtc_5"],
                        transStation: ["nangang1"]
                    },
                    {
                        line: ["tra_xibu", "trtc_5"],
                        transStation: ["taipei1"]
                    },
                    {
                        bypassStationReg: '^trtc_031$|^trtc_097$|^trtc_096$',
                        line: ["tra_xibu", "trtc_5"],
                        transStation: ["banqiao1"]
                    }
                ]
            }, {
                id: 'tra_xibu,trtc_2',
                fromToLine: ["tra_xibu","trtc_2"],
                sect: ['taipei','keelung','taoyuan','hsinchu'],
                route: [
                    {
                        line: ["tra_xibu", "trtc_2"],
                        transStation: ["taipei2"]
                    }
                ]
            }, {
                id: 'tra_xibu,trtc_4',
                fromToLine: ["tra_xibu","trtc_4"],
                sect: ['taipei','keelung','taoyuan','hsinchu'],
                route: [
                    {
                        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["tra_xibu", "trtc_2", "trtc_4"],
                        transStation: ["taipei2", "dongmen1"]
                    },
                    {
                        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                        line: ["tra_xibu", "trtc_2", "trtc_4"],
                        transStation: ["taipei2", "mqxl1"]
                    },
                    {
                        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["tra_xibu", "trtc_2", "trtc_3", "trtc_4"],
                        transStation: ["taipei2", "cksmh1", "guting1"]
                    },
                    {
                        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                        line: ["tra_xibu", "trtc_3", "trtc_4"],
                        transStation: ["songshan1","sjnanjing1"]
                    }
                ]
            }, {//TRA to TTYMETRO
                id: 'tra_xibu,tymetro_1',
                fromToLine: ["tra_xibu","tymetro_1"],
                sect: ['taipei','keelung','taoyuan','hsinchu'],
                route: [
                    {
                        line: ["tra_xibu", "tymetro_1"],
                        transStation: ["taipei4"]
                    }
                ]
            }, {
            //TRTC inner trans
                id: 'trtc_5,trtc_2',
                fromToLine: ["trtc_5","trtc_2"],
                sect: ['taipei'],
                route: [
                    {
                        line: ["trtc_5", "trtc_2"],
                        transStation: ["taipei3"]
                    },
                    {
                        bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_05[1-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
                        line: ["trtc_5", "trtc_3", "trtc_2"],
                        transStation: ["ximen1", "cksmh1"]
                    }
                ]
            }, {
                id: 'trtc_4,trtc_2',
                fromToLine: ["trtc_4","trtc_2"],
                sect: ['taipei'],
                route: [
                    {
                        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["trtc_4", "trtc_2"],
                        transStation: ["dongmen1"]
                    },
                    {
                        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                        line: ["trtc_4", "trtc_2"],
                        transStation: ["mqxl1"]
                    },
                    {
                        bypassBothStationReg: '^trtc_05[0-4]$|^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["trtc_4", "trtc_3", "trtc_2"],
                        transStation: ["guting1", "cksmh1"]
                    }
                ]
            }, {
                id: 'trtc_3,trtc_2',
                fromToLine: ["trtc_3","trtc_2"],
                sect: ['taipei'],
                route: [
                    {
                        bypassBothStationReg: '^trtc_105$|^trtc_132$|^trtc_009$|^trtc_11[0-1]$|^trtc_109$|^trtc_05[0-9]$|^trtc_06[0-9]$|^trtc_07[0-1]$',
                        line: ["trtc_3", "trtc_2"],
                        transStation: ["cksmh1"]
                    },
                    {
                        bypassStationReg: '^trtc_04[0-3]$|^trtc_03[2-9]$',
                        line: ["trtc_3", "trtc_2"],
                        transStation: ["zhongshan1"]
                    }
                ]
            }, {
                id: 'trtc_3,trtc_5',
                fromToLine: ["trtc_3","trtc_5"],
                sect: ['taipei'],
                route: [
                    {
                        line: ["trtc_3", "trtc_5"],
                        transStation: ["ximen1"]
                    },
                    {
                        bypassStationReg: '^trtc_07[6-9]$|^trtc_08[0-9]$|^trtc_09[1-5]$|^trtc_05[1-3]$|^trtc_010$|^trtc_03[2-9]$|^trtc_04[0-3]$|^trtc_132$',
                        line: ["trtc_3", "tra_xibu", "trtc_5"],
                        transStation: ["songshan1", "nangang1"]
                    }
                ]
            }, {
                id: 'trtc_4,trtc_5',
                fromToLine: ["trtc_4","trtc_5"],
                sect: ['taipei'],
                route: [
                    {
                        line: ["trtc_4", "trtc_5"],
                        transStation: ["zhongxiaoxs1"]
                    },
                    {
                        bypassBothStationReg: '^trtc_08[8-9]$|^trtc_010$|^trtc_09[1-7]$|^trtc_031$|^trtc_051$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
                        line: ["trtc_4", "trtc_3", "trtc_5"],
                        transStation: ["guting1", "ximen1"]
                    }
                ]
            }, {
                id: 'trtc_3,trtc_4',
                fromToLine: ["trtc_3","trtc_4"],
                sect: ['taipei'],
                route: [
                    {
                        bypassBothStationReg: '^trtc_009$|^trtc_109$|^trtc_11[0-1]$|^trtc_105$|^trtc_053$|^trtc_055$|^trtc_13[0-2]$|^trtc_12[1-8]$|^trtc_17[4-9]$|^trtc_180$',
                        line: ["trtc_3", "trtc_4"],
                        transStation: ["guting1"]
                    },
                    {
                        bypassBothStationReg: '^trtc_04[5-8]$|^trtc_105$|^trtc_086$|^trtc_04[0-3]$|^trtc_03[2-9]$|^trtc_134$|^trtc_089$',
                        line: ["trtc_3", "trtc_4"],
                        transStation: ["sjnanjing1"]
                    }
                ]
            }, {
                id: 'trtc_4,trtc_4',
                fromToLine: ["trtc_4","trtc_4"],
                sect: ['taipei'],
                route: [
                    {
                        line: ["trtc_4", "trtc_4"],
                        transStation: ["daqiaotou1"]
                    }
                ]
            }, {//TYMETRO to TRTC
                id: 'tymetro_1,trtc_3',
                fromToLine: ["tymetro_1","trtc_3"],
                sect: ['taipei','taoyuan'],
                route: [
                    {
                        line: ["tymetro_1", "trtc_3"],
                        transStation: ["taipei7"]
                    },
                    {
                        bypassStationReg: '^trtc_111$|^trtc_110$|^trtc_109$|^trtc_009$|^trtc_132$|^trtc_105$|^trtc_086$',
                        line: ["tymetro_1", "trtc_2", "trtc_3"],
                        transStation: ["taipei5", "cksmh1"]
                    }
                ]
            }, {
                id: 'tymetro_1,trtc_5',
                fromToLine: ["tymetro_1","trtc_5"],
                sect: ['taipei','taoyuan'],
                route: [
                    {
                        line: ["tymetro_1", "trtc_5"],
                        transStation: ["taipei6"]
                    }
                ]
            }, {
                id: 'tymetro_1,trtc_2',
                fromToLine: ["tymetro_1","trtc_2"],
                sect: ['taipei','taoyuan'],
                route: [
                    {
                        line: ["tymetro_1", "trtc_2"],
                        transStation: ["taipei5"]
                    }
                ]
            }, {
                id: 'tymetro_1,trtc_4',
                fromToLine: ["tymetro_1","trtc_4"],
                sect: ['taipei','taoyuan'],
                route: [
                    {
                        bypassStationReg: '^trtc_17[4-8]$',
                        line: ["tymetro_1", "trtc_4"],
                        transStation: ["sanchong1"]
                    },
                    {
                        bypassStationReg: '^trtc_089$|^trtc_055$|^trtc_041$|^trtc_04[5-8]$|^trtc_12[1-8]$|^trtc_180$|^trtc_179$|^trtc_13[0-1]$',
                        line: ["tymetro_1", "trtc_4", "trtc_4"],
                        transStation: ["sanchong1", "daqiaotou1"]
                    },
                    {
                        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["tymetro_1", "trtc_2", "trtc_4"],
                        transStation: ["taipei5", "dongmen1"]
                    },
                    {
                        bypassStationReg: '^trtc_132$|^trtc_089$|^trtc_134$|^trtc_041$|^trtc_04[5-8]$',
                        line: ["tymetro_1", "trtc_2", "trtc_4"],
                        transStation: ["taipei5", "mqxl1"]
                    },
                    {
                        bypassStationReg: '^trtc_089$|^trtc_13[0-2]$|^trtc_055$|^trtc_12[1-8]$|^trtc_180$|^trtc_17[4-9]$',
                        line: ["tymetro_1", "trtc_2", "trtc_3", "trtc_4"],
                        transStation: ["taipei5", "cksmh1", "guting1"]
                    }
                ]
            }, {//TYMETRO Route
                id: 'tymetroInnerTrans_tymetro_1,tymetro_1',
                fromToLine: ["tymetro_1","tymetro_1"],
                sect: ['taoyuan','taipei'],
                route: [
                    {
                        line: ["tymetro_1", "tymetro_1"],
                        transStation: ["changgengyiyuan1"]
                    }
                ]
            }
        ],
        routeSystem: [
            {
                id: 'tra_r1',
                rType: 'direct',//direct , trans 
                company: 'tra',
                big: 'e',
                lineStr: 'tra_xibu,tra_huadong,tra_beihui,tra_yilan',
                directSect: 'taipei,keeling,northeast,yilan,beihui,hualian,taidong'
            }, {
                id: 'tra_r2',
                rType: 'direct',//direct , trans 
                company: 'tra',
                big: 'w',
                lineStr: 'tra_xibu,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
                directSect: 'keeling,taipei,taoyuan,hsinchu,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
            }, {
                id: 'tra_r4',
                rType: 'direct',//direct , trans 
                company: 'tra',
                big: 'w',
                lineStr: 'tra_huadong,tra_beihui,tra_yilan,tra_shan,tra_zhjy,tra_jygx,tra_pingdong',
                directSect: 'northeast,yilan,beihui,hualian,taidong,miaoli,taichung,chungha,yunlin,chiayi,tainan,kaohsiung,pingdong'
            }, {
                id: 'tra_r5',
                rType: 'direct',//direct , trans 
                company: 'tra',
                big: 'w',
                lineStr: 'tra_liujia',
                directSect: 'hsinchu'
            }, {
                id: 'tra_r6',
                rType: 'direct',//direct , trans 
                company: 'tra',
                big: 'w',
                lineStr: 'tra_shalun,tra_jygx',
                directSect: 'tainan'
            }, {
                id: 'tra_route_line_map',
                rType: 'map',//Do not remove this route system , important
                company: 'tra',
                dir: "0",
                link:[
                    'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_pingxi',
                    'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_pingxi',
                    'tra_pingdong,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                    'tra_pingdong,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                    'tra_jiji,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                    'tra_jiji,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                    'tra_shalun,tra_jygx,tra_zhjy,tra_shan,tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                    'tra_shalun,tra_jygx,tra_zhjy,tra_hai,tra_xibu,tra_yilan,tra_beihui,tra_huadong'
                ]
            }, {
                id: 'tra_west_east_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_xibu,tra_yilan,tra_beihui,tra_huadong',
                lineInclude: [
                    ['tra_xibu','tra_shan','tra_zhjy','tra_jygx','tra_liujia','tra_shalun','tra_jiji'],
                    ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi']
                ],
                rule: [
                    {
                        line: ['tra_jygx','tra_zhjy','tra_shan','tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                        sect: ['taoyuan','hsinchu','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong'],
                        station: ["tra_1032","tra_1012","tra_1013","tra_1014"],
                        transStation: 'banqiaotra1'
                    }, {
                        line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                        station: ["tra_1009","tra_1006","tra_1031","tra_1005","tra_1004"],
                        transStation: 'songshantra1'
                    }, {
                        line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                        station: ["tra_1031","tra_1005","tra_1004","tra_1030","tra_1002","tra_1029","tra_1001"],
                        transStation: 'qidutra1'
                    }, {
                        line: ['tra_yilan','tra_beihui','tra_huadong','tra_pingxi'],
                        station: ["tra_1030","tra_1003","tra_1029","tra_1001"],
                        transStation: 'badutra1'
                    }, {
                    	line: ['tra_shalun','tra_pingxi'],
                        station: ["tra_1228"],
                        transStation: 'tainantra1'
                    }
                    
                ]
            }, {
                id: 'tra_xibu_shan_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_xibu,tra_shan',
                lineInclude: [
                    ['tra_xibu','tra_liujia'],
                    ['tra_shan']
                ],
                rule: [
                    {
                        line: ['tra_shan'],
                        sect: ['keelung'],
                        transStation: 'qidutra1'
                    }, {
                        line: ['tra_shan'],
                        station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                        transStation: 'songshantra1'
                    }, {
                        line: ['tra_shan'],
                        station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                        transStation: 'banqiaotra1'
                    }, {
                        line: ['tra_shan'],
                        station: ["tra_1012","tra_1013","tra_1014"],
                        transStation: 'taoyuantra1'
                    }, {
                        line: ['tra_shan'],
                        station: ["tra_1016","tra_1018"],
                        transStation: 'zhonglitra1'
                    }, {
                        line: ['tra_shan'],
                        station: ["tra_1019","tra_1020","tra_1036"],
                        sect: ['hsinchu'],
                        transStation: 'hsinchutra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        station: ["tra_1019","tra_1020","tra_1036"],
                        sect: ['miaoli'],
                        transStation: 'miaolitra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        station: ["tra_1315","tra_1318"],
                        transStation: 'fengyuantra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['taichung'],
                        transStation: 'taizhongtra1'
                    }
                    
                ]
            }, {
                id: 'tra_xibu_zhjy_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_xibu,tra_zhjy',
                lineInclude: [
                    ['tra_xibu','tra_liujia'],
                    ['tra_zhjy']
                ],
                rule: [
                    {
                        line: ['tra_zhjy'],
                        sect: ['keelung'],
                        transStation: 'qidutra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                        transStation: 'songshantra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                        transStation: 'banqiaotra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1012","tra_1013","tra_1014"],
                        transStation: 'taoyuantra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1016","tra_1018"],
                        transStation: 'zhonglitra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1019","tra_1020","tra_1036"],
                        sect: ['hsinchu'],
                        transStation: 'hsinchutra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['changhua'],
                        transStation: 'zhanghuatra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        station: ["tra_1208","tra_1209"],
                        sect: ['changhua'],
                        transStation: 'yuanlintra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['yunlin'],
                        transStation: 'douliutra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }
                    
                ]
            }, {
                id: 'tra_xibu_jygx_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_xibu,tra_jygx',
                lineInclude: [
                    ['tra_xibu','tra_liujia'],
                    ['tra_jygx','tra_shalun']
                ],
                rule: [
                    {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['keelung'],
                        transStation: 'qidutra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                        transStation: 'songshantra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                        transStation: 'banqiaotra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1012","tra_1013","tra_1014"],
                        transStation: 'taoyuantra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1016","tra_1018"],
                        transStation: 'zhonglitra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1019","tra_1020","tra_1036"],
                        sect: ['hsinchu'],
                        transStation: 'hsinchutra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['tainan'],
                        transStation: 'tainantra1'
                    }, {
                        line: ['tra_xibu','tra_liujia'],
                        sect: ['kaohsiung'],
                        transStation: 'gaoxungtra1'
                    }
                    
                ]
            }, {
                id: 'tra_shan_zhjy_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_shan,tra_zhjy',
                lineInclude: [
                    ['tra_shan'],
                    ['tra_zhjy']
                ],
                rule: [
                    {
                        line: ['tra_zhjy'],
                        sect: ['miaoli'],
                        transStation: 'miaolitra1'
                    }, {
                        line: ['tra_zhjy'],
                        station: ["tra_1315","tra_1314","tra_1310"],
                        transStation: 'fengyuantra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['taichung'],
                        transStation: 'taizhongtra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['changhua'],
                        station: ["tra_1321","tra_1324"],
                        transStation: 'zhanghuatra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['changhua'],
                        transStation: 'yuanlintra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['yunlin'],
                        transStation: 'douliutra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }
                ]
            }, {
                id: 'tra_shan_jygx_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_shan,tra_jygx',
                lineInclude: [
                    ['tra_shan'],
                    ['tra_jygx','tra_shalun']
                ],
                rule: [
                    {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['miaoli'],
                        transStation: 'miaolitra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        station: ["tra_1315","tra_1314","tra_1310"],
                        transStation: 'fengyuantra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['taichung'],
                        transStation: 'taizhongtra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['changhua'],
                        station: ["tra_1321","tra_1324"],
                        transStation: 'zhanghuatra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['tainan'],
                        transStation: 'tainantra1'
                    }, {
                        line: ['tra_shan'],
                        sect: ['kaohsiung'],
                        transStation: 'gaoxungtra1'
                    }
                ]
            }, {
                id: 'tra_zhjy_jygx_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_zhjy,tra_jygx',
                lineInclude: [
                    ['tra_zhjy'],
                    ['tra_jygx','tra_shalun']
                ],
                rule: [
                    {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['changhua'],
                        transStation: 'yuanlintra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['yunlin'],
                        transStation: 'douliutra1'
                    }, {
                        line: ['tra_jygx','tra_shalun'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['tainan'],
                        transStation: 'tainantra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['kaohsiung'],
                        transStation: 'gaoxungtra1'
                    }
                ]
            }, {
                id: 'tra_xibu_shan_zhjy_pingdong_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_zhjy,tra_pingdong',
                lineInclude: [
                    ['tra_xibu','tra_shan','tra_zhjy','tra_liujia'],
                    ['tra_pingdong']
                ],
                rule: [
                    {
                        line: ['tra_pingdong'],
                        sect: ['keelung'],
                        transStation: 'qidutra1'
                    }, {
                        line: ['tra_pingdong'],
                        station: ["tra_1004","tra_1005","tra_1031","tra_1006"],
                        transStation: 'songshantra1'
                    }, {
                        line: ['tra_pingdong'],
                        station: ["tra_1009","tra_1032","tra_1012","tra_1013"],
                        transStation: 'banqiaotra1'
                    }, {
                        line: ['tra_pingdong'],
                        station: ["tra_1012","tra_1013","tra_1014"],
                        transStation: 'taoyuantra1'
                    }, {
                        line: ['tra_pingdong'],
                        station: ["tra_1016","tra_1018"],
                        sect: ["taoyuan"],
                        transStation: 'zhonglitra1'
                    }, {
                        line: ['tra_pingdong'],
                        station: ["tra_1019","tra_1020","tra_1036"],
                        sect: ['hsinchu'],
                        transStation: 'hsinchutra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['miaoli'],
                        transStation: 'miaolitra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['taichung'],
                        transStation: 'taizhongtra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['changhua'],
                        transStation: 'zhanghuatra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['changhua'],
                        transStation: 'yuanlintra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['yunlin'],
                        transStation: 'douliutra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['chiayi'],
                        transStation: 'jiayitra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['kaohsiung'],
                        transStation: 'gaoxungtra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['kaohsiung'],
                        transStation: 'fongshantra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['pingdong'],
                        transStation: 'pingdongtra1'
                    }, {
                        line: ['tra_zhjy'],
                        sect: ['pingdong'],
                        transStation: 'chaozhoutra1'
                    }
                ]
            }, {
                id: 'tra_jygx_pingdong_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_jygx,tra_pingdong',
                lineInclude: [
                    ['tra_jygx','tra_shalun'],
                    ['tra_pingdong']
                ],
                rule: [
                    {
                        line: ['tra_jygx','tra_shalun','tra_pingdong'],
                        sect: ['pingdong','kaohsiung','tainan'],
                        transStation: 'chaozhoutra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['tainan'],
                        transStation: 'tainantra1'
                    }, {
                        line: ['tra_pingdong'],
                        sect: ['kaohsiung','tainan'],
                        transStation: 'gaoxungtra1'
                    }
                ]
            }, {
                id: 'tra_pingdong_inner_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_pingdong',
                lineInclude: [
                    ['tra_pingdong'],
                    ['tra_pingdong']
                ],
                rule: [
                    {
                        line: ['tra_pingdong'],
                        sect: ['pingdong','kaohsiung'],
                        transStation: 'chaozhoutra1'
                    }
                ]
            }, {
                id: 'tra_yilan_beihui_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_yilan,tra_beihui',
                lineInclude: [
                    ['tra_beihui'],
                    ['tra_yilan','tra_pingxi']
                ],
                rule: [
                    {
                        line: ['tra_beihui'],
                        station: ["tra_1802","tra_1803","tra_1805","tra_1806"],
                        transStation: 'ruifangtra1'
                    }, {
                        line: ['tra_beihui'],
                        station: ["tra_1807","tra_1808","tra_1809","tra_1810","tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819"],
                        transStation: 'yilantra1'
                    }, {
                        line: ['tra_beihui'],
                        station: ["tra_1821","tra_1822","tra_1824","tra_1825"],
                        transStation: 'luodongtra1'
                    }, {
                        line: ['tra_beihui'],
                        station: ["tra_1827","tra_1825","tra_1824"],
                        transStation: 'suaoxintra1'
                    }, {
                        line: ['tra_yilan','tra_pingxi'],
                        sect: ['hualian'],
                        transStation: 'hualiantra1'
                    }
                    
                ]
            }, {
                id: 'tra_yilan_huadong_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
                lineInclude: [
                    ['tra_huadong'],
                    ['tra_yilan','tra_pingxi']
                ],
                rule: [
                    {
                        line: ['tra_huadong'],
                        station: ["tra_1802","tra_1803","tra_1805","tra_1806"],
                        transStation: 'ruifangtra1'
                    }, {
                        line: ['tra_huadong'],
                        station: ["tra_1807","tra_1808","tra_1809","tra_1810","tra_1811","tra_1812","tra_1813","tra_1814","tra_1815","tra_1816","tra_1817","tra_1818","tra_1819"],
                        transStation: 'yilantra1'
                    }, {
                        line: ['tra_huadong'],
                        station: ["tra_1821","tra_1822","tra_1824","tra_1825"],
                        transStation: 'luodongtra1'
                    }, {
                        line: ['tra_huadong'],
                        station: ["tra_1827","tra_1825","tra_1824"],
                        transStation: 'suaoxintra1'
                    }, {
                        line: ['tra_yilan','tra_pingxi'],
                        sect: ['hualian'],
                        transStation: 'hualiantra1'
                    }, {
                        line: ['tra_yilan','tra_pingxi'],
                        sect: ['hualian'],
                        station: ["tra_1624","tra_1625","tra_1626"],
                        transStation: 'yulitra1'
                    }, {
                        line: ['tra_yilan','tra_pingxi'],
                        sect: ['taidong'],
                        transStation: 'taidongtra1'
                    }
                ]
            }, {
                id: 'tra_beihui_huadong_trans',
                rType: 'trans',
                company: 'tra',
                routeMapID: 'traInnerTrans_tra_yilan,tra_huadong',
                lineInclude: [
                    ['tra_huadong'],
                    ['tra_beihui']
                ],
                rule: [
                    {
                        line: ['tra_huadong'],
                        sect: ['beihui','hualian'],
                        transStation: 'hualiantra1'
                    }
                ]
            }, {
                id: 'tymetro_1_fast_normal_trans',
                rType: 'trans',
                company: 'tymetro',
                routeMapID: 'tymetroInnerTrans_tymetro_1,tymetro_1',
                rule: [
                    {
                        line: ['tymetro_1'],
                        sect: ['taoyuan','taipei'],
                        transStation: 'changgengyiyuan1'
                    }
                ]
            }, {
                id: 'trtc_trans_tra_east',
                rType: 'cross',//direct , trans 
                company: ['trtc','tra'],// cross company serial
                regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
                lineIsSame: {
                    "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
                },
                link: [
                	{
                		regLine: "^trtc_5|^tra_",
                		transStation: [
                			['banqiao1','taipei1','nangang1']
                		]
                	}, {
                		regLine: "^trtc_3$|^trtc_4|^tra_",
                		transStation: [['taipei2','songshan1']]
                	}, {
                		regLine: "^trtc_2$|^tra_",
                		transStation: [['taipei2']]
                	}
                ],
                sect: ['hsinchu','taoyuan','taipei','keeling','northeast','yilan','beihui','hualian','taidong']
            }, {
                id: 'trtc_trans_tra_west',
                rType: 'cross',//direct , trans 
                company: ['trtc','tra'],// cross company serial
                regLine: "^trtc_1$|^trtc_2$|^trtc_3$|^trtc_4|^trtc_5$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong|^tra_shalun$|^tra_hai$|^tra_jiji$",
                lineIsSame: {
                    "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_jiji$"
                },
                link: [
                	{
                		regLine: "^trtc_5|^tra_",
                		transStation: [
                			['banqiao1','taipei1']
                		]
                	}, {
                		regLine: "^trtc_3$|^trtc_4|^tra_",
                		transStation: [['taipei2','songshan1']]
                	}, {
                		regLine: "^trtc_2$|^tra_",
                		transStation: [['taipei2']]
                	}
                ],
                sect: ['hsinchu','taoyuan','taipei','keeling','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong']
            }, {
            //TRA and TYMETRO trans
                id: 'tymetro_trans_tra_east',
                rType: 'cross',//direct , trans 
                company: ['tymetro','tra'],// cross company serial
                regLine: "^tymetro_1$|^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$",
                lineIsSame: {
                    "tra_xibu": "^tra_yilan$|^tra_beihui$|^tra_huadong$|^tra_pingxi$|^tra_liujia$"
                },
                link: [
                	{
                		regLine: "^tymetro_1|^tra_",
                		transStation: [
                			['taipei4']
                		]
                	}
                ],
                sect: ['hsinchu','taoyuan','taipei','keeling','northeast','yilan','beihui','hualian','taidong']
            }, {
                id: 'tymetro_trans_tra_west',
                rType: 'cross',//direct , trans 
                company: ['tymetro','tra'],// cross company serial
                regLine: "^tymetro_1$|^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$",
                lineIsSame: {
                    "tra_xibu": "^tra_shan$|^tra_zhjy$|^tra_jygx$|^tra_pingdong$|^tra_shalun$|^tra_hai$|^tra_hai$|^tra_jiji$"
                },
                link: [
                	{
                		regLine: "^tymetro_1|^tra_",
                		transStation: [
                			['taipei4']
                		]
                	}
                ],
                sect: ['hsinchu','taoyuan','taipei','keeling','miaoli','taichung','changhua','yunlin','chiayi','tainan','kaohsiung','pingdong']
            }
        ]
    }
}
})();