(function(){
if(!window.__createLibTT) window.__createLibTT = {};
	
__createLibTT.defined = function(TT){
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
        zxcv: 1
    }
}
})();