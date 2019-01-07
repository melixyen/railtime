(function(){
if(!window.$trainTaiwanLib) window.$trainTaiwanLib = {};

(function(TT){
	    
    //+++++TYMETRO function start+++++
    TT.fn.tymetro = {
        check_timeTableIsLoaded: function(){
            return (TT.data.tymetro.timeTable) ? true : false;
        },
        check_changeMayFastByFromTo: function(a,b){
        	var stA = TT.fn.tymetro.get_stationDataOfID(a);
        	var stB = TT.fn.tymetro.get_stationDataOfID(b);
        	var is1big1small = ((stA.big=='d' || stB.big=='d') && stA.big!=stB.big) ? true : false;
        	var isDiffSect = ((stA.sect.indexOf(',')<0 && stB.sect.indexOf(',')<0) && stA.sect!=stB.sect) ? true : false;
        	var rt = (is1big1small && isDiffSect) ? true : false;
        	return rt;
        },
        get_allTimeByFromTo: function(a, b, line, w){
            if(!w) w = TT.defined.defaultTRAWeekday;
            var dir = TT.fn.tymetro.get_dirByFromTo(a, b);
            //line = TT.fn.getTRTC_lineCheckOrDefault(a, b, line);
            if(dir===false){
                //fetaure add cross line function
                return false;
            }
            //var aTime = TT.fn.tymetro.get_stationTime(a, line, dir, w);
            //var aryFromToTime = new Array();
            //var tmpBTime, tmpATime, tmpANTime;
            //for(var i=0; i<aTime.length; i++){
                //tmpBTime = (TT.fn.transTime2Sec(aTime[i]) + (offsetTime*60))%86400;
                //tmpBTime = TT.fn.transSec2Time(tmpBTime);
                //aryFromToTime.push([aTime[i], tmpBTime]);
            //} 
            //return aryFromToTime;
            //tra
            
            var aryTime = new Array();
            var dayTimeTable = TT.fn.tymetro.get_dayTimeTable('tymetro_1',w);
            for(var i=0; i<dayTimeTable.length; i++){
                var timeTable = dayTimeTable[i];
                var timeInfo = timeTable.timeTable;
                var aST = TT.fn.tymetro.get_stationIsOnThisTime(a, timeInfo);
                var bST = TT.fn.tymetro.get_stationIsOnThisTime(b, timeInfo);
                var pTimeTable;
                if(aST!==false && bST!==false && timeTable.dir==dir){
                    if(aST > bST) continue;
                    pTimeTable = $.extend({},timeTable);
                    pTimeTable.fromStation = a;
                    pTimeTable.toStation = b;
                    aryTime.push(pTimeTable);
                }
            }
            return aryTime;
        },
        get_timeRangeByFromTo: function(a, b, startTime, endTime, flagAD, line, w){
            if(flagAD===undefined) flagAD = true;
            if(!w) w = TT.defined.defaultTRAWeekday;
            
            if(!startTime) startTime = 0;
            if(!endTime) endTime = 60*60*24-1;
            var timeTable = TT.fn.tymetro.get_allTimeByFromTo(a, b, line, w);
            if(typeof(startTime)!='number') startTime = TT.fn.transTime2Sec(startTime);
            if(typeof(endTime)!='number') endTime = TT.fn.transTime2Sec(endTime);
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime),
                offset1Day = 86400;
            
            function cpTime(ttb){
                var insEnd = endTime;
                var time, timeInfo;
                if(flagAD){
                    timeInfo = TT.fn.tymetro.get_carTimeOfStation(a,ttb);
                    time = TT.fn.transTime2Sec(timeInfo.depTimeStr);
                }else{
                    timeInfo = TT.fn.tymetro.get_carTimeOfStation(b,ttb);
                    time = TT.fn.transTime2Sec(timeInfo.arrTimeStr);
                }
                
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
            aryTime = aryTime.sort(TT.fn.tymetro.get_sortByABTime);
            return aryTime;
        },
        get_carTimeOfStation: function(stationID, timeTable){
            if(timeTable.timeTable) timeTable = timeTable.timeTable;
            for(var i=0; i<timeTable.length; i++){
                if(timeTable[i].stationID==stationID){
                    return timeTable[i];
                }
            }
            return false;
        },
        get_carTypeColor: function(type){
            var rt = false;
            var ary = TT.data.tymetro.defined.CarClass;
            for(var i=0; i<ary.length; i++){
                if(ary[i].id==type){
                    rt = ary[i].color;
                }
            }
            return rt;
        },
        get_carTypeName: function(type, flagColor){
            var name = '普通車', color = '';
            switch(type){
                case 'directly':
                    name = '直達車';
                    if(flagColor) color = TT.fn.tymetro.get_carTypeColor(type);
                break;
                case 'normal':
                    name = '普通車';
                    if(flagColor) color = TT.fn.tymetro.get_carTypeColor(type);
                break;
            }
            var rt = name;
            if(flagColor && color!=''){
                rt = '<span style="color:' + color + ';">' + rt + '</span>';
            }
            return rt;
        },
        get_dayTimeTable: function(line, w){
            //Noew only first
            line = 'tymetro_1';
            w = w || 0;
            return TT.data.tymetro.timeTable[line][w];
        },
        get_fromToTimeArray: function(objA){
        	var fromStation = objA.fromStation,
        		toStation = objA.toStation,
        		fromTime = 0,
        		toTime = 0;
        	var ttb = objA.timeTable;
        	for(var i=0; i<ttb.length; i++){
        		if(ttb[i].stationID==fromStation){
        			fromTime = ttb[i].depTime;
        		}
        		if(ttb[i].stationID==toStation){
        			toTime = ttb[i].arrTime;
        		}
        	}
        	return [TT.fn.transSec2Time(fromTime), TT.fn.transSec2Time(toTime)];
        },
        get_stationTime: function(stationID, dir, w){
            if(w==null) w = TT.defined.defaultTRAWeekday;
            if(dir==null) dir = '1';
            
            stationID = TT.fn.tymetro.get_stationID(stationID);
            var dayTimeTable = TT.fn.tymetro.get_dayTimeTable('tymetro_1',w);
            var stationDayTimeAry = new Array();
            for(var i=0; i<dayTimeTable.length; i++){
                var timeInfoOfStation = TT.fn.tymetro.get_stationIsOnTimeInfo(stationID, dayTimeTable[i].timeTable);
                if(timeInfoOfStation && dayTimeTable[i].dir==dir){
                    timeInfoOfStation.CarInfo = dayTimeTable[i];
                    stationDayTimeAry.push(timeInfoOfStation);
                }
            }
            return stationDayTimeAry;
        },
        get_stationID: function(sid){
            //if(sid.indexOf('tymetro_')==0) sid = sid.replace('tymetro_','');
            return sid;
        },
        get_sortByABTime: function(a,b){
            var intA = TT.fn.transTime2Sec(a[0]);
            var intB = TT.fn.transTime2Sec(b[0]);
            var crossDaySec = TT.fn.transTime2Sec(TT.defined.defaultCrossDayTime);
            if(intA < crossDaySec) intA += 86400;
            if(intB < crossDaySec) intB += 86400;
            
            if(intA==intB) return 0;
            if(intA < intB) return -1;
            if(intA > intB) return 1;
        },
        get_dirByFromTo: function(a, b, line){
            //line = TT.fn.getTRTC_lineCheckOrDefault(a, b, line);
            if(!line) line = 'tymetro_1';
            
            if(line){
                var lineData = TT.fn.tymetro.get_lineData(line);
                for(var i=0; i<lineData.station.length; i++){
                    if(lineData.station[i]==a) return lineData.dir;
                    if(lineData.station[i]==b) return TT.fn.reverseDir(lineData.dir);
                }
                return false;
            }else{
                return false;
            }
        },
        get_lineData: function(line){
            for(var i=0; i<TT.data.tymetro.line.length; i++){
                if(TT.data.tymetro.line[i].id==line){
                    return TT.data.tymetro.line[i];
                }
            }
            return false;
        },
        get_stationDataOfID: function(id, lineID){
            var ary=TT.data.tymetro.station_ary;
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
        get_stationIsOnThisLine: function(stationID, Line){
            for(var i=0; i<Line.station.length; i++){
                if(stationID==Line.station[i]) return i;
            }
            return false;
        },
        get_stationIsOnThisTime: function(stationID, timeInfo){
            stationID = TT.fn.tymetro.get_stationID(stationID);
            for(var i=0; i<timeInfo.length; i++){
                if(stationID==timeInfo[i].stationID) return i;
            }
            return false;
        },
        get_stationIsOnTimeInfo: function(stationID, timeInfo){
            stationID = TT.fn.tymetro.get_stationID(stationID);
            for(var i=0; i<timeInfo.length; i++){
                if(timeInfo[i].stationID==stationID){
                    return timeInfo[i];
                    break;
                }
            }
            return false;
        },
        get_stationOnWhatLine: function(st){
            var rt = new Array(),
                line = TT.data.tymetro.line;
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
        get_stationOnSameLine: function(a, b){
            var rt = new Array();
            var aLine = TT.fn.tymetro.get_stationOnWhatLine(a);
            var bLine = TT.fn.tymetro.get_stationOnWhatLine(b);
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
        get_stationID: function(sid){
            if(sid.indexOf('tymetro_')==0){
                //sid = sid.replace('tymetro_','');
            }
            return sid;
        },
        get_timeTable2Data: function(cbFn){
            function doBack(json){
                if(typeof(json)=='string' && json=='error'){
                    return false;
                }
                //Process to TT.data.tymetro.timeTable.line.station{week, time}
                var tb = {tymetro_1: []}, tmpObj;
                for(var i=0; i<json.length; i++){
                    tmpObj = json[i];
                    if(!tb.tymetro_1[0]) tb.tymetro_1[0] = [];
                    tb['tymetro_1'][0].push(tmpObj);
                }
                tb.tymetro_1[1] = tb.tymetro_1[0]; tb.tymetro_1[2] = tb.tymetro_1[0]; tb.tymetro_1[3] = tb.tymetro_1[0]; tb.tymetro_1[4] = tb.tymetro_1[0]; tb.tymetro_1[5] = tb.tymetro_1[0]; tb.tymetro_1[6] = tb.tymetro_1[0];
                TT.data.tymetro.timeTable = tb;
                if(TT.fn.checkIsFunction(cbFn)){
                    cbFn();
                }
            }
            
            TT.fn.tymetro.get_timeTableJSON('time_tymetro.json', doBack);
        },
        get_timeTableJSON: function(url, successFn, errorFn){
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
        }
    }
    //+++++TYMETRO function end+++++
})($trainTaiwanLib);
})();