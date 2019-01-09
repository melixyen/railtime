(function(){
if(!window.$trainTaiwanLib) window.$trainTaiwanLib = {};

(function(TT){
	TT.fn = {
        checkEquaArrayStartEnd: function(ary1, ary2){
        	if(typeof(ary2[0])=='string' && typeof(ary2[1])=='string'){

            	if(ary1[0]==ary2[0] && ary1[ary1.length-1]==ary2[ary2.length-1]){
                	return true;
            	}else if(ary1[0]==ary2[ary2.length-1] && ary1[ary1.length-1]==ary2[0]){
                	return true;
            	}else{
                	return false;
            	}
        	}else if(typeof(ary2[0])=='object' && ary2[0].test){//Is regexp
        		if(ary2[0].test(ary1[0]) && ary2[ary2.length-1].test(ary1[ary1.length-1])){
        			return true;
        		}else if(ary2[ary2.length-1].test(ary1[0]) && ary2[0].test(ary1[ary1.length-1])){
                	return true;
            	}else{
                	return false;
            	}
        	}
        },
        checkEquaSectStartEnd: function(aSect, bSect, rSectAry){
        	var aFlg=false, bFlg=false;
        	rSectAry.map(function(s){
        		if(aSect==s) aFlg=true;
        		if(bSect==s) bFlg=true;
        	})
        	return aFlg && bFlg;
        },
        checkIsFunction: function(cbFn){
            return (typeof(cbFn)=='function');
        },
        checkIsError: function(str){
            var rt = false;
            if(typeof(str)=='string'){
                rt=/error|fail/ig.test(str);
            }
            return rt;
        },
        checkOnTimeRange: function(time, startTime, endTime){
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime);
            time = TT.fn.transTime2Sec(time);
            startTime = TT.fn.transTime2Sec(startTime);
            endTime = TT.fn.transTime2Sec(endTime);
            
            if(time < crossDaySec) time+=86400;
            if(startTime < crossDaySec) startTime+=86400;
            if(endTime < crossDaySec) endTime+=86400;
            
            return (time >= startTime && time <= endTime);
        },
        checkTRA_dayTimeIsLoaded: function(w){
            if(w==null) w = TT.defined.defaultTRAWeekday;
            return (TT.data.tra.timeTable && TT.data.tra.timeTable[parseInt(w,10)]) ? true : false;
        },
        check_TRA_hasSameBigWord: function(a,b){
            a = a || '';
            b = b || '';
            for(var i=0; i<a.length; i++){
                if(b.indexOf(a.substr(i,1))!=-1) return true
            }
            return false;
        },
        checkTRTC_rnwTimeTableIsLoaded: function(){
            return (TT.data.trtc.rnwTimeTable) ? true : false;
        },
        dLog: function(st){
            if(!TT.defined.debugMode) return false;
            if(window.console) console.log(st);
        },
        d2Log: function(st){
            if(window.console) console.log(st);
        },
        findStationByString: function(str){
            if(str.length<1) return false;
            var isEng = (/^[\d|a-zA-Z]+$/.test(str));
            if(isEng) str = str.toLowerCase();
            if(!isEng) str = str.replace('臺','台');
            var allStAry = TT.fn.getAllStationArrayOnData(), rtAry = [];
            var name, idxof = -1;
            allStAry.map(function(st){
                name = (isEng) ? st.estring : st.name;
                idxof = name.indexOf(str);
                if(idxof!=-1){
                    rtAry.push($.extend({indexOfNum: idxof},st));
                }
            });
            rtAry.sort(function(a,b){
                var intA = parseInt(a.indexOfNum,10);
                var intB = parseInt(b.indexOfNum,10);
                if(intA==intB) return 0;
                if(intA < intB) return -1;
                if(intA > intB) return 1;
            });
            return rtAry;
        },
        getAllStationArrayOnData: function(needRewrite){
            if(TT.listOfStationAry && !needRewrite) return TT.listOfStationAry;
            var haveStAry = new Array();
            for(var k in TT.data){
                if(TT.data[k].station_ary){
                    haveStAry.push(TT.data[k].station_ary);
                }
            }
            var allStAry = new Array();
            haveStAry.map(function(stAry){
                allStAry = allStAry.concat(stAry);
            });
            TT.listOfStationAry = allStAry;
            return allStAry;
        },
        getDefaultDayLastTime: function(){
            return TT.fn.transSec2Time(TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime)-1);
        },
        getDocumentHeight: function(){
            return document.documentElement.clientHeight;
        },
        getDocumentWidth: function(){
            return document.documentElement.clientWidth;
        },
        getCommon_allTrainStation: function(){
            var traAry = new Array(), trtcAry = new Array(), allAry = new Array(), tmpA;
            for(var i=0; i<TT.data.trtc.line.length; i++){
                for(var j=0; j<TT.data.trtc.line[i].station.length; j++){
                    tmpA = TT.fn.getTRTC_stationDataOfID(TT.data.trtc.line[i].station[j], TT.data.trtc.line[i].id);
                    trtcAry.push(tmpA);
                    allAry.push(tmpA);
                }
            }
            for(var i=0; i<TT.data.tra.line.length; i++){
                for(var j=0; j<TT.data.tra.line[i].station.length; j++){
                    tmpA = TT.fn.getTRA_stationDataOfID(TT.data.tra.line[i].station[j], TT.data.tra.line[i].id);
                    traAry.push(tmpA);
                    allAry.push(tmpA);
                }
            }
            for(var i=0; i<TT.data.tymetro.line.length; i++){
                for(var j=0; j<TT.data.tymetro.line[i].station.length; j++){
                    tmpA = TT.fn.tymetro.get_stationDataOfID(TT.data.tymetro.line[i].station[j], TT.data.tymetro.line[i].id);
                    trtcAry.push(tmpA);
                    allAry.push(tmpA);
                }
            }
            
            return {
                traAry: traAry,
                trtcAry: trtcAry,
                allAry: allAry
            }
        },
        getComon_allStationOfLineByFromTo: function(a, b, line){
        	if(typeof(line)=='string') line = TT.fn.getCommon_lineData(line);
        	var stAry = JSON.parse(JSON.stringify(line.station));
        	if(line.subWorkingArea && (line.subWorkingArea.station.indexOf(a)>=0 || line.subWorkingArea.station.indexOf(b)>=0)){
        		var transIdx = stAry.indexOf(line.subWorkingArea.transAt);
        		var mainArea = stAry.slice(0, stAry.indexOf(line.subWorkingArea.station[0]));
        		var saidx = line.subWorkingArea.station.indexOf(a),
        			sbidx = line.subWorkingArea.station.indexOf(b);
        		if((saidx<0 && stAry.indexOf(a)>=transIdx) || (sbidx<0 && stAry.indexOf(b)>=transIdx)){
        			mainArea = mainArea.reverse();
        		}
        		var tAry = mainArea.slice(0, mainArea.indexOf(line.subWorkingArea.transAt)+1).concat(line.subWorkingArea.station);
        		stAry = tAry;
        	}
        	var aidx = stAry.indexOf(a),
				bidx = stAry.indexOf(b),
				dir = line.dir;
			if(aidx > bidx){
				stAry = stAry.reverse();
				dir = (dir=='1') ? '0' : '1';
				aidx = stAry.indexOf(a);
				bidx = stAry.indexOf(b);
			}
			return {
				station: stAry.slice(aidx, bidx+1),
				dir: dir,
				id: line.id
			}
        },
        getCommon_lineColor: function(line){
            var cp = TT.fn.getCompanyOfLine(line);
                var lineObj = {},rt = '#000000';
                switch(cp){
                    case 'tra':
                        lineObj = TT.data.tra.line;
                    break;
                    case 'trtc':
                        lineObj = TT.data.trtc.line;
                    break;
                    case 'tymetro':
                        lineObj = TT.data.tymetro.line;
                    break;
                    default:
                        return false;
                    break;
                }
                for(var i=0; i<lineObj.length; i++){
                    if(lineObj[i].id==line){
                        rt = lineObj[i].color;
                        break;
                    }
                }
                return rt;
        },
        getCommon_lineData: function(line){
            var cp = TT.fn.getCompanyOfLine(line);
                var lineObj = {},rt = false;
                switch(cp){
                    case 'tra':
                        lineObj = TT.data.tra.line;
                    break;
                    case 'trtc':
                        lineObj = TT.data.trtc.line;
                    break;
                    case 'tymetro':
                        lineObj = TT.data.tymetro.line;
                    break;
                    default:
                        return false;
                    break;
                }
                for(var i=0; i<lineObj.length; i++){
                    if(lineObj[i].id==line){
                        rt = lineObj[i];
                        break;
                    }
                }
                return rt;
        },
        getCommon_lineName: function(line){
            var cp = TT.fn.getCompanyOfLine(line);
            var cpSimpleName = (function(){
                //switch(cp){
                    //case 'tra':
                        //return TT.defined.stringOfTRASimple;
                    //break;
                    //case 'trtc':
                        //return TT.defined.stringOfTRTCSimple;
                    //break;
                    //default:
                        //return '其他';
                    //break;
                //}
                return (TT.defined.stringSimpleOfCompany[cp]) ? TT.defined.stringSimpleOfCompany[cp] : '其他';
            })();
            var cpLineName = (function(){
                var lineObj = {},rt = '';
                switch(cp){
                    case 'tra':
                        lineObj = TT.data.tra.line;
                    break;
                    case 'trtc':
                        lineObj = TT.data.trtc.line;
                    break;
                    case 'tymetro':
                        lineObj = TT.data.tymetro.line;
                    break;
                    default:
                        return false;
                    break;
                }
                for(var i=0; i<lineObj.length; i++){
                    if(lineObj[i].id==line){
                        rt = lineObj[i].name;
                        break;
                    }
                }
                return rt;
            })();
            return '[' + cpSimpleName + '] ' + cpLineName;
        },
        getCommon_stationOnWhatLine: function(st){
            var aComp = TT.fn.getCompanyOfLine(st);
            
            switch(aComp){
                case 'tra':
                    return TT.fn.getTRA_stationOnWhatLine(st);
                break;
                case 'trtc':
                    return TT.fn.getTRTC_stationOnWhatLine(st);
                break;
                case 'tymetro':
                    return TT.fn.tymetro.get_stationOnWhatLine(st);
                break;
            }
            return false;
        },
        getCommon_theTransRouteByFromTo: function(a, b){
            var objR = TT.fn.getRoute_allRouteByFromTo(a, b);
            var rt = new Array();
            if(objR.isRoute){
                var routeT = objR.getAllTakeMethod();
            /*}else if(objR.isDirect){
                var routeT = new Array();
                    routeT.push([{
                        company: TT.fn.getCompanyOfStation(a),
                        line: objR.displayLine,
                        takeRange: [a,b]
                    }]);*/
            }else{
                var routeT = new Array();
                for(var i=0; i<objR.length; i++){
                    routeT.push([{
                        company: TT.fn.getCompanyOfStation(a),
                        line: objR[i],
                        takeRange: [a,b]
                    }]);
                    if(objR[i]=='tra_liujia'){
                        var lineData = TT.fn.getCommon_lineData(objR[i]);
                        var atFlag = false, btFlag = false;
                        lineData.subWorkingArea.station.map(function(st){
                        			if(st==a) atFlag = true;
                        			if(st==b) btFlag = true;
                        });
                        if((atFlag && !btFlag) || (!atFlag && btFlag)){
                        	var tsid = lineData.subWorkingArea.transStationID;
                        	routeT.push([{
                        		company: TT.fn.getCompanyOfStation(a),
                        		line: objR[i],
                        		takeRange: [a,lineData.subWorkingArea.transAt],
                        		transStation: TT.fn.getRoute_transStationById(tsid),
                        		transStationID: tsid
                        	}, {
                        		company: TT.fn.getCompanyOfStation(a),
                        		line: objR[i],
                        		takeRange: [lineData.subWorkingArea.transAt,b]
                        	}])
                        }
                    }
                }
            }
            //搜尋至此時，routeT 應該為一個陣列，陣列內每個物件內容應為 {company:'yyy', line:'xxxx', takeRange:[a,b], transStation:transStation, transStationID: 'vvv'}
            //若 routeT 仍舊為空，則進行自動分段路網搜尋
            if(routeT.length==0) routeT = TT.fn.getRoute_searchAutoSplitRoute(a, b, routeT);
            return routeT;
        },
        getCommon_timeRangeBestByFromTo: function(a, b, startTime, endTime, flagAD, w, cbFn){
            if(flagAD===undefined) flagAD = true;
            var aryP = new Array(), rt = new Array();
            
            function getBest(routeA){
                var trainBest = new Array(), trainM, pointer;
                if(flagAD==true){
                    var routeB = routeA[0];
                    for(var i=0; i<routeB.formatTimeTable.length; i++){
                        if(routeB.formatTimeTable[i].onTimeRange==true && routeB.formatTimeTable[i].bestStart){
                            trainBest.push(routeB.formatTimeTable[i]);
                        }else if(routeB.formatTimeTable[i].onTimeRange==true && i==routeB.formatTimeTable.length-1 && routeB.formatTimeTable[i].nextPointer>0){
                            trainBest.push(routeB.formatTimeTable[i]);
                        }
                    }
                }else{
                    var routeB = routeA[routeA.length-1];
                    var flagFirstAlready = false;
                    for(var i=0; i<routeB.formatTimeTable.length; i++){
                        if(!flagFirstAlready && routeA.length>1 && routeB.formatTimeTable[i].onTimeRange==true){
                            flagFirstAlready = true;
                            trainBest.push(routeB.formatTimeTable[i]);
                        }else if(routeB.formatTimeTable[i].onTimeRange==true && routeB.formatTimeTable[i].bestEnd){
                            trainBest.push(routeB.formatTimeTable[i]);
                        }
                    }
                }
                return trainBest;
            }
            
            function checkIsSameOfPrev(tb1, tb2){
                var rt = false;
                if(!!tb1 && !!tb2){
                    //檢查機捷是否前後為同一列
                    if(tb1.info && tb1.info.trainID && tb2.info && tb2.info.trainID && tb1.info.trainID==tb2.info.trainID){
                        rt = true;
                    }
                }
                return rt;
            }
            function getLink(routeA, trainBest){
                var aryT = new Array();
                var aryB = [];//is old aryT[tb]
                var isSameOfPrev = false;
                if(flagAD==true){
                    for(var tb=0; tb<trainBest.length; tb++){
                        aryB = [];
                        isSameOfPrev = false;
                        for(var i=0; i<routeA.length; i++){
                            if(i==0){
                                aryB[i] = trainBest[tb];
                            }else{
                                aryB[i] = (aryB[i-1]) ? routeA[i].formatTimeTable[aryB[i-1].nextPointer] : null;
                                isSameOfPrev = checkIsSameOfPrev(aryB[i-1], aryB[i]);
                            }
                            if(isSameOfPrev) break;
                        }
                        if(!isSameOfPrev) aryT.push(aryB);
                    }
                }else{
                    for(var tb=0; tb<trainBest.length; tb++){
                        aryB = [];
                        isSameOfPrev = false;
                        for(var i=routeA.length-1; i>=0; i--){
                            if(i==routeA.length-1){
                                aryB[i] = trainBest[tb];
                            }else{
                                aryB[i] = (aryB[i+1]) ? routeA[i].formatTimeTable[aryB[i+1].prevPointer] : null;
                                isSameOfPrev = checkIsSameOfPrev(aryB[i+1], aryB[i]);
                            }
                            if(isSameOfPrev) break;
                        }
                        if(!isSameOfPrev) aryT.push(aryB);
                    }
                }
                return aryT;
            }
            
            function matchBestTrain(routeA, bestAry){
                for(var i=0; i<routeA.length; i++){
                    routeA[i].bestTrain = new Array();
                    routeA[i].bestLink = new Array();
                    for(var j=0; j<bestAry.length; j++){
                    	if(!bestAry[j][0] || !bestAry[j][bestAry[j].length-1]) continue;
                        if(bestAry[j][0].nextPointer<0) continue;
                        routeA[i].bestTrain.push(bestAry[j][i]);
                        routeA[i].bestLink.push(bestAry[j]);
                    }
                    //If only 1 route direct just use on time range for best
                    if(routeA.length==1 && bestAry.length==0){
                        for(var j=0; j<routeA[i].formatTimeTable.length; j++){
                            if(routeA[i].formatTimeTable[j].onTimeRange){
                                routeA[i].bestTrain.push(routeA[i].formatTimeTable[j]);
                                routeA[i].bestLink.push([routeA[i].formatTimeTable[j]]);
                            }
                        }
                    }
                }
                return routeA;
            }
            
            function endOfFind(aryRouteAll){
            	for(var i=0; i<aryRouteAll.length; i++){
                	aryP[i] = getLink(aryRouteAll[i], getBest(aryRouteAll[i]));
                	aryRouteAll[i] = matchBestTrain(aryRouteAll[i], aryP[i]);
            	}
            
            	//return aryRouteAll;
            	cbFn(aryRouteAll);
            }
            var aryRouteAll = TT.fn.getCommon_timeTakeByFromTo(a, b, startTime, endTime, flagAD, w, endOfFind);
            //return rt;
        },
        getCommon_timeTakeByFromTo: function(a, b, startTime, endTime, flagAD, w, cbFn){
            if(flagAD===undefined) flagAD = true;
            if(!startTime) startTime = TT.defined.defaultCrossDayTime;
            if(!endTime) endTime = TT.fn.getDefaultDayLastTime();
            var sendStartTime = startTime, sendEndTime = endTime, keyFrom, keyTo;
            if(flagAD==true){
                sendEndTime = TT.fn.getDefaultDayLastTime();
            }else{
                sendStartTime = TT.defined.defaultCrossDayTime;
            }
            //Use TT.fn.checkOnTimeRange to get which train on time range 
            
            function giveOnTimeRange(routeA){
                var tmpTime;
                if(flagAD==true){
                    var routeB = routeA[0];
                    for(var i=0; i<routeB.formatTimeTable.length; i++){
                        tmpTime = routeB.formatTimeTable[i].time[0];
                        routeB.formatTimeTable[i].onTimeRange = TT.fn.checkOnTimeRange(tmpTime, startTime, endTime);
                    }
                    routeA[0] = routeB;
                }else{
                    var routeB = routeA[routeA.length-1];
                    for(var i=0; i<routeB.formatTimeTable.length; i++){
                        tmpTime = routeB.formatTimeTable[i].time[1];
                        routeB.formatTimeTable[i].onTimeRange = TT.fn.checkOnTimeRange(tmpTime, startTime, endTime);
                    }
                    routeA[routeA.length-1] = routeB;
                }
                return routeA;
            }
            
            function endOfFind(aryRouteAll){
            	for(var i=0; i<aryRouteAll.length; i++){
                	aryRouteAll[i] = giveOnTimeRange(aryRouteAll[i]);
            	}
            	cbFn(aryRouteAll);
            }
            
            TT.fn.getCommon_timeRangeByFromTo(a, b, sendStartTime, sendEndTime, flagAD, w, endOfFind);
            //return aryRouteAll;
        },
        getCommon_timeRangeByFromTo: function(a, b, startTime, endTime, flagAD, w, cbFn){
            if(flagAD===undefined) flagAD = true;
            var routeAry = TT.fn.getCommon_theTransRouteByFromTo(a,b);
            var tmpRouteTime, rt = new Array();
            
            function getFormatTime(company, routeB){
                var ary = new Array(), objA = {}
                switch(company){
                    case 'tra':
                        for(var i=0; i<routeB.timeTable.length; i++){
                            objA = {
                                //time: routeB.timeTable[i].getFromToTime(),
                                time: TT.fn.getTRA_fromToTime(routeB.timeTable[i]),
                                info: routeB.timeTable[i]
                            }
                            objA.tt_sortTime = (flagAD) ? TT.fn.transTime2Sec(objA.time[1], true) : TT.fn.transTime2Sec(objA.time[0], true);
                            ary.push(objA);
                        }
                    break;
                    case 'trtc':
                        for(var i=0; i<routeB.timeTable.length; i++){
                            objA = {
                                time: routeB.timeTable[i],
                                info: {}
                            }
                            objA.tt_sortTime = (flagAD) ? TT.fn.transTime2Sec(objA.time[1], true) : TT.fn.transTime2Sec(objA.time[0], true);
                            ary.push(objA);
                        }
                    break;
                    case 'tymetro':
                        for(var i=0; i<routeB.timeTable.length; i++){
                            objA = {
                                time: TT.fn.tymetro.get_fromToTimeArray(routeB.timeTable[i]),
                                info: routeB.timeTable[i]
                            }
                            objA.tt_sortTime = (flagAD) ? TT.fn.transTime2Sec(objA.time[1], true) : TT.fn.transTime2Sec(objA.time[0], true);
                            ary.push(objA);
                        }
                        ary.sort(TT.fn.getTRA_sortByTTSortTime);
                    break;
                }
                routeB.formatTimeTable = ary;
                return routeB;
            }
            
            function getRouteTime(routeA){
                var startT = startTime, endT = endTime, routeB;
                if(flagAD==true){
                    for(var i=0; i<routeA.length; i++){
                        routeB = routeA[i];             
                        switch(routeB.company){
                            case 'tra':
                                routeB.timeTable = TT.fn.getTRA_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, w);
                            break;
                            case 'trtc':
                                routeB.timeTable = TT.fn.getTRTC_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, routeB.line, w);
                            break;
                            case 'tymetro':
                                routeB.timeTable = TT.fn.tymetro.get_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, routeB.line, w);
                            break;
                        }
                        routeB = getFormatTime(routeB.company, routeB);
                        if(routeB.transStation){
                                    startT = TT.fn.transSec2Time(TT.fn.transTime2Sec(startT));
                        }
                        routeA[i] = routeB;
                    }
                }else{
                    for(var i=routeA.length-1; i>=0; i--){
                        routeB = routeA[i];
                        switch(routeB.company){
                            case 'tra':
                                routeB.timeTable = TT.fn.getTRA_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, w);
                                if(routeB.timeTable[routeB.timeTable.length-1]) endT = TT.fn.getTRA_fromToTime(routeB.timeTable[routeB.timeTable.length-1],routeB.takeRange[0],routeB.takeRange[1])[0];
                            break;
                            case 'trtc':
                                routeB.timeTable = TT.fn.getTRTC_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, routeB.line, w);
                                if(routeB.timeTable[routeB.timeTable.length-1]) endT = routeB.timeTable[routeB.timeTable.length-1][0];
                            break;
                            case 'tymetro':
                                routeB.timeTable = TT.fn.tymetro.get_timeRangeByFromTo(routeB.takeRange[0], routeB.takeRange[1], startT, endT, flagAD, routeB.line, w);
                                if(routeB.timeTable[routeB.timeTable.length-1]) endT = routeB.timeTable[routeB.timeTable.length-1][0];
                            break;
                        }
                        routeB = getFormatTime(routeB.company, routeB);
                        if(routeB.transStation){
                                    startT = TT.fn.transSec2Time(TT.fn.transTime2Sec(startT));
                                    endT = TT.fn.transSec2Time(TT.fn.transTime2Sec(endT));
                        }
                        routeA[i] = routeB;
                    }
                }
                return routeA;
            }
            
            function getNextPointer(routeA){
                var routeB1, routeB2, crossOffsetSec, crossReallySec, pointerA = -1, b1EndTime, b2StartTime, b2idx = 0;
                var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime), offset1Day = 86400;
                var flgB1B2isSameTrain = false, B1Train = false, B2Train = false;
                for(var tc=0; tc<routeA.length; tc++){
                    if(routeA[tc].transStation && routeA[tc+1]){//Have next trans
                        routeB1 = routeA[tc]; routeB2 = routeA[tc+1];
                        routeA[tc+1].formatTimeTable.sort(TT.fn.getTRA_sortByTTSortTime);
                        crossOffsetSec = routeB1.transStation.walkMinute*60;
                        pointerA = -1;
                        b2idx = 0;
                        
                        for(var i=0; i<routeB1.formatTimeTable.length; i++){
                            B1Train = routeB1.formatTimeTable[i];
                            b1EndTime = B1Train.time[1];
                            b1EndTime = TT.fn.transTime2Sec(b1EndTime);
                            if(b1EndTime < crossDaySec) b1EndTime += offset1Day;
                            for(var j=b2idx; j<routeB2.formatTimeTable.length; j++){
                                B2Train = routeB2.formatTimeTable[j];
                                flgB1B2isSameTrain = !!(B1Train.info.Train && B2Train.info.Train && B1Train.info.Train==B2Train.info.Train);
                                b2StartTime = TT.fn.transTime2Sec(B2Train.time[0]);
                                if(b2StartTime < crossDaySec) b2StartTime += offset1Day;
                                pointerA = -1;
                                if(!flagAD) b2idx = j;
                                routeB2.formatTimeTable[j].prevPointer = i-1;
                                routeB2.formatTimeTable[j].myPointer = j;
                                if(routeB1.doNotTakeTrain){B2Train.bestEnd = true;}
                                crossReallySec = (flgB1B2isSameTrain) ? 0 : crossOffsetSec;
                                if(b2StartTime >= b1EndTime + crossReallySec){
                                    pointerA = j;
                                    routeB2.formatTimeTable[j].prevPointer = i;
                                    routeB2.formatTimeTable[j].bestEnd = true;
                                    break;
                                }
                            }
                            if(routeB1.formatTimeTable[i-1] && routeB2.doNotTakeTrain){routeB1.formatTimeTable[i-1].bestStart = true;}
                            if(routeB1.formatTimeTable[i-1] && routeB1.formatTimeTable[i-1].nextPointer != pointerA){
                                routeB1.formatTimeTable[i-1].bestStart = true;
                            }
                            routeB1.formatTimeTable[i].nextPointer = pointerA;
                            routeB1.formatTimeTable[i].myPointer = i;
                            if(routeB1.formatTimeTable.length==1 && i==0 && routeB1.formatTimeTable[i].nextPointer>=0){
                                routeB1.formatTimeTable[i].bestStart = true;
                            }
                        }
                    }
                }
                return routeA;
            }
            
            function endOfFind(routeAry){
            	for(var i=0; i<routeAry.length; i++){
                	tmpRouteTime = getRouteTime(routeAry[i]);
                	tmpRouteTime = getNextPointer(tmpRouteTime);
                	rt.push(tmpRouteTime);
            	}
            
            	cbFn(rt);//return rt;
            }
            
            function checkRouteAryTime(routeAry){
            	//在此檢查所有需要的時刻表是否已備齊，有的話才進行接下來的動作
				if(TT.defined.usePTX){
					var mrtPTXAry = [];
					routeAry.forEach(function(ary){
						ary.forEach(function(c){
							if(c.company=='trtc'){
								mrtPTXAry.push({company: c.company, line: c.line, takeRange: c.takeRange});
							}
						});
                    });
                    TT.ui.mask('使用雲端公共交通資訊整合平台 API 讀取相關捷運站時刻表');
					TT.ptx.getTakeMRTTimeTable(mrtPTXAry, w, function(status, data){
                        endOfFind(routeAry);
                        TT.ui.unmask();
					});
				}else{
					endOfFind(routeAry);
				}
            }
            checkRouteAryTime(routeAry);
        },
        getCommon_stationDataOfID: function(stid){
            var cmp = TT.fn.getCompanyOfStation(stid);
            switch(cmp){
                case 'tra':
                    return TT.fn.getTRA_stationDataOfID(stid);
                break;
                case 'trtc':
                    return TT.fn.getTRTC_stationDataOfID(stid);
                break;
                case 'tymetro':
                    return TT.fn.tymetro.get_stationDataOfID(stid);
                break;
            }
            return false;
        },
        getCommon_transStationByID: function(tsid){
            var tsAry = TT.data.transStation;
            for(var i=0; i<tsAry.length; i++){
                if(tsAry[i].id==tsid){
                    return tsAry[i];
                }
            }
            return false;
        },
        getCommon_transStationAllByStation: function(st, regLine){
        	var tsAry = TT.data.transStation;
        	var rt = [];
        	if(regLine){
        		if(typeof(regLine)=='string') regLine = new RegExp('^' + regLine + '$');
        		tsAry.map(function(c){
        			if(c.changeStation.indexOf(st)>=0 && (regLine.test(c.changeLine[0]) || regLine.test(c.changeLine[1]))) rt.push(c);
        		});
        	}else{
        		tsAry.map(function(c){
        			if(c.changeStation.indexOf(st)>=0) rt.push(c);
        		});
        	}
        	return rt;
        },
        getCommon_transStationBySameChangeStation: function(st, aLine, bLine, st2){
        	var ts = TT.data.transStation;
        	if(aLine && bLine){
        		var ta = false, tb = false, flgA = false;
        		for(var i=0; i<ts.length; i++){
        			ta = !!(ts[i].changeLine[0]==aLine || ts[i].changeLine[1]==aLine);
        			tb = !!(ts[i].changeLine[0]==bLine || ts[i].changeLine[1]==bLine);
        			st2 = st2 || st;
        			flgA = (ts[i].changeStation[0].indexOf(st)>=0 && ts[i].changeStation.indexOf(st2)>=0); 
        			if(ta && tb && flgA) return ts[i];
        		}
        	}else if(aLine){
        		for(var i=0; i<ts.length; i++){
        			if(ts[i].changeStation[0]==st && ts[i].changeStation[1]==st && ts[i].changeLine.indexOf(aLine)>=0) return ts[i];
        		}
        	}else{
        		for(var i=0; i<ts.length; i++){
        			if(ts[i].changeStation[0]==st && ts[i].changeStation[1]==st) return ts[i];
        		}
        	}
        	return false;
        },
        getCompanyOfLine: function(st){
            return TT.fn.getCompanyOfStation(st);
        },
        getCompanyOfStation: function(st){
            if(!st) return false;
            if(st.indexOf('trtc_')==0) return 'trtc';
            if(st.indexOf('tra_')==0) return 'tra';
            if(st.indexOf('tymetro_')==0) return 'tymetro';
            return false;
        },
        getData2JSON: function(node){
            var obj = {}
            switch(node){
                case 'tra':
                    for(var k in TT.data.tra){
                        if(k!='timeTable'){
                            obj[k] = TT.data.tra[k];
                        }
                    }
                break;
                case 'trtc':
                    for(var k in TT.data.trtc){
                        if(k!='rnwTimeTable'){
                            obj[k] = TT.data.trtc[k];
                        }
                    }
                break;
                default:
                            obj = TT.data[node];
                break;
            }
            return JSON.stringify(obj, undefined, 4);
        },
        saveDataJSON2Data: function(node, str){
            var obj = JSON.parse(str);
                for(var k in TT.data[node]){
                    if(obj[k]){
                        TT.data[node][k] = obj[k];
                    }
                }
        },
        getEncodeStationID: function(sid, comp){
            return comp + '_' + sid;
        },
        getXML_Attribute2Obj: function(xt){
            var jo = {}, nName = '', nText = '';
            for(var i=0; i<xt.attributes.length; i++){
                nName = xt.attributes[i].name;
                nText = xt.attributes[i].value;
                jo[nName] = nText;
            }
            return jo;
        },
        getRoute_allRouteByFromTo: function(a,b){
            var aComp = TT.fn.getCompanyOfStation(a),
                bComp = TT.fn.getCompanyOfStation(b),
                aLine = TT.fn.getCommon_stationOnWhatLine(a),
                bLine = TT.fn.getCommon_stationOnWhatLine(b);
            
            function giveRouteTakeRange(t){
                if(t.length==0) return t;
                for(var i=0; i<t.route.length; i++){
                    var ary = new Array();
                    var rr = t.getRouteAt(i);
                    if(!rr || rr.length==0){
                        t.route[i].takeRange = [t.fromStation, t.toStation];
                        continue;
                    }
                    for(var j=0; j<rr.length; j++){
                        if(j==0){
                            ary.push([t.fromStation, rr[j].changeStation[0]]);
                        }else{
                            ary.push([rr[j-1].changeStation[1], rr[j].changeStation[0]]);
                        }
                    }
                    ary.push([rr[rr.length-1].changeStation[1], t.toStation]);
                    t.route[i].takeRange = ary;
                }
                
                t.getTakeMethod = function(ro){
                    if(!ro) ro=0;
                    var routeT = t.route[ro];
                    if(!routeT) return false;
                    var rt = new Array(), tmpJ = {};
                    for(var i=0; i<routeT.line.length; i++){
                        tmpJ = {
                            line: routeT.line[i],
                            takeRange: routeT.takeRange[i],
                            company: TT.fn.getCompanyOfLine(routeT.line[i])
                        };
                        if(routeT.takeRange[i][0]==routeT.takeRange[i][1]) tmpJ.doNotTakeTrain=true;
                        if(routeT.transStation && routeT.transStation[i]){
                            tmpJ.transStationID = routeT.transStation[i];
                            tmpJ.transStation = TT.fn.getCommon_transStationByID(routeT.transStation[i]);
                        }
                        rt.push(tmpJ);
                    }
                    return rt;
                }
                
                t.getAllTakeMethod = function(){
                    var rt = new Array();
                    for(var i=0; i<t.route.length; i++){
                        rt.push(t.getTakeMethod(i));
                    }
                    return rt;
                }
                return t;
            }
            
            function procRoute(tmpA, tkLen){
                        tmpA.fromStation = a;
                        tmpA.toStation = b;
                        tmpA = giveRouteTakeRange(tmpA);
                        for(var m=0; m<tmpA.route.length; m++){//Check if any first or last station on takeRange is same station
                            tkLen = tmpA.route[m].takeRange.length;
                            if(tmpA.route[m].takeRange[tkLen-2] && tmpA.route[m].takeRange[tkLen-2][1]==tmpA.route[m].takeRange[tkLen-1][1]){
                                tmpA.route.splice(m,1);
                                m--;
                            }else if(tmpA.route[m].takeRange[1] && tmpA.route[m].takeRange[1][0]==tmpA.route[m].takeRange[0][0]){
                                tmpA.route.splice(m,1);
                                m--;
                            }
                        }
                        return tmpA;
            }
            
            var notMainLineOfStation = {
                "tra_pingxi": /^tra_1804$|^tra_1805$|^tra_1806$/,
                "tra_shan": /^tra_1028$/,
                "tra_zhjy": /^tra_1120$/,
                "tra_jiji": /^tra_1207$/,
                "tra_jygx": /^tra_1215$/,
                "tra_pingdong": /^tra_1238$/,
                "tra_yilan": /^tra_1002$/,
                "tra_beihui": /^tra_1826$/,
                "tra_huadong": /^tra_1715$/
            }
            
            if(TT.fn.getRoute_needRouteByFromTo(a,b)){
                var rt = new Array(),tkLen, ckSame = new Array();
                for(var i=0; i<aLine.length; i++){
                    for(var j=0; j<bLine.length; j++){
                        if(aLine[i] != bLine[j]){
                            if(notMainLineOfStation[aLine[i]] && notMainLineOfStation[aLine[i]].test(a)) continue;
                            if(notMainLineOfStation[bLine[j]] && notMainLineOfStation[bLine[j]].test(b)) continue;
                        }
                        //continue if ever add same route but different line name
                        var tmpA = TT.fn.getRoute_mapOfFromToLine(aLine[i],bLine[j],a,b);
                        if(!tmpA.route) break;
                        var tmpA = TT.fn.getRoute_filterSameRoute(a,b,tmpA,aLine[i],bLine[j]);
                        if(aComp=='tra' && bComp=='tra'){
                        	tmpA = TT.fn.getTRA_mayUseBoneTrans(a,b,aLine[i],bLine[j],tmpA);
                        }
                        tmpA = TT.fn.getRoute_specialTrans(tmpA, a, b);
                        tmpA = procRoute(tmpA, tkLen);
                        tmpA = TT.fn.getRoute_removeTortuousRoute(a,b,tmpA,aLine[i],bLine[j]);
                        tmpA = TT.fn.getRoute_anySectTransMayFast(tmpA, a, b);
                        if(tmpA !== false){
                            rt.push(tmpA);
                        }
                    }
                }
                
                //Check if a to b maybe directly
                var bMayDirect = ((aComp=='tra' && bComp=='tra') || (aComp=='tymetro' && bComp=='tymetro'));
                var everAddList = new Array();
                //console.info(bMayDirect);
                
                if(rt.length < 1 || bMayDirect){
                    //Need Route System link different route
                    for(var i=0; i<aLine.length; i++){
                        for(var j=0; j<bLine.length; j++){
                            if(aLine[i] != bLine[j]){
                                if(notMainLineOfStation[aLine[i]] && notMainLineOfStation[aLine[i]].test(a)) continue;
                                if(notMainLineOfStation[bLine[j]] && notMainLineOfStation[bLine[j]].test(b)) continue;
                            }
                            //continue if ever add same route but different line name
                            var tmpA = TT.fn.getRoute_mapSystemOfFromToLine(aLine[i],bLine[j], a, b, everAddList);
                            //console.info($.extend({},tmpA));
                            if(tmpA.length==0) continue;
                            if(tmpA.isDirect){
                                rt.push(tmpA);
                            }else{
                                tmpA = procRoute(tmpA, tkLen);
                                if(tmpA !== false){
                                    rt.push(tmpA);
                                }
                            }
                        }
                    }
                    if(bMayDirect && aComp=='tymetro'){
                        if(aLine[0]=='tymetro_1'){
                            rt.push({
                                company: aComp,
                                displayLine: aLine[0],
                                isDirect: true,
                                takeRange: [a,b]
                            });
                        }
                    }
                }
                
                if(rt.length > 1){
                    var tmpRoute = new Array();
                    for(var i=0; i<rt.length; i++){
                        if(rt[i].isDirect){
                            tmpRoute.push({
                                line: [rt[i].displayLine],
                                takeRange: [[a,b]]
                            });
                        }else if(rt[i].route){
                            for(var j=0; j<rt[i].route.length; j++){
                                tmpRoute.push(rt[i].route[j]);
                            }
                        }
                    }
                    rt[0].route = tmpRoute; 
                }else if(rt.length<1){
                    //NO Route System link different route
                    rt[0] = false;
                }
                
                return rt[0];
            }else{
                switch(aComp){
                    case 'tra':
                        return TT.fn.getTRA_stationOnSameLine(a,b);
                    break;
                    case 'trtc':
                        return TT.fn.getTRTC_stationOnSameLine(a,b);
                    break;
                    case 'tymetro':
                        return TT.fn.tymetro.get_stationOnSameLine(a,b);
                    break;
                }
            }
        },
        getRoute_anySectTransMayFast: function(objA, a, b){
            var aComp = TT.fn.getCompanyOfStation(a),
                bComp = TT.fn.getCompanyOfStation(b),
                aLine = TT.fn.getCommon_stationOnWhatLine(a),
                bLine = TT.fn.getCommon_stationOnWhatLine(b);
            if(aComp==bComp){
            	return objA;//同公司暫不進行轉快速處理
            }
            if(aComp!='tymetro' && bComp!='tymetro'){
            	return objA;//不包含機捷時暫不進行轉快速處理
            }
        	
            var routeA = objA.route, plusAry = [], tmpB, takeRange, xa, xb, xabLine = '', xabComp = '';
            for(var i=0; i<routeA.length; i++){
            	var routeB = routeA[i];
            	takeRange = routeB.takeRange;
            	takeRange.map(function(c,cidx){
            		var newTakeRouteB = {};
            		xa = c[0], xb = c[1];
                    if(xa==xb) return false;
            		xabLine = routeB.line[cidx];
            		xabComp = TT.fn.getCompanyOfStation(xa);
            		switch(xabComp){
            			case 'tymetro':
            				var tmpA = TT.fn.getRoute_mapOfFromToLine(xabLine,xabLine,xa,xb);
            				var getStationData = TT.fn.tymetro.get_stationDataOfID;//('tymetro_a03').sect
            				var flgA = (getStationData(xa).sect != getStationData(xb).sect) ? true : false;
                            var flgB = (xa=='tymetro_a08' || xb=='tymetro_a08') ? false : true;
            				if(tmpA && flgA && flgB){
            					var xTransInfo = tmpA.getRouteAt();
            					for(var i=0; i<xTransInfo.length; i++){
            						newTakeRouteB = TT.fn.getRoute_convertSect2TransRoute(routeB, cidx, xTransInfo[0]);
            						routeA.push(newTakeRouteB);
            					}
            				}
            			break;
            		}
            	});
            }
            
            return objA;
        },
        getRoute_convertSect2TransRoute: function(routeB, idx, transInfo){
        	//將 routeB 的 idx 段 line 轉繼為 transInfo 的兩段
        	var ti, tLine='', line = [], takeRange = [], transStation = [];
        	for(var i =0; i<routeB.line.length; i++){
        		ti = i-1;
        		tLine = routeB.line[i];
        		if(i==idx){
        			//是要處理的，用 transInfo 拆開來
        			line.push(tLine);
        			takeRange.push([routeB.takeRange[i][0], transInfo.changeStation[0]]);
        			if(ti>=0) transStation.push(routeB.transStation[ti]);
        			
        			line.push(tLine);
        			takeRange.push([transInfo.changeStation[1],routeB.takeRange[i][1]]);
        			transStation.push(transInfo.id);
        		}else{
        			line.push(tLine);
        			takeRange.push(routeB.takeRange[i]);
        			if(ti>=0) transStation.push(routeB.transStation[ti]);
        		}
        	}
        	return {
        		line: line,
        		takeRange: takeRange,
        		transStation: transStation
        	}
        },
        getRoute_directionByFromToLine: function(a,b, routeOM){
            var routeM = $.extend({},routeOM);
        	var fsFlag = true;
        	//testObj = (routeMap[i].fromToLineReg) ? routeMap[i].fromToLineReg : routeMap[i].fromToLine;
        	if(routeM.fromToLineReg){
                var fromToLineReg = new Array();
                routeM.fromToLineReg.map(function(tm){
                    fromToLineReg.push(new RegExp(tm));
                });
        		if(fromToLineReg[0].test(a) && fromToLineReg[1].test(b)){
        			fsFlag = true;
        		}else if(fromToLineReg[0].test(b) && fromToLineReg[1].test(a)){
                	fsFlag = false;
            	}else{
                	return false;
            	}
        	}else{//Is regexp
	            if(routeM.fromToLine[0]==a && routeM.fromToLine[1]==b){
	                fsFlag = true;
	            }else if(routeM.fromToLine[0]==b && routeM.fromToLine[1]==a){
	                fsFlag = false;
	            }else{
	                return false;
	            }
        	}

        	if(fsFlag){
        		return routeM
        	}else{
        		routeM.fromToLine = routeM.fromToLine.reverse();
	                for(var i=0; i<routeM.route.length; i++){
	                        routeM.route[i].line = routeM.route[i].line.reverse();
	                        routeM.route[i].transStation = routeM.route[i].transStation.reverse();
	                }
	                return routeM;
        	}
        },
        getRoute_mainTransStationByFromToLine: function(aLine, bLine){
            var routeMap = TT.data.routeMap;
            var ts = '';
            routeMap.map(function(t){
                if((t.fromToLine[0]==aLine && t.fromToLine[1]==bLine) || (t.fromToLine[1]==aLine && t.fromToLine[0]==bLine)){
                    var numA = (t.mainRouteNumber) ? t.mainRouteNumber : 0;
                    ts = t.route[numA].transStation[0];
                }
            });
            return ts;
        },
        getRoute_removeTortuousRoute: function(a,b,tmpA,aLine,bLine){
            var aComp = TT.fn.getCompanyOfStation(a),
                bComp = TT.fn.getCompanyOfStation(b),
                aObj = TT.fn.getCommon_stationDataOfID(a),
                bObj = TT.fn.getCommon_stationDataOfID(b);
            var regA, removeFlag = false;
            var route = tmpA.route.slice();
            for(var i=0; i<route.length; i++){
                removeFlag = false;
                if(route[i].bypassStationReg){
                    regA = new RegExp(route[i].bypassStationReg);
                    if(regA.test(a) || regA.test(b)) removeFlag = true;
                }
                if(route[i].bypassBothStationReg){
                    regA = new RegExp(route[i].bypassBothStationReg);
                    if(regA.test(a) && regA.test(b)) removeFlag = true;
                }
                if(route[i].bypassSectReg){
                    regA = new RegExp(route[i].bypassSectReg);
                    if(regA.test(aObj.sect) || regA.test(bObj.sect)) removeFlag = true;
                }
                if(removeFlag){
                    route.splice(i,1);
                    i--;
                }
            }
            tmpA.route = route;
            return tmpA;
        },
        getRoute_specialTrans: function(tmpA, a ,b){
        	//routeT = [[{company:"",line:"",takeRange:["",""],transStation:{},transStationID:""}]];
        	var rt = new Array(), sindex = 0, lineObj, sbwa, aIsSub = false, bIsSub = false;

        	function checkIsSubWorkingArea(line,st){
        				lineObj = TT.fn.getCommon_lineData(line);
        				if(lineObj.subWorkingArea){
        					sbwa = lineObj.subWorkingArea;
        					for(var i=0; i<sbwa.station.length; i++){
        						if(st==sbwa.station[i]) return sbwa;
        					}
        				}
        				return false;
        	}
        	if(tmpA.route && tmpA.route.length>0){
        		tmpA.route.map(function(routeB, idxB){
        			var tLine = routeB.line.slice();
        			var tTS = routeB.transStation.slice();
        			if(routeB.line[0]=='tra_liujia'){
        				aIsSub = checkIsSubWorkingArea(routeB.line[0],a);
        				if(aIsSub){
        					tLine.splice(0,0,routeB.line[0]);
        					tTS.splice(0,0,aIsSub.transStationID);
        					tmpA.route.push({
        						line: tLine,
        						transStation: tTS
        					})
        				}

        			}else if(routeB.line[routeB.line.length-1]=='tra_liujia'){
        				bIsSub = checkIsSubWorkingArea(routeB.line[routeB.line.length-1],b);
        				if(bIsSub){
        					tLine.push(routeB.line[routeB.line.length-1]);
        					tTS.push(bIsSub.transStationID);
        					tmpA.route.push({
        						line: tLine,
        						transStation: tTS
        					})
        				}
        			}
        			
        		})
        	}

        	//if(rt.length==0) rt = false;
        	return tmpA;
        },
        getRoute_systemOfTrans: function(cfg){
            cfg = cfg || {}
            var rs = TT.data.routeSystem.filter(function(item){
                if(cfg.company && item.company){
                    return ((item.company==cfg.company) && (item.rType=='trans')) ? true : false;
                }else{
                    return ((item.rType=='trans')) ? true : false;
                }
            });
            
            if(cfg.line && cfg.line.length==2){
                var line0, line1;
                rs = rs.filter(function(item){
                    if(item.lineInclude){
                        line0 = false, line1 = false;
                        item.lineInclude[0].map(function(lineID){
                            if(lineID==cfg.line[0]) line0 = true;
                        });
                        item.lineInclude[1].map(function(lineID){
                            if(lineID==cfg.line[1]) line1 = true;
                        });
                        if(line0==false || line1==false){
                            line0 = false, line1 = false;
                            item.lineInclude[0].map(function(lineID){
                                if(lineID==cfg.line[1]) line0 = true;
                            });
                            item.lineInclude[1].map(function(lineID){
                                if(lineID==cfg.line[0]) line1 = true;
                            });
                        }
                        return (line0 && line1);
                    }else{
                        return true;
                    }
                });
            }
            
            return rs;
        },
        getRoute_filterSameRoute: function(a,b,routeM,aLine,bLine){
            var aComp = TT.fn.getCompanyOfStation(a),
                bComp = TT.fn.getCompanyOfStation(b),
                aObj = TT.fn.getCommon_stationDataOfID(a),
                bObj = TT.fn.getCommon_stationDataOfID(b);
            var route = routeM.route;
            aLine = (aLine) ? aLine : TT.fn.getCommon_stationOnWhatLine(a)[0];
            bLine = (bLine) ? bLine : TT.fn.getCommon_stationOnWhatLine(b)[0];
            var aLineData = TT.fn.getCommon_lineData(aLine);
            var bLineData = TT.fn.getCommon_lineData(bLine);
            
            if(aComp=='tra' && bComp=='tra'){
                var aArea = aLineData.area, bArea=bLineData.area;
                if(aObj.sect=='taipei' || aObj.sect=='keelung') aArea = 'ew';
                if(bObj.sect=='taipei' || bObj.sect=='keelung') bArea = 'ew';
                var dir = TT.fn.getTRA_LineDirByFromTo(a,b);
                if(aObj.big && bObj.big && TT.fn.check_TRA_hasSameBigWord(aObj.big,bObj.big)){
                    route.length = 0;
                }else{
                    var protectTransStation = new Array();
                    if(aLineData.protectStation && aLineData.protectStation.length>0){
                        aLineData.protectStation.map(function(st){
                            if(!aLineData.protectStationSect || !aLineData.protectStationSect[st] || aLineData.protectStationSect[st].indexOf(bObj.sect)!=-1){
                                protectTransStation.push(st);
                            }
                        });
                    }
                    if(bLineData.protectStation && bLineData.protectStation.length>0){
                        bLineData.protectStation.map(function(st){
                            if(!bLineData.protectStationSect || !bLineData.protectStationSect[st] || bLineData.protectStationSect[st].indexOf(aObj.sect)!=-1){
                                protectTransStation.push(st);
                            }
                        });
                    }
                    var rs = TT.fn.getRoute_systemOfTrans({
                        line: [aLine, bLine],
                        station: [a,b],
                        company: aComp
                    });
                    if(rs[0]){
                        var rst = rs[0], transStAry = new Array();
                        rst.rule.map(function(ru){
                            var regexA = {}, retA = false, retB = false;
                                regexA.line = (ru.line) ? new RegExp(ru.line.join('|')) : /gdfhghdfhf/;
                                regexA.sect = (ru.sect) ? new RegExp(ru.sect.join('|')) : /gdfhghdfhf/;
                                regexA.station = (ru.station) ? new RegExp(ru.station.join('|')) : /gdfhghdfhf/;
                        
                        	if(regexA.line.test(aLine) || regexA.sect.test(aObj.sect) || regexA.station.test(aObj.id)) retA = true;
                        	if(regexA.line.test(bLine) || regexA.sect.test(bObj.sect) || regexA.station.test(bObj.id)) retB = true;
                        	if(retA && retB){
                            	protectTransStation.push(TT.fn.getRoute_transStationById(ru.transStation).changeStation[0]);
                        	}
                        });
                    }
                    
                    //Use protectTransStation to filter no-in station
                    //console.info(protectTransStation);
                    if(protectTransStation.length > 0){
                        var regPTS = new RegExp(protectTransStation.join('|'));
                        var tsFlag;
                        var newRoute = new Array();
                        route.map(function(rr){
                            tsFlag = true;
                            rr.transStation.map(function(rst){
                                if(!regPTS.test(TT.fn.getCommon_transStationByID(rst).changeStation[0])){
                                    tsFlag = false;
                                }
                            });
                            if(tsFlag) newRoute.push(rr);
                        });
                        route = newRoute;
                        routeM.route = newRoute;
                    }else{
                        routeM.route.length = 0;
                        TT.fn.dLog('getRoute_filterSameRoute: filter all trans station.');
                    }
                }
            }
            
            return routeM;
        },
        getRoute_mapOfFromToLine: function(a,b,aStation,bStation){
            var routeMap = $.extend(true,[],TT.data.routeMap);//TT.data.routeMap;
            var aObj = TT.fn.getCommon_stationDataOfID(aStation);
            var bObj = TT.fn.getCommon_stationDataOfID(bStation);
            var testObj;
            for(var i=0; i<routeMap.length; i++){
                if(routeMap[i].fromToLineReg){
                    testObj = new Array();
                    routeMap[i].fromToLineReg.map(function(tm){
                        testObj.push(new RegExp(tm));
                    });
                }else{
                    testObj = routeMap[i].fromToLine;
                }
            	if(TT.fn.checkEquaArrayStartEnd([a,b], testObj) && TT.fn.checkEquaSectStartEnd(aObj.sect,bObj.sect,routeMap[i].sect)){
                    var tmpA = TT.fn.getRoute_directionByFromToLine(a,b,routeMap[i]);
                    tmpA = TT.fn.giveRoute_mapTool(tmpA);
                    return tmpA;
                }
            }
            return false;
        },
        getRoute_mapSystemOfFromToLine: function(aLine, bLine, a, b, everAddList){
            var routeSystem = $.extend([],TT.data.routeSystem),
                aComp = TT.fn.getCompanyOfLine(aLine),
                bComp = TT.fn.getCompanyOfLine(bLine);
            var regexA, regexB, lineS;
            var displayPri = TT.defined.displayPri;
            var rt = new Array();;
            
            if(aComp==bComp){
                routeSystem.map(function(rs){
                    regexA = new RegExp(aLine);
                    regexB = new RegExp(bLine);
                    if(regexA.test(rs.lineStr) && regexB.test(rs.lineStr)){
                        if(rs.rType=='direct'){
                            var strA = '';
                            for(var i=0; i<displayPri[aComp].length; i++){
                                lineS = displayPri[aComp][i];
                                if(aLine==lineS || bLine==lineS){
                                    strA = lineS;
                                    break;
                                }
                            };
                            rt = {
                                fromToLine: [aLine, bLine],
                                displayLine: strA,
                                isDirect: true
                            }
                        }
                    }
                });
            }else{
                routeSystem.map(function(rs){
                    if(rs.rType=='cross'){
                        var rsRegLine = new RegExp(rs.regLine), objARegLine;
                    	if(rsRegLine.test(aLine) && rsRegLine.test(bLine)){
                            var aObj, bObj, tmpRoute = {}, rtAry = new Array();
                            var aryCompany = $.extend([],rs.company), aryTS;
                            if(bComp==rs.company[0]) aryCompany = aryCompany.reverse();
                            rs.link.map(function(objA){
                                objARegLine = new RegExp(objA.regLine);
                            	if(objARegLine.test(aLine) && objARegLine.test(bLine)){
                            		aryTS = $.extend([],objA.transStation);
                            		if(bComp==rs.company[0]) aryTS = aryTS.reverse();
                            	}
                            });
                            
                            var aryFullRoute = new Array(),
                                aryFullTakeRange = new Array(),
                                aryFullTS = new Array();
                            aryTS.map(function(tsAry,idx){
                            	var aCmbTS = new Array(), bCmbTS = new Array();
                                aryFullTakeRange[idx] = new Array();
                                aryFullTS[idx] = new Array();
                            	if(idx==0){
                            		tsAry.map(function(ts,tidx){
                            			ts = TT.fn.getRoute_transStationById(ts);
                            			if(TT.fn.getCompanyOfStation(ts.changeStation[0])==aComp){
                                            aryFullTakeRange[idx].push([a,ts.changeStation[0]]);
                            			}else{
                                            aryFullTakeRange[idx].push([a,ts.changeStation[1]]);
                            			}
                                        aCmbTS.push(ts);
                                        aryFullTS[idx].push(ts);
                            		});
                            	}
                                
                                if(idx>0){
                                    tsAry.map(function(ts,tidx){
                            			ts = TT.fn.getRoute_transStationById(ts);
                            			if(TT.fn.getCompanyOfStation(ts.changeStation[0])==TT.fn.getCompanyOfStation(aryFullTakeRange[idx-1][1])){
                                            aryFullTakeRange[idx].push([ts.changeStation[0],ts.changeStation[1]]);
                            			}else{
                                            aryFullTakeRange[idx].push([ts.changeStation[1],ts.changeStation[0]]);
                            			}
                                        aryFullTS[idx].push(ts);
                            		});
                                }
                                
                                if(idx==aryTS.length-1){
                                    aryFullTakeRange[idx+1] = new Array();
                            		tsAry.map(function(ts,tidx){
                            			ts = TT.fn.getRoute_transStationById(ts);
                            			if(TT.fn.getCompanyOfStation(ts.changeStation[0])==bComp){
                                            aryFullTakeRange[idx+1].push([ts.changeStation[0],b]);
                            			}else{
                                            aryFullTakeRange[idx+1].push([ts.changeStation[1],b]);
                            			}
                                        bCmbTS.push(ts);
                                        //aryFullTS[idx].push(ts);
                            		});
                            	}
                            });
                            
                                            //console.info(aryFullTakeRange);console.info(aryFullTS);
                            var ttkrg, ttTS, ttRot;
                            for(var te=0; te<aryFullTakeRange.length; te++){
                                aryFullRoute[te] = new Array();
                                ttkrg = aryFullTakeRange[te];
                                for(var i=0; i<ttkrg.length; i++){
                                    aryFullRoute[te][i] = TT.fn.getCommon_theTransRouteByFromTo(ttkrg[i][0], ttkrg[i][1]);
                                    if(te < aryFullTakeRange.length-1){
                                        ttTS = aryFullTS[te][i];
                                        ttRot = aryFullRoute[te][i];
                                        ttRot.map(function(dmf){
                                            dmf[dmf.length-1].transStation = ttTS;
                                            dmf[dmf.length-1].transStationID = ttTS.id;
                                        });
                                    }
                                }
                            }
                            
                            //combine all map
                            //console.info($.extend([],aryFullRoute));
                            var aryTotalRoute = new Array();
                            if(aryFullTS.length==1){ //Just a combine b
                                var tmpAryT1Route = new Array(), tmpSAryT1Route = new Array(), aryR1 = new Array(), tmpC, tmpCRTS, includeFlag;
                                aryFullRoute[0].map(function(t1,t1idx){
                                    var tsObj = aryFullTS[0][t1idx];
                                    tmpSAryT1Route[t1idx] = new Array();
                                    t1.map(function(t2,t2idx){
                                        includeFlag = false;
                                        if(t2[t2.length-1].line != tsObj.changeLine[0] && t2[t2.length-1].line != tsObj.changeLine[1]){
                                            //console.log(t2[t2.length-1].line + ',' + tsObj.changeLine[0] + ',' + tsObj.changeLine[1]);
                                            if(rs.lineIsSame){
                                                if(rs.lineIsSame[tsObj.changeLine[0]] && new RegExp(rs.lineIsSame[tsObj.changeLine[0]]).test(t2[t2.length-1].line)) includeFlag = true;
                                                if(rs.lineIsSame[tsObj.changeLine[1]] && new RegExp(rs.lineIsSame[tsObj.changeLine[1]]).test(t2[t2.length-1].line)) includeFlag = true;
                                            }
                                        }else{
                                            includeFlag = true;
                                        }
                                        
                                        if(includeFlag){
                                            tmpAryT1Route.push(t2);
                                            tmpSAryT1Route[t1idx].push(t2);
                                        }
                                    });
                                });
                                aryFullRoute[1].map(function(t1,t1idx){
                                    aryR1[t1idx] = $.extend([],tmpSAryT1Route[t1idx]);
                                    t1.map(function(t2, t2idx){
                                        aryR1[t1idx].map(function(tr1,trIdx){
                                            tmpC = $.extend([],aryR1[t1idx][trIdx]);
                                            tmpCRTS = tmpC[tmpC.length-1].transStation;
                                            for(var i=0; i<t2.length; i++){
                                                if(i==0 && tmpCRTS && tmpCRTS.changeLine[0]!=t2[i].line && tmpCRTS.changeLine[1]!=t2[i].line){
                                                    includeFlag = false;
                                                    if(rs.lineIsSame){
                                                        if(rs.lineIsSame[tmpCRTS.changeLine[0]] && new RegExp(rs.lineIsSame[tmpCRTS.changeLine[0]]).test(t2[i].line)) includeFlag = true;
                                                        if(rs.lineIsSame[tmpCRTS.changeLine[1]] && new RegExp(rs.lineIsSame[tmpCRTS.changeLine[1]]).test(t2[i].line)) includeFlag = true;
                                                    }
                                                    if(!includeFlag) return false;
                                                }
                                                tmpC.push(t2[i]);
                                            }
                                            aryTotalRoute.push(tmpC);
                                        });
                                    });
                                });
                                //console.info(aryTotalRoute);
                            }
                            //console.info(aryTotalRoute);
                            
                            //Trans combine map to route
                            tmpRoute = (function(){
                                var rtA = new Array();
                                aryTotalRoute.map(function(ro){
                                    var s_ln = new Array(), s_tkRg = new Array(), s_ts = new Array();
                                    for(var i=0; i<ro.length; i++){
                                        s_ln.push(ro[i].line);
                                        s_tkRg.push(ro[i].takeRange);
                                        if(ro[i].transStationID) s_ts.push(ro[i].transStationID);
                                    }
                                    var writeFlag = writeEverAddList(s_ln , s_ts);
                                    if(writeFlag){
                                        rtA.push({
                                            line: s_ln,
                                            takeRange: s_tkRg,
                                            transStation: s_ts
                                        });
                                    }
                                });
                                return rtA;
                            })();
                            
                            rt = {
                                fromToLine: [aLine, bLine],
                                id: aLine + ',' + bLine,
                                isRoute: true,
                                route: tmpRoute,
                                sect: rs.sect
                            };
                            
                            rt = TT.fn.giveRoute_mapTool(rt);
                        }
                    }
                });
            }
            
            function writeEverAddList(s_ln , s_ts){
                if(!everAddList) return true;
                var ws = a + ',' + b, rs = '';
                rs = ws + ':' + s_ln.join() + s_ts.join();
                for(var i=0; i<everAddList.length; i++){
                    if(rs==everAddList[i]) return false;
                }
                everAddList.push(rs);
                return true;
            }
            
            return rt;
        },
        getRoute_needRouteByFromTo: function(a,b){
            var aComp = TT.fn.getCompanyOfStation(a);
            var bComp = TT.fn.getCompanyOfStation(b);
            
            if(aComp==bComp){
                switch(aComp){
                    case 'tra':
                        var ary = TT.fn.getTRA_stationOnSameLine(a,b), lineData;
                        if(ary){
                            var lineData = TT.fn.getCommon_lineData(ary[0]);
                            if(lineData.innerNeedTransAt && a!=lineData.innerNeedTransAt && b!=lineData.innerNeedTransAt){
                                var aidx =0, bidx = 0, cidx = 0;
                                lineData.station.map(function(c,idx){
                                    if(a==c) aidx = idx;
                                    if(b==c) bidx = idx;
                                    if(lineData.innerNeedTransAt==c) cidx = idx;
                                });
                                if((aidx>cidx && bidx<cidx) || (aidx<cidx && bidx>cidx)){
                                    return true;
                                }
                            }
                            
                            return false;
                        }else{
                            return true;
                        }
                    break;
                    case 'trtc':
                        var ary = TT.fn.getTRTC_stationOnSameLine(a,b), lineData;
                        if(TT.fn.getTRTC_stationOnSameLine(a,b)){
                            for(var i=0; i<ary.length; i++){
                                lineData = TT.fn.getTRTC_lineData(ary[i]);
                                if(lineData.splitStation && lineData.splitStation.length>0){
                                    if(TT.fn.getTRTC_stationOnDiffSplitOutArea(a,b,lineData.id)) return true;
                                }
                            }
                            return false;
                        }else{
                            return true;
                        }
                    break;
                    case 'tymetro':
                        return TT.fn.tymetro.check_changeMayFastByFromTo(a,b);
                    break;
                }
            }else{
                return true;
            }
        },
        getRoute_searchAutoSplitRoute: function(a, b, routeT){//自動分段演算搜尋法
            
            var aComp = TT.fn.getCompanyOfStation(a),
                bComp = TT.fn.getCompanyOfStation(b);
            if(aComp==bComp && bComp=='tra'){
                routeT = TT.fn.getTRA_linkRouteV1(a, b, routeT);
            }
            return routeT;
        },
        getRoute_systemById: function(id){
            var d = TT.data.routeSystem;
            for(var i=0; i<d.length; i++){
                if(d[i].id==id) return d[i];
            }
            return false;
        },
        getRoute_transStationById: function(id){
            var d = TT.data.transStation;
            for(var i=0; i<d.length; i++){
                if(d[i].id==id) return d[i];
            }
            return false;
        },
        getRoute_transStationByStationId: function(stid, line1, line2){
            var d = TT.data.transStation;
            var tmpA = false, tmpB = false;
            for(var i=0; i<d.length; i++){
                if(d[i].changeStation.indexOf(stid)>=0 && (d[i].changeLine.indexOf(line1)>=0 && d[i].changeLine.indexOf(line2)>=0)) return d[i];
                if(d[i].changeStation.indexOf(stid)>=0 && (d[i].changeLine.indexOf(line1)>=0 || d[i].changeLine.indexOf(line2)>=0)) tmpA = d[i];
                if(d[i].changeStation.indexOf(stid)>=0) tmpB = d[i];
            }
            if(tmpA) return tmpA;
            return tmpB;
        },
        giveRoute_transStationOtherData: function(t, aLine, bLine){
            var tmp = $.extend({},TT.fn.getCommon_transStationByID(t));
                    tmp.fromLine = aLine;
                    tmp.fromCompany = TT.fn.getCompanyOfLine(tmp.fromLine);
                    tmp.toLine = bLine;
                    tmp.toCompany = TT.fn.getCompanyOfLine(tmp.toLine);
                    if(tmp.fromLine!=tmp.changeLine[0] && tmp.toLine!=tmp.changeLine[1]){
                        TT.fn.dLog('giveRoute_transStationOtherData: aLine and bLine are different of route');
                        tmp.changeLine.reverse();
                        tmp.changeStation.reverse();
                    }
            return tmp;
        },
        giveRoute_mapTool: function(t){
            t.isRoute = true;
            
            t.getRouteAt = function(ro){
                if(!ro) ro=0;
                var route = t.route[ro], tmp;
                var rAry = new Array();
                for(var i=0; i<route.transStation.length; i++){
                    if(!route.transStation[i]){
                        route.transStation[i] = TT.fn.getRoute_mainTransStationByFromToLine(route.line[i], route.line[i+1]);
                        TT.fn.dLog('giveRoute_mapTool: original data without transStation data');
                    }
                    //tmp = TT.fn.getCommon_transStationByID(route.transStation[i]);
                    //tmp.fromLine = route.line[i];
                    //tmp.fromCompany = TT.fn.getCompanyOfLine(tmp.fromLine);
                    //tmp.toLine = route.line[i+1];
                    //tmp.toCompany = TT.fn.getCompanyOfLine(tmp.toLine);
                    //if(tmp.fromLine==tmp.changeLine[1]){
                        //tmp.changeLine.reverse();
                        //tmp.changeStation.reverse();
                    //}
                    tmp = TT.fn.giveRoute_transStationOtherData(route.transStation[i], route.line[i], route.line[i+1]);
                    rAry.push(tmp);
                }
                return rAry;
            }
            return t;
        },
        //TRA Function
        createTRA_routeFile: function(){
            //除了西部與東部幹線固定作範例設計於 routeMap 外，其他 TRA 路線可用自動產生方式製作
            var routeTransStation = {
                "tra_xibu": {
                    sect: ['keelung','taipei','taoyuan','hsinchu'],
                    transStation: ["qidutra1","songshantra1","taipeitra1","banqiaotra1","taoyuantra1","zhonglitra1","hsinchutra1"]
                },
                "tra_shan": {
                    sect: ['miaoli','taichung'],
                    transStation: ["miaolitra1","fengyuantra1","taizhongtra1"]
                },
                "tra_zhjy": {
                    sect: ['changhua','yunlin','chiayi'],
                    transStation: ["zhanghuatra1","yuanlintra1","douliutra1","jiayitra1"]
                    
                },
                "tra_jygx": {
                    sect: ['chiayi','tainan','kaohsiung'],
                    transStation: ["jiayitra1","xinyingtra1","tainantra1","gangshantra1","gaoxungtra1"]
                },
                "tra_pingdong": {
                    sect: ['kaohsiung','pingdong'],
                    transStation: ["gaoxungtra1","fongshantra1","pingdongtra1","chaozhoutra1"]
                }
            }
            
            var rm = [], tmpA = false, tmpSect = false, tmpTS = false, aryA = false, aryB = false;
            function createFn(aLine, bLine){
                tmpSect = routeTransStation[aLine].sect.concat(routeTransStation[bLine].sect);
                tmpTS = (function(){
                    aryA = [];
                    aryB = [];
                    aryA = JSON.parse(JSON.stringify(routeTransStation[aLine].transStation)).concat(routeTransStation[bLine].transStation);
                    aryA = aryA.filter(function(el, idx, arr){
                        return arr.indexOf(el) === idx;
                    });

                    aryA.map(function(c){
                        aryB.push({
                            line: [aLine, bLine],
                            transStation: [c]
                        });
                    });
                })();
                tmpA = {
                    id: 'traInnerTrans_' + aLine + ',' + bLine,
                    fromToLine: [aLine,bLine],
                    sect: tmpSect,
                    route: aryB
                }
                return tmpA
            }
            var routeMap = TT.data.routeMap;
            routeMap.push(createFn("tra_xibu", "tra_pingdong"));
            routeMap.push(createFn("tra_shan", "tra_pingdong"));
            routeMap.push(createFn("tra_zhjy", "tra_pingdong"));
            routeMap.push(createFn("tra_jygx", "tra_pingdong"));
        },
        getTRA_allTimeByFromTo: function(a,b,timeTable){
            var dir = TT.fn.getTRA_LineDirByFromTo(a,b);
            var fromInLine = TT.fn.getTRA_stationOnWhatLine(a), toInLine = TT.fn.getTRA_stationOnWhatLine(b);
            var flagIsShanHaiTrans = !!(fromInLine.length==1 && toInLine.length==1 && ((fromInLine[0]=='tra_hai' && toInLine[0]=='tra_shan') || (fromInLine[0]=='tra_shan' && toInLine[0]=='tra_hai')));

            if(!timeTable){
                timeTable = TT.fn.getTRA_dayTimeTable();
            }else if(typeof(timeTable)=='string'){
                timeTable = TT.fn.getTRA_dayTimeTable(timeTable);
            }
            
            var aryTime = new Array();
            var flgDirIsReady = false;
            for(var i=0; i<timeTable.length; i++){
                var timeInfo = timeTable[i].TimeInfo;
                var aST = TT.fn.getTRA_stationIsOnThisTime(a, timeInfo);
                var bST = TT.fn.getTRA_stationIsOnThisTime(b, timeInfo);
                var pTimeTable;
                flgDirIsReady = true;//(timeTable[i].LineDir==dir) || (flagIsShanHaiTrans);
                if(aST!==false && bST!==false && flgDirIsReady){
                    if(aST > bST) continue;
                    pTimeTable = $.extend({},timeTable[i]);
                    pTimeTable.fromStation = a;
                    pTimeTable.toStation = b;
                    aryTime.push(pTimeTable);
                }
            }
            return aryTime;
        },
        getTRA_infoOfCar: function(car, timeTable){
            if(!timeTable){
                timeTable = TT.fn.getTRA_dayTimeTable();
            }else if(typeof(timeInfo)=='string'){
                timeTable = TT.fn.getTRA_dayTimeTable(timeTable);
            }
            
            for(var i=0; i<timeTable.length; i++){
                if(timeTable[i].Train==car){
                    return timeTable[i];
                }
            }
            return false;
        },
        getTRA_mayUseBoneTrans: function(a, b, aLine, bLine, routeM){
        	//{line: ['1','2','3'], transStation: ['t1','t2']}
        	var route = routeM.route, tmpR, aTS, bTS, asIndex, bsIndex,
        		rt = new Array(),
        		sectAry = TT.data.tra.sect_ary,
        		dir = TT.fn.getTRA_LineDirByFromTo(a,b),
        		aNear = TT.fn.getTRA_nearBigStation(a, aLine),
        		bNear = TT.fn.getTRA_nearBigStation(b, bLine),
                aObj = TT.fn.getCommon_stationDataOfID(a),
                bObj = TT.fn.getCommon_stationDataOfID(b);
        	
            function getNearBig(st, stObj, nearAry){
                    if(nearAry.length>1){
                        if(dir==TT.fn.getTRA_LineDirByFromTo(a,b) && st==b) nearAry.reverse();
                        var anst = (dir=='1') ? nearAry[0] : nearAry[1];
                    }
                    if(st=='tra_1032' || st=='tra_1013' || st=='tra_1014') anst = 'tra_1011';
        			if(!anst) anst = nearAry[0];
                    return anst;
            }
            
        	route.map(function(ro){
        		rt.push(ro);
        		aTS = TT.fn.getCommon_stationDataOfID(TT.fn.getCommon_transStationByID(ro.transStation[0]).changeStation[0]);
        		bTS = TT.fn.getCommon_stationDataOfID(TT.fn.getCommon_transStationByID(ro.transStation[ro.transStation.length-1]).changeStation[0]);
        		asIndex = TT.fn.getTRA_sectAB(aObj,aTS);
        		bsIndex = TT.fn.getTRA_sectAB(bObj,bTS);
        		var lineAry = new Array(), tAry = new Array();
        		ro.line.map(function(tl){lineAry.push(tl);});
        		ro.transStation.map(function(tl){tAry.push(tl);});
        		var pushFlag = false;
        		if(asIndex>1 && a!=aNear[0]){
        			var pushFlag = true;
        			lineAry.splice(0,0,aLine);
                    var anst = getNearBig(a, aObj, aNear);
        			tAry.splice(0,0,TT.fn.getCommon_transStationBySameChangeStation(anst).id);
        		}
        		if(bsIndex>1 && b!=bNear[0]){
        			var pushFlag = true;
        			lineAry.push(bLine);
                    var bnst = getNearBig(b, bObj, bNear);
        			tAry.push(TT.fn.getCommon_transStationBySameChangeStation(bnst).id);
        		}
        		if(pushFlag) rt.push({line:lineAry, transStation: tAry});
        	});
            
            if(route.length==0 && (!aObj.big || !bObj.big) && (TT.fn.getTRA_sectAB(aObj, bObj)>1)){
                if(!aObj.big){
                    var anst = getNearBig(a, aObj, aNear);
                    rt.push({line:[aLine,bLine], transStation: [TT.fn.getCommon_transStationBySameChangeStation(anst).id]});
                }else if(!bObj.big){
                    var bnst = getNearBig(b, bObj, bNear);
                    rt.push({line:[aLine,bLine], transStation: [TT.fn.getCommon_transStationBySameChangeStation(bnst).id]});
                }
            }
            if(rt.length==0){
                rt.push({line:[aLine,bLine], transStation: []});
            }
            //filter same route of bone
            var boneMisAry = new Array(), tmpString;
            for(var i=0; i<rt.length; i++){
                tmpString = rt[i].line.join() + rt[i].transStation.join();
                for(var j=0; j<boneMisAry.length; j++){
                    if(tmpString==boneMisAry[j]){
                        tmpString = 'xxxx';
                        break;
                    }
                }
                if(tmpString=='xxxx'){
                    rt.splice(i,1);
                    i--;
                }else{
                    boneMisAry.push(tmpString);
                }
            }
			routeM.route = rt;
        	return routeM;
        },
        getTRA_nearBigStation: function(st, line, area){
            var stObj = TT.fn.getCommon_stationDataOfID(st);
            var lineData = TT.fn.getCommon_lineData(line);
            if(area && TT.fn.check_TRA_hasSameBigWord(stObj.big,area)) return [st];
            if(!area && stObj.big) return [st];
            
            var tmpST, rt = new Array(), ast, bst, cflag=false;
            if(lineData.dir=='0'){var stationAry = lineData.station}else{
                var stationAry = new Array();
                lineData.station.map(function(ggh){stationAry.push(ggh);});
                stationAry.reverse();
            }
            for(var i=0; i<stationAry.length; i++){
                if(stationAry[i]==st) cflag = true;
                tmpST = TT.fn.getCommon_stationDataOfID(stationAry[i]);
                if(area){
                    if(TT.fn.check_TRA_hasSameBigWord(tmpST.big,area)){
                        if(!cflag){
                            ast = stationAry[i];
                        }else{
                            bst = stationAry[i];
                            break;
                        }
                    }
                }else{
                    if(tmpST.big){
                        if(!cflag){
                            ast = stationAry[i];
                        }else{
                            bst = stationAry[i];
                            break;
                        }
                    }
                }
            }
            if(ast) rt.push(ast);
            if(bst) rt.push(bst);
            return rt;
        },
        getTRA_sectIndex: function(st){
        	if(typeof(st)=='string') st = TT.fn.getCommon_stationDataOfID(st);
        	var sectAry = TT.data.tra.sect_ary;
        	for(var i=0; i<sectAry.length; i++){
        		if(st.sect==sectAry[i]) return i;
        	}
        },
        getTRA_sectAB: function(a,b){
        	var ai = TT.fn.getTRA_sectIndex(a);
        	var bi = TT.fn.getTRA_sectIndex(b);
        	return Math.abs(ai-bi);
        },
        getTRA_timeOfStationOnCar: function(stationID, carTime){
            stationID = TT.fn.getTRA_stationID(stationID);
            if(carTime.TimeInfo){
                for(var i=0; i<carTime.TimeInfo.length; i++){
                    if(carTime.TimeInfo[i].Station==stationID){
                        var rt = carTime.TimeInfo[i];
                        rt.carInfo = carTime;
                        return rt;
                    }
                }
            }
            return false;
        },
        getTRA_timeRangeByFromTo: function(a,b,startTime,endTime,flagAD,timeTable){
            if(!startTime) startTime = 0;
            if(!endTime) endTime = 60*60*24-1;
            timeTable = TT.fn.getTRA_allTimeByFromTo(a,b,timeTable);
            if(flagAD===undefined) flagAD = true;//true 為出發，false 為到達
            if(typeof(startTime)!='number') startTime = TT.fn.transTime2Sec(startTime);
            if(typeof(endTime)!='number') endTime = TT.fn.transTime2Sec(endTime);
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime),
                offset1Day = 86400;
            
            function cpTime(ttb){
                var insEnd = endTime;
                var time, dept, arrt;
                if(flagAD){
                    var stationTime = TT.fn.getTRA_timeOfStationOnCar(a,ttb);
                    if(stationTime){
                        dept = stationTime.DEPTime || stationTime.DepTime;
                        time = TT.fn.transTime2Sec(dept);
                    }
                }else{
                    var stationTime = TT.fn.getTRA_timeOfStationOnCar(b,ttb);
                    arrt = stationTime.ARRTime || stationTime.ArrTime;
                    if(stationTime){
                        time = TT.fn.transTime2Sec(arrt);
                    }
                }
                
                if(insEnd < startTime && insEnd < crossDaySec){
                    insEnd = insEnd + offset1Day;
                    if(time < crossDaySec){
                        time = time + offset1Day;
                    }
                }
                
                if(time && time >= startTime && time <= insEnd){
                    ttb.tt_sortTime = time;
                    return ttb;
                }else{
                    return false;
                }
            }
            
            var aryTime = new Array(),
                cpT;
            for(var i=0; i<timeTable.length; i++){
                cpT = cpTime(timeTable[i]);
                if(cpT !== false){
                    aryTime.push(cpT);
                }
            }
            aryTime = aryTime.sort(TT.fn.getTRA_sortByTTSortTime);
            return aryTime;
        },
        getTRA_dayTimeTable: function(w){
            if(w==null) w = TT.defined.defaultTRAWeekday;
            if(!TT.fn.checkTRA_dayTimeIsLoaded(w)){
                return false;
            }
            
            return TT.data.tra.timeTable[parseInt(w,10)];
        },
        getTRA_LineDirReverseNum: function(dir){
            if(dir=='1') return '0';
            if(dir=='0') return '1';
        },
        getTRA_LineDirByFromTo: function(a,b){
            if(TT.fn.getTRA_stationOnSameLine(a,b)){
                for(var i=0; i<TT.data.tra.line.length; i++){
                    var Line = TT.data.tra.line[i];
                    var aIndex = TT.fn.getTRA_stationIsOnThisLine(a, Line);
                    var bIndex = TT.fn.getTRA_stationIsOnThisLine(b, Line);
                    if(aIndex!==false && bIndex!==false){
                        if(aIndex < bIndex){
                            return Line.dir;
                        }else{
                            return TT.fn.getTRA_LineDirReverseNum(Line.dir);
                        }
                    }
                }
            }else{
                var tmsb = TT.fn.getTRA_stationOnWhatLine(b)[0];
                var tmsa = TT.fn.getTRA_stationOnWhatLine(a)[0];
                var objA = TT.fn.getCommon_lineData(tmsa);
                var rtDir;
                
                if(!objA.link[tmsb]){
                    var rs = TT.data.routeSystem;
                    rs.map(function(kdd){
                        if(kdd.id=='tra_route_line_map'){
                            kdd.link.map(function(tr){
                                if(tr.indexOf(tmsa)!=-1 && tr.indexOf(tmsb)!=-1){
                                    if(tr.indexOf(tmsa)<tr.indexOf(tmsb)){
                                        rtDir = kdd.dir;
                                    }else{
                                        rtDir = TT.fn.reverseDir(kdd.dir);
                                    }
                                }
                            });
                        }
                    });
                    return rtDir;
                }else{
                    return objA.link[tmsb].dir;
                }
            }
        },
        getTRA_LineMainDisplayName: function(a,b,lineAry){
            var aLine = TT.fn.getTRA_stationOnWhatLine(a),
                bLine = TT.fn.getTRA_stationOnWhatLine(b),
                regSubLine = /^tra_pingxi$|^tra_liujia$|^tra_jiji$|^tra_shalun$/,
                displayPri = TT.defined.displayPri['tra'],
                sameLine = TT.fn.getTRA_stationOnSameLine(a,b);
            if(sameLine && sameLine.length>=1){
                return sameLine[0];
            }
            var rtAry = aLine.concat(bLine);
            if(lineAry){
                var flg1, flg2;
                rtAry = rtAry.filter(function(el,idx,arr){
                    flg1 = !!(el.indexOf(arr)==idx);
                    flg2 = !!(el.indexOf(lineAry)>=0);
                    return flg1 && flg2;
                });
            }
            for(var i=0; i<displayPri.length; i++){
                if(!regSubLine.test(displayPri[i]) && rtAry.indexOf(displayPri[i])>=0) return displayPri[i];
            }
            return '';
        },
        getTRA_LineRouteReverse: function(Line){
            var ary;
            ary = Line.station;
            Line.dir = TT.fn.getTRA_LineDirReverseNum(Line.dir);
            Line.station = ary;
            return Line;
        },
        getTRA_linkMap: function(from, to){//尋找 from 站至 to 站可以經過的所有路線和車站
            var fromObj = TT.fn.getCommon_stationDataOfID(from),
                toObj = TT.fn.getCommon_stationDataOfID(to);
        	var afterTestLine = [],//存放格式為 lineName + '_dir' + lineDir, ex: tra_xibu_dir1
        		routeIndex = 0,
        		fromInLine = TT.fn.getTRA_stationOnWhatLine(from),
        		toInLine = TT.fn.getTRA_stationOnWhatLine(to),
        		lineLinkAry = [],
        		lineLinkStationAry = [],
        		rtAry = [];
            var flagFromHai = !!(fromInLine.length==1 && fromInLine[0]=='tra_hai'), flagToIsHai = !!(toInLine.length==1 && toInLine[toInLine.length-1]=='tra_hai');
            var flagIsShanHaiTrans = !!(fromInLine.length==1 && toInLine.length==1 && ((fromInLine[0]=='tra_hai' && toInLine[0]=='tra_shan') || (fromInLine[0]=='tra_shan' && toInLine[0]=='tra_hai')));
            var flagDoNotGoShan = !!(fromInLine.length==1 && fromInLine[0]=='tra_hai' && !flagIsShanHaiTrans),
                flagDoNotGoHai = !!(fromInLine.length==1 && fromInLine[0]=='tra_shan' && !flagIsShanHaiTrans);
        	
        	function checkIsTestLine(line, dir){
        		return !!(afterTestLine.indexOf(line + '_dir' + dir) >= 0);
        	}
        	function addAfterTestLine(line, dir){
        		afterTestLine.push(line + '_dir' + dir);
        	}
        	function findLineLink(lineStr, lineRoute, stationRoute){
        		var lineObj = TT.fn.getCommon_lineData(lineStr);
        		var linkObj = lineObj.link;
        		var tmpLink = false, tmpAryRoute = false, tmpStationRoute = false, flagIsStopLine = false, flagReWorkLine = false, tHaiRoute, tHaiStation;
        		var rt = [];
        		for(var k in linkObj){
        			if(flagDoNotGoShan && k=='tra_shan') continue;//海線出發不找山線
        			if(flagDoNotGoHai && k=='tra_hai') continue;//山線出發不找海線
        			if(lineRoute.indexOf(k)>=0) continue;//不找回頭路線，但海線例外可找改經山線走法
        			tmpLink = linkObj[k];
        			flagIsStopLine = !!(toInLine.indexOf(k)>=0);
        			if(!checkIsTestLine(k, tmpLink.dir) && !flagIsStopLine){
        				addAfterTestLine(k, tmpLink.dir);
        				tmpAryRoute = JSON.parse(JSON.stringify(lineRoute)); tmpStationRoute = JSON.parse(JSON.stringify(stationRoute));
        				tmpAryRoute.push(k); tmpStationRoute.push(linkObj[k].station);
        				rt.concat(findLineLink(k, tmpAryRoute, tmpStationRoute));
        			}else if(flagIsStopLine){
        				tmpAryRoute = JSON.parse(JSON.stringify(lineRoute)); tmpStationRoute = JSON.parse(JSON.stringify(stationRoute));
        				tmpAryRoute.push(k); tmpStationRoute.push(linkObj[k].station);
        				flagReWorkLine = false; 
						tmpStationRoute.map(function(c, idx){ if(tmpStationRoute.lastIndexOf(c)!=idx){flagReWorkLine = true;} });//檢查是否有路線因車站重疊兩條線而重複產生
						if(!flagReWorkLine){
        					lineLinkAry.push(tmpAryRoute); lineLinkStationAry.push(tmpStationRoute);
        					if((flagFromHai || flagToIsHai) && !flagIsShanHaiTrans){//海線到發的長途搜尋固定加上走山線到另一頭折返的路由，例如台北經台中至彰化到追分
        						tHaiRoute = tmpAryRoute.map(function(c){return c;}); tHaiStation = tmpStationRoute.map(function(c){return c;});
        						if(flagFromHai && tmpAryRoute[1]=='tra_xibu' && fromObj.sect=='taichung'){
									tHaiRoute.splice(1,0,'tra_shan'); lineLinkAry.push(tHaiRoute);
									tHaiStation.splice(1,0,'tra_1120'); lineLinkStationAry.push(tHaiStation);
								}else if(flagToIsHai && tmpAryRoute[tmpAryRoute.length-2]=='tra_xibu' && toObj.sect=='taichung'){
									tHaiRoute.splice(-1,0,'tra_shan'); lineLinkAry.push(tHaiRoute);
									tHaiStation.push('tra_1120'); lineLinkStationAry.push(tHaiStation);
								}
        					}
        				}
        			}
        		}
        		return rt;
        	}
        	
        	if(TT.fn.getTRA_stationOnSameLine(from,to)){
				var mb = TT.fn.getTRA_stationOnSameLine(from,to);
				mb.map(function(c){
					rtAry.push([{
						line: c,
						goRange: [from, to]
					}]);
				});
            }else if(flagIsShanHaiTrans){//山海線套用固定規則，竹南轉、彰化轉、成追線
                rtAry.push([{goRange: [from, 'tra_1120'], line: fromInLine[0]}, {goRange: ['tra_1120', to], line: toInLine[0]}]);
                rtAry.push([{goRange: [from, 'tra_1028'], line: fromInLine[0]}, {goRange: ['tra_1028', to], line: toInLine[0]}]);
        	}else{
	        	fromInLine.map(function(line){
	        		var ary = [line];
	        		var aryStation = [from];
	        		findLineLink(line, [line], [from]);
	        	});
	        	var tmpB = false, aryB = false, tsA = '', tsB = '', nextST = '';
	        	lineLinkAry.map(function(route, ridx){
	        		aryB = [];
	        		route.map(function(c, idx){
	        			tsA = lineLinkStationAry[ridx][idx];
	        			tsB = lineLinkStationAry[ridx][idx+1];
	        			if(idx==0){
	        				tsA = from;
	        			}else if(idx == route.length-1){
	        				tsB = to;
	        			}
	        			tmpB = {
	        				line: c,
	        				goRange: [tsA,tsB]
	        			};
	        			aryB.push(tmpB);
	        		});
	        		rtAry.push(aryB);
	        	});
        	}
        	//取得所有經過的車站
        	var routeA = false,
        		routeB = false,
        		allStation = [],
        		flagStIsOver = false,
        		bigList = (function(){ return TT.data.tra.station_ary.filter(function(el,idx){ return !!(el.big); }) })(),
                majorStationIDList = (function(){ return TT.fn.getTRA_runningByID('wZi').mustStop.concat(TT.fn.getTRA_runningByID('eZi').mustStop).filter(function(el, idx, arr){return arr.indexOf(el)==idx;})})(),
        		allBig = [], allMajor = [],
        		tmpBigIndex = -1,
				objLine = false;
			var bigStationIDList = (function(){ var rt = []; bigList.map(function(c){ rt.push(c.id); }); return rt; })();
        	for(var r=0; r<rtAry.length; r++){
        		routeA = rtAry[r];
        		allStation = []; allBig = []; allMajor = [];
        		for(var i=0; i<routeA.length; i++){
        			routeB = routeA[i];
        			objLine = TT.fn.getComon_allStationOfLineByFromTo(routeB.goRange[0],routeB.goRange[1],routeB.line);
        			routeB.station = objLine.station;
        			routeB.dir = objLine.dir;
        			allStation = allStation.concat(routeB.station);
        		}
        		allStation = allStation.filter(function(el, idx, arr){
        			flagStIsOver = !(arr[idx]==arr[idx-1]);
        			if(flagStIsOver){//檢查是否為大站
        				tmpBigIndex = bigStationIDList.indexOf(el);
        				if(tmpBigIndex>=0){ allBig.push(bigList[tmpBigIndex].id); }
        				tmpBigIndex = majorStationIDList.indexOf(el);
        				if(tmpBigIndex>=0){ allMajor.push(majorStationIDList[tmpBigIndex]); }
        			}
        			return flagStIsOver;
        		});
        		routeA.allStation = allStation;
        		routeA.allBig = allBig;
        		routeA.allMajor = allMajor;
        	}
        	return rtAry;
        },
        getTRA_linkRouteV1: function(from, to, routeT, linkMap){//找出所有經過的路線與車站後，分切適當的乘車與轉乘點
            routeT = routeT || [];
        	linkMap = linkMap || TT.fn.getTRA_linkMap(from, to);
            var fromObj = TT.fn.getCommon_stationDataOfID(from),
                toObj = TT.fn.getCommon_stationDataOfID(to),
                sect_ary = TT.data.tra.sect_ary;
            if(!TT.cData) TT.cData = {};//存放動態計算的固定資料，若曾建立過則下次不用再演算
            var cdt = TT.cData;
            //取東線及西線幹線列車運行經過車站
            cdt.defEastTrainStation = cdt.defEastTrainStation || TT.fn.getTRA_throughStationByLine('tra_1012','tra_1632', ['tra_xibu','tra_yilan','tra_beihui','tra_huadong']).allStation;
            cdt.defWestTrainStation = cdt.defWestTrainStation || TT.fn.getTRA_throughStationByLine('tra_1001','tra_1418', ['tra_xibu','tra_shan','tra_zhjy','tra_jygx','tra_pingdong']).allStation;
            //取東線及西線區域(東線+蘇澳+平溪線，西線+六家+沙崙+海線+集集線)
            var eastAreaStation = cdt.defEastTrainStation.concat(TT.fn.getCommon_lineData('tra_pingxi').station).concat(['tra_1827']);
            var westAreaStation = cdt.defWestTrainStation.concat(TT.fn.getCommon_lineData('tra_hai').station).concat(TT.fn.getCommon_lineData('tra_liujia').station).concat(TT.fn.getCommon_lineData('tra_shalun').station).concat(TT.fn.getCommon_lineData('tra_jiji').station);
            var overTaipei = -1, overKaohsiung = -1, overTaidong = -1, overBadu = -1, overShuling = -1, overChaozhou = -1, overFangliao = -1,
                displayPri = TT.defined.displayPri,
				flagCrossSect = fromObj.sect != toObj.sect,
                flagFromInWest = !!(westAreaStation.indexOf(from)!=-1),
                flagFromInEast = !!(eastAreaStation.indexOf(from)!=-1),
                flagToInWest = !!(westAreaStation.indexOf(to)!=-1),
                flagToInEast = !!(eastAreaStation.indexOf(to)!=-1),
                flagIsCrossWE = false,
                flagIsLongway = TT.fn.getTRA_recommendSectTrans(fromObj, toObj),//兩站間要穿過一個 sect 時視為長途需搭快車
                flagBypassThisRoute = false,
                routeB = false,routeC = false,routeD = false,
                ras = false,
                routeFileFrom = '', routeFileTo = '',
                lineObj = false, tsObj = false, runningAry = [],
                regSubLine = /^tra_pingxi$|^tra_liujia$|^tra_jiji$|^tra_shalun$/,
                ptr = 0,//pointer of allStation
                wesMainStationAry = false,
                routeMethd = [],
                routeConcatAry = [],
                tmpA = false, tmpB = false, tmpC = false, tmpD = false;
        	//針對 linkMap 中的所有走法 (通常只會抓到一種) 依序進行下列演算，若可抓到最後一站即代表已有全程走法可結束並組合路由回傳
            //測試語法 TT.fn.getTRA_linkRouteV1('tra_1715','tra_1418')
            function createRoute(routeX){
            	//回傳陣列內每個物件內容應為 {company:'yyy', line:'xxxx', takeRange:[a,b], transStation:transStation, transStationID: 'vvv'} 最後一段不用 transStation transStationID
            	routeMethd = [];
                routeX.map(function(routeFile, ridx){
                	tmpC = (routeFile.running && routeFile.running.lineOf[0]) ? routeFile.running.lineOf[0] : routeFile.line;
                	tmpD = TT.fn.getTRA_stationOnWhatLine(routeFile.goRange[1]).concat(TT.fn.getTRA_stationOnWhatLine(routeFile.goRange[0]));
                	for(var i=0; i<displayPri['tra'].length; i++){
                		if(routeFile.running && routeFile.running.lineOf.indexOf(displayPri['tra'][i])>=0 && tmpD.indexOf(displayPri['tra'][i])>=0){
                			tmpC = displayPri['tra'][i];
                			break;
                		}
                	};
                	tmpA = {company: 'tra', line: tmpC, takeRange: routeFile.goRange, searchRouteBy: 'linkRouteV1'}
                	if(routeFile.running) tmpA.running = routeFile.running;
                	if(ridx < routeX.length-1){
						tmpA.transStation = JSON.parse(JSON.stringify(routeFile.transStation));
						tmpA.transStationID = routeFile.transStation.id;
					}
					routeMethd.push(tmpA);
                });
                return routeMethd;
            }
            
            linkMap.map(function(routeA){
                ras = routeA.allStation;
                flagBypassThisRoute = false;
                routeMethd = [];
                overTaipei = ras.indexOf('tra_1008')>-1; overKaohsiung = ras.indexOf('tra_1238')>-1; overTaidong = ras.indexOf('tra_1632')>-1;//跨東西線南迴線時在以上車站轉車
                overBadu = ras.indexOf('tra_1002')>-1; overShuling = ras.indexOf('tra_1012')>-1; overChaozhou = ras.indexOf('tra_1411')>-1; overFangliao = ras.indexOf('tra_1418')>-1;//確認行程是否有跨運行區間
                flagIsCrossWE = ((flagFromInWest && flagToInEast && !flagFromInEast && !flagToInWest) || (!flagFromInWest && !flagToInEast && flagFromInEast && flagToInWest)) && overTaipei;
                wesMainStationAry = (function(stAry){
                	var ary = [];
                	if(overTaipei && flagIsCrossWE) ary.push({id: 'tra_1008', ptr: ras.indexOf('tra_1008')});
                	//if(overKaohsiung) ary.push({id: 'tra_1238', ptr: ras.indexOf('tra_1238')}); //當南迴線啟用後打開這個設定
                	//if(overTaidong) ary.push({id: 'tra_1632', ptr: ras.indexOf('tra_1632')});
                	ary.sort(function(a,b){return (a.ptr > b.ptr) ? 1 : -1;});
                	return ary;
                })(ras);
                //第一步: 將全線搭區間車的搭法切段放到 routeB
                routeB = []; ptr = 0;
                routeA.map(function(routeFile, ridx){
                    flagIsAddRouteFile = false;
                    lineObj = TT.fn.getCommon_lineData(routeFile.line);
                    if(lineObj.subWorkingArea || lineObj.innerNeedTransAt){//本來就知道必需中繼轉乘的路線
                        runningAry = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: routeFile.goRange});
                        if(runningAry.length==0){
                            if(lineObj.subWorkingArea){
                                tmpA = lineObj.subWorkingArea.transAt;
                            }else{
                                tmpA = lineObj.innerNeedTransAt
                            }
                            tmpB = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: [ras[ptr], tmpA]})[0];
                            routeB.push({goRange: [ras[ptr], tmpA], line: routeFile.line, running: tmpB});
                            ptr = ras.indexOf(tmpA);
                            tmpC = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: [tmpA, routeFile.goRange[1]]})[0];
                            routeB.push({goRange: [tmpA, routeFile.goRange[1]], line: routeFile.line, running: tmpC});
                            ptr = ras.indexOf(routeFile.goRange[1]);
                        }else{
                            routeB.push({goRange: [ras[ptr], routeFile.goRange[1]], line: routeFile.line, running: runningAry[0]});
                            ptr = ras.indexOf(routeFile.goRange[1]);
                        }
                    }else if(routeFile.station.indexOf(ras[ptr])>=0){
                        runningAry = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: [ras[ptr], routeFile.goRange[1]]});
                        if(runningAry.length==0){//經探查此線要搭的兩站無直通區間車需要在某站轉乘，抓目標站有運行的各種列車且起迄點與目前站有運行連結的班車
                            var run2Ary = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: routeFile.goRange[1]});
                            var tmpTargetStationAry = []; run2Ary.map(function(c){tmpTargetStationAry = tmpTargetStationAry.concat(c.range);});
                            var run3Ary = false, run3Station = '';
                            for(var i=0; i<tmpTargetStationAry.length; i++){
                                run3Ary = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: [ras[ptr], tmpTargetStationAry[i]]});
                                run3Station = tmpTargetStationAry[i];
                                if(run3Ary.length > 0 && ras.indexOf(run3Station)>=0){
                                    run3Station = tmpTargetStationAry[i];
                                    routeB.push({goRange: [ras[ptr], run3Station], line: routeFile.line, running: run3Ary[0]});
                                    ptr = ras.indexOf(run3Station);
                                    runningAry = TT.fn.getTRA_runningByFromToLine(routeFile.line, routeFile.line, {cate: 'local', stopStation: [ras[ptr], routeFile.goRange[1]]});
                                    break;
                                }
                            }
                        }
                        routeB.push({goRange: [ras[ptr], routeFile.goRange[1]], line: routeFile.line, running: runningAry[0]});
                        ptr = ras.indexOf(routeFile.goRange[1]);
                    }else{
                    	TT.fn.d2Log('Train route error on getTRA_linkRouteV1'); flagBypassThisRoute=true; return false;
                    }
                });
                //第二步: 整理前後相同的路線放到 routeC
                routeC = []; ptr = 0; tmpA = '';
                var lastRouteCFile = false;
                routeB.map(function(routeFile, ridx){
                	thisLineMustStop = routeFile.running.mustStop;
                    routeFile = JSON.parse(JSON.stringify(routeFile)); routeFileFrom = routeFile.goRange[0]; routeFileTo = routeFile.goRange[1];
                	if(tmpA!=routeFile.running.id){
	                	if(routeC.length>0){//確認換運行列車，為前一段添加轉乘站
							lastRouteCFile = routeC[routeC.length-1];
	                		if(regSubLine.test(lastRouteCFile.line) && routeA.allBig.length>0){//先檢查前一段是否為支線，支線列車是否直通大站
								if(lastRouteCFile.running.mustStop.indexOf(routeA.allBig[0])>=0){
	                				lastRouteCFile.goRange[1] = routeA.allBig[0];
	                				routeFileFrom = routeA.allBig[0];
	                			}
	                		}else if(regSubLine.test(routeFile.line) && routeA.allBig.length>0){//再檢查本段列車是否為支線而前一段是否為幹線，支線列車是否可從大站搭
	                			if(routeFile.running.mustStop.indexOf(routeA.allBig.slice(-1)[0])>=0){
	                				lastRouteCFile.goRange[1] = routeA.allBig.slice(-1)[0];
	                				routeFileFrom = routeA.allBig.slice(-1)[0];
	                			}
	                		}
	                		tmpB = TT.fn.getRoute_transStationByStationId(lastRouteCFile.goRange[1],lastRouteCFile.line,routeFile.line);
	                		if(!tmpB){
	                			tmpB = {
	                				id: lastRouteCFile.goRange[1] + '_' + lastRouteCFile.line + '_' + routeFile.line,
	                				name: TT.fn.getTRA_stationDataOfID(lastRouteCFile.goRange[1]).name,
	                				changeLine: [lastRouteCFile.line,routeFile.line],
	                				changeStation: [lastRouteCFile.goRange[1], lastRouteCFile.goRange[1]],
	                				walkMinute: 4
	                			};
	                			TT.data.transStation.push(tmpB);
	                		}
	                		lastRouteCFile.transStation = tmpB;
	                	}
                		routeC.push(routeFile);
                		tmpA = routeFile.running.id;
                	}else{
                		routeC[routeC.length-1].goRange[1] = routeFileTo;
                	}
                });
                if(!flagBypassThisRoute && !flagIsLongway) routeConcatAry.push(createRoute(routeC));
                //第三步: 如果是長途，加入對號快車轉乘機制
                if(flagIsLongway){
                	routeD = []; ptr = 0; tmpA = '';
                	var firstBig = routeA.allBig[0], lastBig = routeA.allBig.slice(-1)[0],
                        firstMajor = routeA.allMajor[0], lastMajor = routeA.allMajor.slice(-1)[0],
                		wesMainPtr = 0,
                		nowIsOnBoneFastTrain = false,
                		nowWES = (flagFromInWest) ? 'w' : (flagFromInEast) ? 'e' : 's',
                		//aryFastMustStop = [],
						flagAfterUseFastTrain = false;
					var firstBigPtr = ras.indexOf(firstBig), lastBigPtr = ras.indexOf(lastBig);
                	routeC.map(function(routeFile, ridx){
                        routeFile = JSON.parse(JSON.stringify(routeFile)); routeFileFrom = routeFile.goRange[0]; routeFileTo = routeFile.goRange[1];
                		if(ras.indexOf(routeFileTo) <= firstBigPtr){
                			routeD.push(routeFile);
                			ptr = ras.indexOf(routeFileTo);
                		}else if(!nowIsOnBoneFastTrain && ras.indexOf(routeFileTo) >= firstBigPtr){//電車在此段內遇到第一個大站，改轉乘站至此
                			if(routeFile.goRange[0] != firstBig){
                				tmpA = JSON.parse(JSON.stringify(routeFile));
                				tmpA.goRange[1] = firstBig;
                				tmpA.transStation = TT.fn.getRoute_transStationByStationId(tmpA.goRange[1],routeFile.line,routeFile.line);
                				routeD.push(tmpA);
                				ptr = firstBigPtr;
                			}
                			nowIsOnBoneFastTrain = true;
                		}
                		if(nowIsOnBoneFastTrain && !flagAfterUseFastTrain){//開始切快速的各分段
                			tmpA = JSON.parse(JSON.stringify(routeFile));
                			if(wesMainStationAry[wesMainPtr] && ras.indexOf(routeFileTo) >= wesMainStationAry[wesMainPtr].ptr){
                				tmpA.goRange = [ras[ptr], wesMainStationAry[wesMainPtr].id];
                                tmpA.running = TT.fn.getTRA_runningByFromToStation(tmpA.goRange[0], tmpA.goRange[1], {cate: 'express'})[0];
                                if(!tmpA.running) tmpA.running = TT.fn.getTRA_runningByFromToStation(tmpA.goRange[0], tmpA.goRange[1], {cate: 'express', compare: 'maybe', irdReg: /Zi/})[0];
                                if(!tmpA.running) tmpA.running = TT.fn.getTRA_runningByFromToStation(tmpA.goRange[0], tmpA.goRange[1], {cate: 'express', compare: 'maybe', irdReg: /Jv/})[0];
                				tmpA.transStation = TT.fn.getRoute_transStationByStationId(lastRouteCFile.goRange[1],lastRouteCFile.line,routeFile.line);
                				tmpA.transStation = TT.fn.getRoute_transStationByStationId(tmpA.goRange[1],routeFile.line,routeFile.line);
                                tmpA.line = TT.fn.getTRA_LineMainDisplayName(tmpA.goRange[0], tmpA.goRange[1]);
                				routeD.push(tmpA);
                				ptr = wesMainStationAry[wesMainPtr].ptr;
                				wesMainPtr++;
                			}
                			tmpA = JSON.parse(JSON.stringify(routeFile));
							if(ras.indexOf(routeFileTo) >= lastBigPtr){
                				tmpA.goRange = [ras[ptr], ras[lastBigPtr]];
                                tmpA.running = TT.fn.getTRA_runningByFromToStation(ras[ptr], ras[lastBigPtr], {cate: 'express'})[0];
                                if(!tmpA.running) tmpA.running = TT.fn.getTRA_runningByFromToStation(ras[ptr], ras[lastBigPtr], {cate: 'express', compare: 'maybe', irdReg: /Zi/})[0];
                                if(!tmpA.running) tmpA.running = TT.fn.getTRA_runningByFromToStation(ras[ptr], ras[lastBigPtr], {cate: 'express', compare: 'maybe', irdReg: /Jv/})[0];
                				tmpA.transStation = TT.fn.getRoute_transStationByStationId(tmpA.goRange[1],routeFile.line,routeFile.line);
                                tmpA.line = TT.fn.getTRA_LineMainDisplayName(tmpA.goRange[0], tmpA.goRange[1]);
                				routeD.push(tmpA);
                				ptr = lastBigPtr;
                				flagAfterUseFastTrain = true;
                			}
                		}
                		if(flagAfterUseFastTrain){//尾段的區間車
                			if(ras.indexOf(routeFileTo) > ptr){
                				tmpA = JSON.parse(JSON.stringify(routeFile));
                				tmpA.goRange = [ras[ptr], routeFileTo];
                                tmpA.line = TT.fn.getTRA_LineMainDisplayName(tmpA.goRange[0], tmpA.goRange[1]);
                				routeD.push(tmpA);
                				ptr = ras.indexOf(routeFileTo);
                			}
                		}
                	});
                	if(!flagBypassThisRoute && routeD.length>0){
                        routeConcatAry.push(createRoute(routeD));
                        if(firstBig!=firstMajor || lastBig!=lastMajor){//尋找順向使用 major station 轉乘
                            var flgHasMajorTransRoute = false, routeMajorD = JSON.parse(JSON.stringify(routeD));
                            tmpA = false; tmpB = false;
                            routeMajorD.forEach(function(routeFile, ridx){
                                if(routeD[ridx+1] && routeFile.running.cate=='local' && routeMajorD[ridx+1].running.cate=='express' && routeFile.running.mustStop.indexOf(firstMajor)>=0){
                                    routeFile.goRange[1] = firstMajor;
                                    routeFile.transStation = TT.fn.getRoute_transStationByStationId(firstMajor);
                                    routeMajorD[ridx+1].goRange[0] = firstMajor;
                                    flgHasMajorTransRoute = true;
                                }else if(routeMajorD[ridx-1] && routeFile.running.cate=='local' && routeMajorD[ridx-1].running.cate=='express' && routeFile.running.mustStop.indexOf(lastMajor)>=0){
                                    routeFile.goRange[0] = lastMajor;
                                    routeMajorD[ridx-1].transStation = TT.fn.getRoute_transStationByStationId(lastMajor);
                                    routeMajorD[ridx-1].goRange[1] = lastMajor;
                                    flgHasMajorTransRoute = true;
                                }else if(ridx==0 && routeFile.running.cate=='express' && firstBig!=firstMajor){//第一站或最後一站是大站但不是 major station
                                    tmpC = TT.fn.getTRA_runningByFromToStation(routeFile.goRange[0],firstMajor, {cate:'local'});
                                    if(tmpC.length>0){
                                        tmpA = JSON.parse(JSON.stringify(routeFile));
                                        tmpA.goRange = [routeFile.goRange[0], firstMajor];
                                        tmpA.running = tmpC[0];
                                        tmpA.transStation = TT.fn.getRoute_transStationByStationId(firstMajor);
                                        routeFile.goRange[0] = firstMajor;
                                        flgHasMajorTransRoute = true;
                                    }
                                }else if(ridx==routeMajorD.length-1 && routeFile.running.cate=='express' && lastBig!=lastMajor){
                                    tmpC = TT.fn.getTRA_runningByFromToStation(lastMajor,routeFile.goRange[1], {cate:'local'});
                                    if(tmpC.length>0){
                                        tmpB = JSON.parse(JSON.stringify(routeFile));
                                        tmpB.goRange = [lastMajor, routeFile.goRange[1]];
                                        tmpB.running = tmpC[0];
                                        routeFile.goRange[1] = lastMajor;
                                        routeFile.transStation = TT.fn.getRoute_transStationByStationId(lastMajor);
                                        flgHasMajorTransRoute = true;
                                    }
                                }
                            });
                            if(tmpA) routeMajorD = [tmpA].concat(routeMajorD);
                            if(tmpB) routeMajorD.push(tmpB);
                            if(flgHasMajorTransRoute) routeConcatAry.push(createRoute(routeMajorD));
                        }
                    }
                	//尋找另一頭可能更靠近的快速轉車站
                	var flgHasNewRouteOfFast = false, route2D = JSON.parse(JSON.stringify(routeD));
                	route2D.map(function(routeFile, ridx){
                		tmpA = route2D[ridx-1];
                		if(route2D[ridx-1] && !regSubLine.test(route2D[ridx-1].line) && routeFile.goRange[0]==firstBig && routeFile.running && routeFile.running.cate=='express'){
                			var aLineAry = TT.fn.getTRA_stationOnWhatLine(route2D[ridx-1].goRange[0]);
                			var aLine = false;
                			aLineAry.map(function(c){if(routeFile.running.lineOf.indexOf(c)>=0){aLine = c;}});
                			if(aLine){
                				var aBig = TT.fn.getTRA_nearBigStation(route2D[ridx-1].goRange[0], aLine, routeFile.running.area);
                				aBig = (aBig[0]==firstBig) ? aBig[1] : aBig[0];
                				var sa = TT.fn.getTRA_throughStationByLine(aBig, firstBig, tmpA.line).allStation;
                				var aCanJoin = !!((sa.indexOf(tmpA.goRange[0]) / sa.length) < 0.35);
                				if(aCanJoin && TT.fn.getTRA_stationDataOfID(aBig).sect == TT.fn.getTRA_stationDataOfID(tmpA.goRange[0]).sect){
                					tmpA.goRange[1] = aBig;
                					routeFile.goRange[0] = aBig;
                					tmpA.transStation = TT.fn.getRoute_transStationByStationId(aBig,tmpA.line,tmpA.line);
                					flgHasNewRouteOfFast = true;
                				}
                			}
                		}
                		tmpB = route2D[ridx+1];
                		if(tmpB && !regSubLine.test(tmpB.line) && routeFile.goRange[1]==lastBig && routeFile.running && routeFile.running.cate=='express'){
                			var aLineAry = TT.fn.getTRA_stationOnWhatLine(tmpB.goRange[1]);
                			var aLine = false;
                			aLineAry.map(function(c){if(routeFile.running.lineOf.indexOf(c)>=0){aLine = c;}});
                			if(aLine){
                				var aBig = TT.fn.getTRA_nearBigStation(tmpB.goRange[1], aLine, routeFile.running.area);
                				aBig = (aBig[0]==lastBig) ? aBig[1] : aBig[0];
                				var sa = TT.fn.getTRA_throughStationByLine(aBig, lastBig, tmpB.line).allStation;
                				var aCanJoin = !!((sa.indexOf(tmpB.goRange[1]) / sa.length) < 0.35);
                				if(aCanJoin && TT.fn.getTRA_stationDataOfID(aBig).sect == TT.fn.getTRA_stationDataOfID(tmpB.goRange[1]).sect){
                					tmpB.goRange[0] = aBig;
                					routeFile.goRange[1] = aBig;
                					routeFile.transStation = TT.fn.getRoute_transStationByStationId(aBig,tmpB.line,tmpB.line);
                					flgHasNewRouteOfFast = true;
                				}
                			}
                		}
                	});
                	if(!flagBypassThisRoute && flgHasNewRouteOfFast && route2D.length>0) routeConcatAry.push(createRoute(route2D));
                	//若搭的幹線快車其實有一定比例停靠自身則減省一段轉乘
                	var flgHasDirectFastRoute = false, route3D = [];
                	var nowCate = '', prevCate = '', flagLocal2ExpressTrans = false, flagExpress2LocalTrans = false;
                	routeD.map(function(routeFile, ridx){
                		tmpA = routeD[ridx-1];
                		tmpB = false;
                		nowCate = '', prevCate = '';
                		if(tmpA){
                			nowCate = routeFile.running.cate;
                			prevCate = tmpA.running.cate;
                			flagLocal2ExpressTrans = !!(nowCate=='express' && prevCate=='local');
							flagExpress2LocalTrans = !!(nowCate=='local' && prevCate=='express');
							if(flagLocal2ExpressTrans) tmpB = TT.fn.getTRA_runningByFromToStation(tmpA.goRange[0], tmpA.goRange[1], {id: routeFile.running.id , compare: 'maybe'})[0];
							if(flagExpress2LocalTrans) tmpB = TT.fn.getTRA_runningByFromToStation(routeFile.goRange[0], routeFile.goRange[1], {id: tmpA.running.id , compare: 'maybe'})[0];
                		}
                		if(flagLocal2ExpressTrans && tmpB){
                			tmpC = JSON.parse(JSON.stringify(routeFile));
                			tmpC.goRange[0] = tmpA.goRange[0];
                			route3D[route3D.length-1] = tmpC;
                			flgHasDirectFastRoute = true;
                		}else if(flagExpress2LocalTrans && tmpB){
                			tmpC = route3D[route3D.length-1];
                			tmpC.goRange[1] = routeFile.goRange[0];
                			if(!routeFile.transStation){
                				delete tmpC.transStation;
                			}else{
                				tmpC.transStation = routeFile.transStation
                			}
                			flgHasDirectFastRoute = true;
                		}else{
                			route3D.push(routeFile);
                		}
                	});
                	if(flgHasDirectFastRoute && route3D.length>0) routeConcatAry.push(createRoute(route3D));
                }
                //檢查若無任何直通車時加入直通選項
                var flgDirectTrainOnArray = false;
                routeConcatAry.forEach(function(c){
                    if(c.length==1 && c[0].takeRange[0]==from && c[0].takeRange[1]==to) flgDirectTrainOnArray = true;
                });
                if(!flgDirectTrainOnArray){
                    routeConcatAry.push(createRoute([{ goRange: [from, to], line: TT.fn.getTRA_LineMainDisplayName(from, to) }]));
                }
//console.info(JSON.parse(JSON.stringify(routeConcatAry)));
            });
            var res = routeT.concat(routeConcatAry),
				resCheckAry = [];
            var resA1 = res.filter(function(rr){//過濾重複路線
            	var ary = [], tx1 = '';
            	ary = rr.map(function(c){ return c.takeRange.join(',') + c.line; });
            	tx1 = ary.join('==');
            	if(resCheckAry.indexOf(tx1)>=0){
            		return false;
            	}else{
            		resCheckAry.push(tx1);
            		return true;
            	}
            });
            return resA1;
        },
        getTRA_recommendSectTrans: function(a, b){//Return true for trans, false for direct
            var fromObj = (typeof(a)=='string') ? TT.fn.getTRA_stationDataOfID(a) : a,
                toObj = (typeof(b)=='string') ? TT.fn.getTRA_stationDataOfID(b) : b,
                tryOnTaipeiArea = /^taipei$|^keelung$|^northeast$/,
                rt = false,
                sect_ary = TT.data.tra.sect_ary;
            var flagNotSectTaipeiArea = !(tryOnTaipeiArea.test(fromObj.sect) && tryOnTaipeiArea.test(toObj.sect));
            if(Math.abs((sect_ary.indexOf(fromObj.sect)%sect_ary.length) - (sect_ary.indexOf(toObj.sect)%sect_ary.length)) > 1){
                if(flagNotSectTaipeiArea){
                    rt = true;
                }
            }
            return rt;
        },
        getTRA_runningByFromToStation: function(a, b, filter){
            filter = filter || false;
            var rt = [],
                ary = TT.data.tra.running_ary,
                aLine = TT.fn.getTRA_stationOnWhatLine(a),
                bLine = TT.fn.getTRA_stationOnWhatLine(b),
                tmpR = [], everAddAry = [],
                sameLine = TT.fn.getTRA_stationOnSameLine(a,b);
            aLine.map(function(aa){
                bLine.map(function(bb){
                    tmpR = tmpR.concat(TT.fn.getTRA_runningByFromToLine(aa,bb));
                });
            });
            tmpR = tmpR.filter(function(el, idx, arr){
                if(everAddAry.indexOf(el.id)>-1) return false;
                everAddAry.push(el.id);
                return true;
            });
            tmpR = tmpR.filter(function(el, idx, arr){
            	if(filter.compare && /^maybe$|^less$/.test(filter.compare)){
            		if(filter.compare=='maybe') return !!(el.mustStop.concat(el.maybeStop).indexOf(a)>-1 && el.mustStop.concat(el.maybeStop).indexOf(b)>-1);
            		if(filter.compare=='less') return !!(el.mustStop.concat(el.maybeStop).concat(el.lessStop).indexOf(a)>-1 && el.mustStop.concat(el.maybeStop).concat(el.lessStop).indexOf(b)>-1);
            	}else{
                	return !!(el.mustStop.indexOf(a)>-1 && el.mustStop.indexOf(b)>-1);
                }
            });
            if(filter){
                var flg = true;
                tmpR = tmpR.filter(function(el, idx, arr){
                    flg = true;
                    for(var k in filter){
                        if(el[k]){
                        switch(k){
                            case 'mustStop':
                            case 'CarClass':
                            case 'range':
                                if(typeof(filter[k])=='string') filter[k] = [filter[k]];
                                filter[k].map(function(c){
                                    if(el[k].indexOf(c)==-1) flg = false;
                                });
                            break;
                            default:
                                flg = flg && !!(el[k] == filter[k]);
                            break;
                        }
                        }else{
                        	if(k=='idReg') flg = flg && filter[k].test(el.id);
                        }
                    }
                    return flg;
                })
            }
            return tmpR;
        },
        getTRA_runningByFromToLine: function(aLine, bLine, filter){
            filter = filter || false;
            var ary = false, rt = [];
            ary = TT.data.tra.running_ary;
            for(var i=0; i<ary.length; i++){
                if(ary[i].lineOf.indexOf(aLine)>=0 && ary[i].lineOf.indexOf(bLine)>=0){
                    if(filter){
                        if(filter.cate && ary[i].cate != filter.cate) continue;
                        if(filter.area && ary[i].area != filter.area) continue;
                    }
                    if(ary[i].stopAll && !ary[i].mustStop) ary[i].mustStop = TT.fn.getTRA_throughStationByLine(ary[i].range[0], ary[i].range[1], ary[i].lineOf).allStation;
                    if(filter && filter.stopStation){
                        if(typeof(filter.stopStation)=='string'){
                            if(ary[i].mustStop.indexOf(filter.stopStation)==-1) continue;
                        }else{
                            if((ary[i].mustStop.indexOf(filter.stopStation[0])==-1) || (ary[i].mustStop.indexOf(filter.stopStation[1])==-1)) continue;
                        }
                    }
                    rt.push(ary[i]);
                }
            }
            return rt;
        },
        getTRA_runningByID: function(id){
            var ary = false;
            ary = TT.data.tra.running_ary;
            for(var i=0; i<ary.length; i++){
                if(ary[i].id==id) return ary[i];
            }
        },
        getTRA_stationDataOfID: function(id, lineID){
            var ary=TT.data.tra.station_ary;
            for(var i=0; i<ary.length; i++){
                if(ary[i].id==id){
                    if(lineID){
                        return $.extend({byLine: lineID}, ary[i]);
                    }
                    return ary[i];
                }
            }
            return false;
        },
        getTRA_stationIsOnThisLine: function(stationID, Line){
        	if(typeof(Line)=='string') Line = TT.fn.getCommon_lineData(Line);
            for(var i=0; i<Line.station.length; i++){
                if(stationID==Line.station[i]) return i;
            }
            return false;
        },
        getTRA_stationIsOnThisTime: function(stationID, timeInfo){
            stationID = TT.fn.getTRA_stationID(stationID);
            for(var i=0; i<timeInfo.length; i++){
                if(stationID==timeInfo[i].Station) return i;
            }
            return false;
        },
        getTRA_stationID: function(sid){
            if(sid.indexOf('tra_')==0){
                sid = sid.replace('tra_','');
            }
            return sid;
        },
        getTRA_stationIsOnTimeInfo: function(stationID, timeInfo){
            stationID = TT.fn.getTRA_stationID(stationID);
            for(var i=0; i<timeInfo.length; i++){
                if(timeInfo[i].Station==stationID){
                    return timeInfo[i];
                    break;
                }
            }
            return false;
        },
        getTRA_stationOnSameLine: function(a,b){
            var rt = new Array();
            var aLine = TT.fn.getTRA_stationOnWhatLine(a);
            var bLine = TT.fn.getTRA_stationOnWhatLine(b);
            for(var i=0; i<aLine.length; i++){
                for(var j=0; j<bLine.length; j++){
                    if(bLine[j]==aLine[i]){
                        rt.push(bLine[j]);
                        break;
                    }
                }
            }
            
            if(rt.length==0) rt = false;
            return rt;
        },
        getTRA_stationOnWhatLine: function(st){
            //return ['tra_xibu'];
            var rt = new Array(),
                line = TT.data.tra.line;
            for(var i=0; i<line.length; i++){
                for(var j=0; j<line[i].station.length; j++){
                    if(line[i].station[j]==st){
                        rt.push(line[i].id);
                        break;
                    }
                }
            }
            return rt;
        },
        getTRA_stationTime: function(stationID, dir, w){
            if(w==null) w = TT.defined.defaultTRAWeekday;
            if(dir==null) dir = '1';
            if(!TT.fn.checkTRA_dayTimeIsLoaded(w)){
                return false;
            }
            
            stationID = TT.fn.getTRA_stationID(stationID);
            var dayTimeTable = TT.fn.getTRA_dayTimeTable(w);
            var stationDayTimeAry = new Array();
            for(var i=0; i<dayTimeTable.length; i++){
                var timeInfoOfStation = TT.fn.getTRA_stationIsOnTimeInfo(stationID, dayTimeTable[i].TimeInfo);
                if(timeInfoOfStation && dayTimeTable[i].LineDir==dir){
                    timeInfoOfStation.CarInfo = dayTimeTable[i];
                    stationDayTimeAry.push(timeInfoOfStation);
                }
            }
            return stationDayTimeAry;
        },
        getTRA_sortByTimeInfoOrder: function(a,b){
            var intA = parseInt(a.Order,10);
            var intB = parseInt(b.Order,10);
            if(intA==intB) return 0;
            if(intA < intB) return -1;
            if(intA > intB) return 1;
        },
        getTRA_sortByTTSortTime: function(a,b){
            var intA = parseInt(a.tt_sortTime,10);
            var intB = parseInt(b.tt_sortTime,10);
            if(intA==intB) return 0;
            if(intA < intB) return -1;
            if(intA > intB) return 1;
        },
        getTRA_throughStationByLine: function(from, to, lineAry){
            if(typeof(lineAry)=='string') lineAry = lineAry.split(',');
            var rt = [],
                nextLine = '', flagStIsOver = false,
                tmpStart = from, tmpEnd = '',
                allStation = [], allBig = [],
                bigList = (function(){ return TT.data.tra.station_ary.filter(function(el,idx){ return !!(el.big); }) })(),
                tmpBigIndex = 0,
                line = false,
                tmpA = false;
            var bigStationIDList = (function(){ var rt = []; bigList.map(function(c){ rt.push(c.id); }); return rt; })();
            lineAry.map(function(c, idx){
                line = TT.fn.getCommon_lineData(c);
                nextLine = lineAry[idx+1];
                if(nextLine){//還有下一條，先抓到 link 下一條的轉車站
                    tmpEnd = line.link[nextLine].station;
                }else{
                    tmpEnd = to;
                }
                tmpA = TT.fn.getComon_allStationOfLineByFromTo(tmpStart, tmpEnd, c);
                allStation = allStation.concat(tmpA.station);
                rt.push(tmpA);
                tmpStart = tmpEnd;//抓完後將 tmpStart 指到本次結束的車站
            });
            allStation = allStation.filter(function(el, idx, arr){
        			flagStIsOver = !(arr[idx]==arr[idx-1]);
        			if(flagStIsOver){//檢查是否為大站
        				tmpBigIndex = bigStationIDList.indexOf(el);
        				if(tmpBigIndex>=0){
        					allBig.push(bigList[tmpBigIndex].id);
        				}
        			}
        			return flagStIsOver;
        	});
            rt.allStation = allStation;
            rt.allBig = allBig;
            return rt;
        },
        getTRA_JSON_by_TRA_JSON: function(json){
            var rt = json.TrainInfos;
            var timeInfo = false;
            for(var i=0; i<rt.length; i++){
                rt[i].TimeInfo = rt[i].TimeInfos;
                rt[i].TimeInfo.sort(TT.fn.getTRA_sortByTimeInfoOrder);
            }
            return rt;
        },
        getTRA_JSON: function(url, successFn, errorFn){
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(xml) {
                    if(typeof(successFn)=='function'){
                        successFn(xml);
                    }
                },
                error: function(){
                    if(typeof(errorFn)=='function'){
                        errorFn();
                    }
                }
            });
        },
        getTRA_weekJSON: function(w, cbFn){
            if(!w) w = TT.defined.defaultTRAWeekday;
            var url = 'w' + w + '.json';
            TT.ui.mask();
            TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + ' JSON 時刻表中...');
            
            function successFn(json){
                    TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + ' JSON 時刻表完成。');
                    TT.ui.unmask();
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn(w, json);
                    }
                    TT.ui.updateCenter('home');
            }
            
            function errorFn(){
                    TT.msg.show('讀取台鐵' + TT.ui.transWeekToString(w) + ' JSON 時刻表失敗！');
                    TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + ' JSON 時刻表失敗！');
                    TT.ui.unmask();
                    TT.ui.updateCenter('home');
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn('error');
                    }
            }
            setTimeout(function(){
                TT.fn.getTRA_JSON(url, successFn, errorFn);
            },100);
        },
        getTRA_JSON_by_TRA_XML: function(xml){
            var aryTRA_Cars = xml.getElementsByTagName('TrainInfo');
            var rt = new Array();
            
            for(var i=0; i<aryTRA_Cars.length; i++){
                var xt = aryTRA_Cars[i];
                var jo = TT.fn.getXML_Attribute2Obj(xt);
                jo.TimeInfo = new Array();
                var timeInfo = xt.getElementsByTagName('TimeInfo');
                for(var j=0; j<timeInfo.length; j++){
                    var timext = timeInfo[j];
                    var timejo = TT.fn.getXML_Attribute2Obj(timext);
                    jo.TimeInfo.push(timejo);
                    jo.TimeInfo.sort(TT.fn.getTRA_sortByTimeInfoOrder);
                }
                rt.push(jo);
            }
            return rt;
        },
        getTRA_XML: function(url, successFn, errorFn){
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'xml',
                success: function(xml) {
                    if(typeof(successFn)=='function'){
                        successFn(xml);
                    }
                },
                error: function(){
                    if(typeof(errorFn)=='function'){
                        errorFn();
                    }
                }
            });
        },
        getTRA_weekXML: function(w, cbFn){
            if(!w) w = TT.defined.defaultTRAWeekday;
            var url = 'w' + w + '.xml';
            TT.ui.mask();
            TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + '時刻表中...');
            
            function successFn(xml){
                    TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + '時刻表完成。');
                    TT.ui.unmask();
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn(w, xml);
                    }
                    TT.ui.updateCenter('home');
            }
            
            function errorFn(){
                    TT.msg.show('讀取台鐵' + TT.ui.transWeekToString(w) + '時刻表失敗！');
                    TT.ui.printStatus('讀取台鐵' + TT.ui.transWeekToString(w) + '時刻表失敗！');
                    TT.ui.unmask();
                    TT.ui.updateCenter('home');
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn('error');
                    }
            }
            setTimeout(function(){
                TT.fn.getTRA_XML(url, successFn, errorFn);
            },100);
        },
        getTRA_TimeTable2Data: function(weekString, cbFn){
            if(weekString==null) weekString = '0123456';//0 for sunday
            if(!TT.data.tra.timeTable) TT.data.tra.timeTable = new Array();
            var countW = -1;
            function writeFn(w, xml){
                if(TT.fn.checkIsError(w)){
                    return false;
                }
                //var dayJo = TT.fn.getTRA_JSON_by_TRA_XML(xml);
                var dayJo = TT.fn.getTRA_JSON_by_TRA_JSON(xml);
                TT.data.tra.timeTable[parseInt(w,10)] = dayJo;
                nextDay();
            }
            
            function nextDay(){
                countW++;
                if(countW >= 7){
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn();
                    }
                    return true;
                }
                var w = countW.toString();
                if(TT.data.tra.timeTable[countW] || weekString.indexOf(w)==-1){
                    nextDay();
                    return false;
                }
                //TT.fn.getTRA_weekXML(w, writeFn);
                TT.fn.getTRA_weekJSON(w, writeFn);
            }
            nextDay();
        },
        getTRA_carClassName: function(val, cfg){
            cfg = cfg || {};
            var data = TT.data.tra.defined["CarClass"], rt = '';
            for(var i=0; i<data.length; i++){
                if(data[i].id==val){
                    if(cfg.eng){
                        rt = data[i].ename;
                    }else{
                        rt = data[i].name;
                    }
                    if(cfg.color){
                        if(data[i].color){
                            rt = '<span style="color:' + data[i].color + ';">' + rt + '</span>';
                        }
                    }
                    return rt;
                }
            }
        },
        getTRA_fromToTime: function(ttb,a,b){
                a = a || ttb.fromStation;
                b = b || ttb.toStation;
                a = TT.fn.getTRA_stationID(a);
                b = TT.fn.getTRA_stationID(b);
                var timeInfo = ttb.TimeInfo;
                var rt = new Array();
                var arrt = false, dept = false;
                for(var i=0; i<timeInfo.length; i++){
                    arrt = timeInfo[i].ARRTime || timeInfo[i].ArrTime;
                    dept = timeInfo[i].DEPTime || timeInfo[i].DepTime;
                    if(timeInfo[i].Station==a) rt[0] = dept;
                    if(timeInfo[i].Station==b) rt[1] = arrt;
                    if(rt[0] && rt[1]) break;
                }
                return rt;
        },
        giveTRA_tool_getFromToTime: function(a,b,ttb){
                if(!a) a = ttb.fromStation;
                if(!b) b = ttb.toStation;
                a = TT.fn.getTRA_stationID(a);
                b = TT.fn.getTRA_stationID(b);
                var timeInfo = ttb.TimeInfo;
                var rt = new Array();
                var arrt = false, dept = false;
                for(var i=0; i<timeInfo.length; i++){
                    arrt = timeInfo[i].ARRTime || timeInfo[i].ArrTime;
                    dept = timeInfo[i].DEPTime || timeInfo[i].DepTime;
                    if(timeInfo[i].Station==a) rt[0] = dept;
                    if(timeInfo[i].Station==b) rt[1] = arrt;
                }
                return rt;
        },                        
        giveTRA_timeTableTool: function(ttb){
            ttb.getFromToTime = function(a,b){
                return TT.fn.giveTRA_tool_getFromToTime(a,b,ttb);
            }
            return ttb;
        },
        //TRTC Function
        getTRTC_lineNum2Id: function(num){
            if(typeof(num)=='string'){
                num = parseInt(num.replace('trtc_',''),10);
            }
            return 'trtc_' + num;
        },
        getTRTC_stationDataOfID: function(id, lineID){
            var ary=TT.data.trtc.station_ary;
            for(var i=0; i<ary.length; i++){
                if(ary[i].id==id){
                	var rt = $.extend({sect: 'taipei'}, ary[i]);
                    if(lineID){
                        //return $.extend({byLine: lineID}, rt);
                        rt.byLine = lineID;
                    }
                    return rt;
                }
            }
            return false;
        },
        getTRTC_stationOnWhatLine: function(st){
            var rt = new Array(),
                line = TT.data.trtc.line;
            for(var i=0; i<line.length; i++){
                for(var j=0; j<line[i].station.length; j++){
                    if(line[i].station[j]==st){
                        rt.push(line[i].id);
                        break;
                    }
                }
            }
            return rt;
        },
        getTRTC_stationOnSameLine: function(a,b){
            var rt = new Array();
            var aLine = TT.fn.getTRTC_stationOnWhatLine(a);
            var bLine = TT.fn.getTRTC_stationOnWhatLine(b);
            for(var i=0; i<aLine.length; i++){
                for(var j=0; j<bLine.length; j++){
                    if(bLine[j]==aLine[i]){
                        rt.push(bLine[j]);
                        break;
                    }
                }
            }
            
            if(rt.length==0) rt = false;
            return rt;
        },
        getTRTC_stationTime: function(stationID, line, dir, w){
        	var ptxTime = TT.fn.getTRTC_ptx_stationTime(stationID, line, dir, w);
            if(ptxTime!=false){
                return ptxTime;
            }
            //若上面抓的到 ptx time table 則優先回應
            var rnwTime = TT.fn.getTRTC_rnw_stationTime(stationID, line, dir, w);
            if(rnwTime!=false){
                return rnwTime;
            }
            if(rnwTime==false && stationID == 'trtc_071'){//No Tamsui Timetable
                var hslTime = TT.fn.getTRTC_rnw_stationTime('trtc_070', line, dir, w);
                return offsetTimeFn(hslTime, -3);
            }
            if(rnwTime==false && stationID == 'trtc_048'){//No Nanshijiao Timetable
                var hslTime = TT.fn.getTRTC_rnw_stationTime('trtc_047', line, dir, w);
                return offsetTimeFn(hslTime, -2);
            }
            if(rnwTime==false && stationID == 'trtc_076'){//No Dingpu Timetable
                var hslTime = TT.fn.getTRTC_rnw_stationTime('trtc_077', line, dir, w);
                return offsetTimeFn(hslTime, -3);
            }
            if(!w) w = TT.defined.defaultTRAWeekday;
            w = parseInt(w);
            if(!line){
                line = TT.fn.getTRTC_stationOnWhatLine(stationID)[0];
            }
            line = TT.fn.getTRTC_lineNum2Id(line);
            if(!dir){
                dir=0;
            }
            dir = parseInt(dir);
            
            var ww = '';
            switch(w){
                case 0:
                    ww = 'sunday';
                break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    ww = 'weekday';
                break;
                case 6:
                    ww = 'saturday';
                break;
            }
            
            
            function offsetTimeFn(timeTB, offsetMin){
                var tmpTime, spliceNum=0, rt=new Array();
                for(var i=0; i<timeTB.length; i++){
                    tmpTime = TT.fn.transTime2Sec(timeTB[i]);
                    tmpTime = tmpTime + (offsetMin*60);
                    if(tmpTime < 0) tmpTime+=86400;
                    if(tmpTime > (3600*4) && tmpTime < (3600*6)) spliceNum++;
                    timeTB[i] = TT.fn.transSec2Time(tmpTime);
                }
                if(spliceNum>0) timeTB.splice(0,spliceNum);
                return timeTB;
            }
            
            function formatTimeFn(ary){
                var rt = new Array();
                var tmpA = '', tmpH = '', tmpM = '', tmpS = '00';
                for(var i=0; i<ary.length; i++){
                    tmpH = TT.fn.transNum2StrA(i%24);
                    for(var j=0; j<ary[i].length; j++){
                        tmpM = TT.fn.transNum2StrA(ary[i][j]);
                        tmpA = tmpH + ':' + tmpM + ':' + tmpS;
                        rt.push(tmpA);
                    }
                }
                return rt;
            }
            
            var lineTime = TT.data.trtc.station_time[line];
            var stOffset = 0;
            if(lineTime){
                var stTime = lineTime[stationID];
            }else{
                return false;
            }
            
            if(!stTime){
                if(line=='trtc_5'){
                    stTime = lineTime['trtc_097'];
                    stOffset = TT.data.trtc.offset_time['trtc_5']['trtc_097'][stationID];
                    if(dir.toString() != TT.data.trtc.offset_time['trtc_5']['trtc_097']['LineDir']) stOffset = 0-stOffset;
                }
                if(line=='trtc_2'){
                    stTime = lineTime['trtc_071'];
                    stOffset = TT.data.trtc.offset_time['trtc_2']['trtc_071'][stationID];
                    if(dir.toString() != TT.data.trtc.offset_time['trtc_2']['trtc_071']['LineDir']) stOffset = 0-stOffset;
                }
                if(line=='trtc_3'){
                    stTime = lineTime['trtc_111'];
                    stOffset = TT.data.trtc.offset_time['trtc_3']['trtc_111'][stationID];
                    if(dir.toString() != TT.data.trtc.offset_time['trtc_3']['trtc_111']['LineDir']) stOffset = 0-stOffset;
                }
                if(line=='trtc_4'){
                    stTime = lineTime['trtc_048'];
                    stOffset = TT.data.trtc.offset_time['trtc_4']['trtc_048'][stationID];
                    if(dir.toString() != TT.data.trtc.offset_time['trtc_4']['trtc_048']['LineDir']) stOffset = 0-stOffset;
                }
                if(stOffset != 0){
                }else{
                    return false;
                }
            }
            
            if(stTime){
                var wTime = stTime[ww];
            }else{
                return false;
            }
            
            if(wTime){
                var formatTimeTable = formatTimeFn(wTime[dir]);
                if(stOffset != 0){
                    return offsetTimeFn(formatTimeTable, stOffset);
                }else{
                    return formatTimeTable;
                }
            }else{
                return false;
            }
            
        },
        getTRTC_rnw_stationTime: function(stationID, line, dir, w){
            if(!w) w = TT.defined.defaultTRAWeekday;
            var chk = TT.fn.checkTRTC_rnwTimeTableIsLoaded();
            if(!chk) return false;
            
            var tmpObj = TT.data.trtc.rnwTimeTable, rt=false, st;
            if(TT.data.trtc.rnwTimeTable && TT.data.trtc.rnwTimeTable[line] && TT.data.trtc.rnwTimeTable[line][stationID]){
                st = TT.data.trtc.rnwTimeTable[line][stationID];
                for(var i=0; i<st.length; i++){
                    if(st[i].dir==dir && st[i].week.indexOf(w)>=0){
                        rt = st[i].time;
                        break;
                    }
                }
            }
            return rt;
        },
        getTRTC_ptx_stationTime: function(stationID, line, dir, w){
        	if(!TT.defined.usePTX) return false;
        	return TT.ptx.trtc.getFormatStationTime(stationID, line, dir, w);
        },
        getTRTC_timeTable2Data: function(cbFn){
            function doBack(json){
                if(typeof(json)=='string' && json=='error'){
                    return false;
                }
                //Process to TT.data.trtc.rnwTimeTable.line.station{week, time}
                var tb = {}, tmpObj;
                for(var i=0; i<json.length; i++){
                    tmpObj = json[i];
                    if(!tb[tmpObj.line]) tb[tmpObj.line] = {}
                    if(!tb[tmpObj.line][tmpObj.id]) tb[tmpObj.line][tmpObj.id] = new Array();
                    tb[tmpObj.line][tmpObj.id].push({
                        week: tmpObj.week,
                        dir: tmpObj.dir,
                        time: tmpObj.time
                    });
                }
                TT.data.trtc.rnwTimeTable = tb;
                if(TT.fn.checkIsFunction(cbFn)){
                    cbFn();
                }
            }
            
            TT.fn.getTRTC_rnw_timeTableJSON('ronnywang_trtc.json', doBack);
        },
        getTRTC_rnw_timeTableJSON: function(url, cbFn){
            if(!url) url = 'ronnywang_trtc.json';
            TT.ui.mask();
            TT.ui.printStatus('讀取台北捷運時刻表中...');
            
            function formatRNW_JSON(json){//Format some data
                var tj, timeData, weekData, tmpName, dirData, lineData;
                for(var i=0; i<json.length; i++){
                    tj = json[i];
                    if(tj["時間"]){
                        timeData = tj["時間"].split(' ');
                        json[i].time = timeData;
                    }
                    if(tj["中文班次別"]){
                        switch(tj["中文班次別"]){
                            case '平常日(週一至週四)':
                                weekData = '1234';
                            break;
                            case '平常日(週一至週五)':
                                weekData = '12345';
                            break;
                            case '平常日(週五)':
                                weekData = '5';
                            break;
                            case '週六':
                                weekData = '6';
                            break;
                            case '週日':
                                weekData = '0';
                            break;
                        }
                        json[i].week = weekData;
                    }
                    if(tj["方向名稱"]){
                        tmpName = tj["方向名稱"];
                        if(/亞東醫院|頂埔/.test(tmpName)){
                            lineData = 'trtc_5';
                            dirData = '1';
                        }else if(/南港展覽館/.test(tmpName)){
                            lineData = 'trtc_5';
                            dirData = '0';
                        }else if(/大安|象山/.test(tmpName)){
                            lineData = 'trtc_2';
                            dirData = '1';
                        }else if(/北投|淡水/.test(tmpName)){
                            lineData = 'trtc_2';
                            dirData = '0';
                        }else if(/新店|台電大樓/.test(tmpName)){
                            lineData = 'trtc_3';
                            dirData = '1';
                        }else if(/松山/.test(tmpName)){
                            lineData = 'trtc_3';
                            dirData = '0';
                        }else if(/蘆洲|迴龍/.test(tmpName)){
                            lineData = 'trtc_4';
                            dirData = '1';
                        }else if(/南勢角/.test(tmpName)){
                            lineData = 'trtc_4';
                            dirData = '0';
                        }
                        json[i].line = lineData;
                        json[i].dir = dirData;
                    }
                    if(tj["車站代碼"]){
                        json[i].id = 'trtc_' + tj["車站代碼"];
                    }
                    if(tj["車站名稱"]){
                        json[i].name = tj["車站名稱"];
                    }
                    //json[i] = tj;
                }
                return json;
            }
            
            function successFn(json){
                    TT.ui.printStatus('讀取台北捷運時刻表完成。');
                    TT.ui.unmask();
                    json = formatRNW_JSON(json);
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn(json);
                    }
                    TT.ui.updateCenter('home');
            }
            
            function errorFn(){
                    TT.ui.printStatus('讀取台北捷運時刻表失敗！');
                    TT.ui.unmask();
                    TT.ui.updateCenter('home');
                    if(TT.fn.checkIsFunction(cbFn)){
                        cbFn('error');
                    }
            }
            
            TT.fn.getTRTC_timeTableJSON(url, successFn, errorFn);
        },
        getTRTC_timeTableJSON: function(url, successFn, errorFn){
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(json) {
                    if(typeof(successFn)=='function'){
                        successFn(json);
                    }
                },
                error: function(){
                    if(typeof(errorFn)=='function'){
                        errorFn();
                    }
                }
            });
        },
        getTRTC_lineCheckOrDefault: function(a, b, line){
            var ary1 = TT.fn.getTRTC_stationOnSameLine(a,b);
            if(ary1){
                if(line){
                    var ckFlag = false;
                    for(var i=0; i<ary1.length; i++){
                        if(line==ary1[i]) ckFlag = true; 
                    }
                    if(!ckFlag) return false;
                }else{
                    line = ary1[0];
                }
            }else{
                //fetaure add cross line function
                return false;
            }
            return line;
        },
        getTRTC_needTimeBySameLineFromTo: function(a, b, line){
            line = TT.fn.getTRTC_lineCheckOrDefault(a, b, line);
            if(line){
                var baseStation = '';
                if(line=='trtc_2') baseStation = 'trtc_071';
                if(line=='trtc_3') baseStation = 'trtc_111';
                if(line=='trtc_4') baseStation = 'trtc_048';
                if(line=='trtc_5') baseStation = 'trtc_097';
                var lineA = TT.data.trtc.offset_time[line][baseStation];
                var aOffset = lineA[a];
                var bOffset = lineA[b];
                return Math.abs(aOffset-bOffset);
            }else{
                return false;
            }
        },
        getTRTC_overStringStationAry: function(str, line, dir){
            var lineObj = TT.fn.getTRTC_lineData(line);
            //TT.data.trtc.line.map(function(obj){
                //if(obj.id == line) lineObj = obj;
            //});
            if(!lineObj) return false;
            if(!dir) dir = lineObj.dir;
            
            var stAry = lineObj.station;
            var rt = new Array(), st, ary, flag=0;
            if(str.indexOf('~')>=0){
                ary = str.split('~');
                if(dir != lineObj.dir) ary = ary.reverse();
                if(ary[0]==null || ary[0]=='') ary[0] = stAry[0];
                if(ary[1]==null || ary[1]=='') ary[1] = stAry[stAry.length-1];
                for(var i=0; i<stAry.length; i++){
                    st = stAry[i];
                    if(st==ary[0]) flag=1;
                    if(flag==1){
                        rt.push(st);
                    }
                    if(st==ary[1]) flag=2;
                    if(flag==2){
                        break;
                    }
                }
            }
            return rt;
        },
        getTRTC_stationOnDiffSplitOutArea: function(a, b, line){
            var lineObj = TT.fn.getTRTC_lineData(line);
            if(!lineObj) return false;
            
            var brt = false, art = false, bStationAry, aStationAry, rt = false, tmpAry;
            if(lineObj.outArea && lineObj.outArea.length > 0){
                lineObj.outArea.map(function(obj){
                    tmpAry = TT.fn.getTRTC_overStringStationAry(obj.station, line);
                    for(var i=0; i<tmpAry.length; i++){
                        if(b==tmpAry[i]){
                            brt = obj;
                            bStationAry = tmpAry;
                        }
                        if(a==tmpAry[i]){
                            art = obj;
                            aStationAry = tmpAry;
                        }
                    }
                });
                if(art.station!=brt.station && art.transAt==brt.transAt){
                    rt = {
                        line: line,
                        splitStation: art.transAt,
                        transStationID: art.transStationID,
                        takeRange: [a,b],
                        stationAry:[aStationAry,bStationAry]
                    };
                }
            }
            return rt;
        },
        getTRTC_stationOnOutArea: function(a, b, line){
            var lineObj = TT.fn.getTRTC_lineData(line);
            if(!lineObj) return false;
            
            var rt = false, art = false, tmpAry;
            if(lineObj.outArea && lineObj.outArea.length > 0){
                lineObj.outArea.map(function(obj){
                    tmpAry = TT.fn.getTRTC_overStringStationAry(obj.station, line);
                    for(var i=0; i<tmpAry.length; i++){
                        if(b==tmpAry[i] && a!=obj.transAt){
                            rt = obj;
                        }
                        if(b==tmpAry[i] && a==obj.transAt && obj.isSubLine){
                            rt = obj;
                        }
                        if(a==tmpAry[i] && !(obj.isSubLine && a==obj.transAt)){
                            art = obj;
                        }
                    }
                });
                if(art) rt = false;//Both a and b on out area
            }
            return rt;
        },
        getTRTC_allTimeByFromTo: function(a, b, line, w){
            if(!w) w = TT.defined.defaultTRAWeekday;
            var dir = TT.fn.getTRTC_dirByFromTo(a, b);
            line = TT.fn.getTRTC_lineCheckOrDefault(a, b, line);
            if(dir===false){
                //fetaure add cross line function
                return false;
            }
            var aTime = TT.fn.getTRTC_stationTime(a, line, dir, w);
            var offsetTime = TT.fn.getTRTC_needTimeBySameLineFromTo(a, b, line);
            var outArea=TT.fn.getTRTC_stationOnOutArea(a, b, line);
            //var outAreaOffsetSec = (outArea) ? outArea.waitingNextMinute*60 : 0;
            var aryFromToTime = new Array();
            var tmpBTime, tmpATime, tmpANTime;
            for(var i=0; i<aTime.length; i++){
                /*if(outAreaOffsetSec > 0){
                    if(aTime[i+1]){
                        tmpATime = TT.fn.transTime2Sec(aTime[i], true);
                        tmpANTime = TT.fn.transTime2Sec(aTime[i+1], true);
                        outAreaOffsetSec = tmpANTime - tmpATime;
                    }
                }*/
                tmpBTime = (TT.fn.transTime2Sec(aTime[i]) + (offsetTime*60))%86400;// + outAreaOffsetSec;
                tmpBTime = TT.fn.transSec2Time(tmpBTime);
                aryFromToTime.push([aTime[i], tmpBTime]);
            } 
            return aryFromToTime;
        },
        getTRTC_timeRangeByFromTo: function(a, b, startTime, endTime, flagAD, line, w){
            if(flagAD===undefined) flagAD = true;
            if(!w) w = TT.defined.defaultTRAWeekday;
            
            if(!startTime) startTime = 0;
            if(!endTime) endTime = 60*60*24-1;
            var timeTable = TT.fn.getTRTC_allTimeByFromTo(a, b, line, w);
            if(typeof(startTime)!='number') startTime = TT.fn.transTime2Sec(startTime);
            if(typeof(endTime)!='number') endTime = TT.fn.transTime2Sec(endTime);
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime),
                offset1Day = 86400;
            
            function cpTime(ttb){
                var insEnd = endTime;
                var time = (flagAD===true) ? TT.fn.transTime2Sec(ttb[0]) : TT.fn.transTime2Sec(ttb[1]);
                
                if(insEnd < startTime && insEnd < crossDaySec){
                    insEnd = insEnd + offset1Day;
                    if(time < crossDaySec){
                        time = time + offset1Day;
                    }
                }
                
                if(insEnd > startTime && insEnd > crossDaySec && time < crossDaySec) return false;
                
                if(time && time >= startTime && time <= insEnd){
                    return ttb;
                }else{
                    return false;
                }
            }
            
            var aryTime = new Array(),
                cpT;
            for(var i=0; i<timeTable.length; i++){
                cpT = cpTime(timeTable[i]);
                if(cpT !== false){
                    aryTime.push(cpT);
                }
            }
            aryTime = aryTime.sort(TT.fn.getTRTC_sortByABTime);
            return aryTime;
        },
        getTRTC_sortByABTime: function(a,b){
            var intA = TT.fn.transTime2Sec(a[0]);
            var intB = TT.fn.transTime2Sec(b[0]);
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime);
            if(intA < crossDaySec) intA += 86400;
            if(intB < crossDaySec) intB += 86400;
            
            if(intA==intB) return 0;
            if(intA < intB) return -1;
            if(intA > intB) return 1;
        },
        getTRTC_dirByFromTo: function(a, b, line){
            line = TT.fn.getTRTC_lineCheckOrDefault(a, b, line);
            
            if(line){
                var lineData = TT.fn.getTRTC_lineData(line);
                for(var i=0; i<lineData.station.length; i++){
                    if(lineData.station[i]==a) return lineData.dir;
                    if(lineData.station[i]==b) return TT.fn.reverseDir(lineData.dir);
                }
                return false;
            }else{
                return false;
            }
        },
        getTRTC_lineData: function(line){
            for(var i=0; i<TT.data.trtc.line.length; i++){
                if(TT.data.trtc.line[i].id==line){
                    return TT.data.trtc.line[i];
                }
            }
            return false;
        },
        localData: {
            getItem: function(name){
                if(TT.defined.canUseLocalStorage){
                    return window.localStorage.getItem(name);
                }
            },
            setItem: function(name, val){
                if(TT.defined.canUseLocalStorage){
                    return window.localStorage.setItem(name, val);
                }
            },
            list: function(){
                if(TT.defined.canUseLocalStorage) return window.localStorage;
            }
        },
        mixAllRoute: function(aryRoute, flagAD, sortBy){
            var fRouteAry = new Array(), routeA, routeS, routeP, bestLink;
            sortBy = (sortBy) ? sortBy : '';
            for(var tc=0; tc<aryRoute.length; tc++){
                routeA = aryRoute[tc];
                bestLink = routeA[0].bestLink;
                var totalMinute = 0, fastestMinute = 9999;
                for(var i=0; i<bestLink.length; i++){
                    routeP = {
                        linkTime: bestLink[i],
                        routeIndex: tc,
                        routeMap: new Array()
                    }
                    if(!routeP.linkTime[0]) continue;
                    if(!routeP.linkTime[routeP.linkTime.length-1]) continue;
                    for(var j=0; j<routeA.length; j++){
                        if(!bestLink[i][j]) continue;
                        routeS = {
                            company: routeA[j].company,
                            line: routeA[j].line,
                            takeRange: routeA[j].takeRange,
                            origPointer: bestLink[i][j].myPointer,
                            info: bestLink[i][j].info,
                            time: bestLink[i][j].time
                        }
                        if(routeA[j].running) routeS.running = routeA[j].running;
                        if(routeA[j].transStation){
                            routeS.transStation = routeA[j].transStation;
                            routeS.transStationID = routeA[j].transStationID;
                        }
                        if(routeA[j].doNotTakeTrain) routeS.doNotTakeTrain = routeA[j].doNotTakeTrain;
                        routeP.routeMap.push(routeS);
                    }
                    var intSortTime;
                    if(flagAD){
                        intSortTime = TT.fn.transTime2Sec(routeP.linkTime[0].time[0]);
                        if(routeP.linkTime[routeP.linkTime.length-1]) intSortTime = TT.fn.transTime2Sec(routeP.linkTime[routeP.linkTime.length-1].time[1]); //If sort always use arr time, open this
                        if(intSortTime < TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime)) intSortTime += 86400;
                        routeP.tt_sortTime = intSortTime;
                    }else{
                        intSortTime = TT.fn.transTime2Sec(routeP.linkTime[routeP.linkTime.length-1].time[1]);
                        if(intSortTime < TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime)) intSortTime += 86400;
                        routeP.tt_sortTime = intSortTime;
                    }
                    routeP.travelStartTime = routeP.linkTime[0].time[0];
                    if(routeP.routeMap[0].doNotTakeTrain && routeP.linkTime[1]){
                        routeP.travelStartTime = routeP.linkTime[1].time[0];
                        routeP.travelStartTime = TT.fn.transSec2Time(TT.fn.transTime2Sec(routeP.travelStartTime) - (routeP.routeMap[0].transStation.walkMinute*60));
                    }
                    routeP.travelEndTime = routeP.linkTime[routeP.linkTime.length-1].time[1];
                    if(routeP.routeMap[routeP.linkTime.length-1].doNotTakeTrain && routeP.linkTime[routeP.linkTime.length-2]){
                        routeP.travelEndTime = routeP.linkTime[routeP.linkTime.length-2].time[1];
                        routeP.travelEndTime = TT.fn.transSec2Time(TT.fn.transTime2Sec(routeP.travelEndTime) + (routeP.routeMap[routeP.routeMap.length-2].transStation.walkMinute*60));
                    }
                    
                    routeP.travelMinute = (function(){
                        var st = TT.fn.transTime2Sec(routeP.travelStartTime);
                        var ed = TT.fn.transTime2Sec(routeP.travelEndTime);
                        if(ed < st) ed = ed + 86400;
                        return Math.ceil((ed-st)/60);
                    })();
                    if(sortBy=='travelMinute') routeP.tt_sortTime = routeP.travelMinute;
                    if(sortBy=='transCount') routeP.tt_sortTime = routeP.linkTime.length;
                    if(routeP.travelMinute < fastestMinute) fastestMinute = routeP.travelMinute;
                    totalMinute += routeP.travelMinute;
                    fRouteAry.push(routeP);
                }
                routeA[0].total_fastestMinute = fastestMinute;
                routeA[0].total_avgMinute = Math.ceil(totalMinute/bestLink.length);
            }
            fRouteAry = fRouteAry.sort(TT.fn.getTRA_sortByTTSortTime);
            return fRouteAry;
        },
        reverseDir: function(dir){
            if(dir=="1" || dir==1) return "0";
            if(dir=="0" || dir==0) return "1";
        },
        transTime2HM: function(val){
            if(typeof(val)=='number') val = TT.fn.transSec2Time(val);
            var ary = val.split(':');
            return ary[0] + ':' + ary[1];
        },
        transNum2StrA: function(intA){
            intA = parseInt(intA,10);
            if(intA <= 9){
                return '0' + intA;
            }else{
                return intA.toString();
            }
        },
        transTime2Sec: function(str,offsetTomorrow){
            if (str == null || str == '') {
                str = '0';
            }
            var aryA = str.split(':'), rt;
            if (aryA.length <= 1) {
                rt = parseInt(str,10);
            } else if (aryA.length == 2) {
                rt = parseInt(aryA[0],10) * 3600 + parseInt(aryA[1],10) * 60;
            } else if (aryA.length == 3) {
                rt = parseInt(aryA[0],10) * 3600 + parseInt(aryA[1],10) * 60 + parseInt(aryA[2],10);
            }
            
            if(offsetTomorrow && rt < TT.fn.transTime2Sec(TT.fn.getDefaultDayLastTime())){
                rt = rt + 86400;
            }
            return rt;
        },
        transSec2Time: function(sec){
            var tid = 0,
                tih = 0,
                tim = 0,
                tis = 0;

            if((sec === '')){
                return '';
            }else if(parseInt(sec,10) < 0){
                sec = 86400 + sec;
            }
            
            sec = parseInt(sec,10);
            tis = sec % 60;
            sec = sec - tis;
            sec = sec / 60;
            tim = sec % 60;
            sec = sec - tim;
            sec = sec / 60
            tih = sec;
            

            tih = (tih < 10) ? '0' + tih : tih;
            tim = (tim < 10) ? '0' + tim : tim;
            tis = (tis < 10) ? '0' + tis : tis;

            if (tih == 0) {
                return tih + ':' + tim + ':' + tis;
            } else {
                return tih + ':' + tim + ':' + tis;
            }
        }
    }
})($trainTaiwanLib);
})();