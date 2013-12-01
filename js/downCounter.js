var downCounter = (function(endHour){
		var container = document.getElementById("downCounter"),
			eYear = container.getAttribute("endYear"),
			eMth = container.getAttribute("endMth"),
			eDay = container.getAttribute("endDay"),
			eHour = container.getAttribute("endHour"),
			eMin = container.getAttribute("endMin"),
			eSec = container.getAttribute("endSec"),
			bYear = container.getAttribute("beginYear"),
			bMth = container.getAttribute("beginMth"),
			bDay = container.getAttribute("beginDay"),
			bHour = container.getAttribute("beginHour"),
			bMin = container.getAttribute("beginMin"),
			bSec = container.getAttribute("beginSec");
		var beginTime = new Date();
		var counter = {
			endYear: (eYear=="" || eYear==undefined)?beginTime.getFullYear():eYear,
			endMth: (eMth=="" || eMth==undefined)?beginTime.getMonth():eMth,
			endDay: (eDay=="" || eDay==undefined)?beginTime.getDate():eDay,
			endHour: eHour,
			endMin: (eMin=="" || eMin==undefined)?0:eMin,
			endSec: (eSec=="" || eSec==undefined)?0:eSec,
			beginYear: (bYear=="" || bYear==undefined)?beginTime.getFullYear():bYear,
			beginMth: (bMth=="" || bMth==undefined)?beginTime.getMonth():bMth,
			beginDay: (bDay=="" || bDay==undefined)?beginTime.getDate():bDay,
			beginHour: bHour,
			beginMin: bMin,
			beginSec: bSec,
			offHour: 0,
			offMin: 0,
			offSec: 0,
			offMSec: 0
		}
		//显示倒计时
		var showDom = function(){
			var zeroH = "",zeroM = "",zeroS = "";

			if(counter.offHour<10) {
				zeroH = "0";
			}
			if(counter.offMin<10) {
				zeroM = "0";
			}
			if(counter.offSec<10) {
				zeroS = "0";
			}
			container.innerHTML = "剩余<span>" + zeroH + counter.offHour + "</span>时<span>" + zeroM + counter.offMin + "</span>分<span>" + zeroS + counter.offSec + "." + counter.offMSec + "</span>秒";
	 	}
	 	//计算时间差
		var setInitTime = function(){
			var endTime = new Date(counter.endYear, counter.endMth, counter.endDay, counter.endHour, counter.endMin, counter.endSec);//结束时间
			var beginDate = new Date(counter.beginYear, counter.beginMth, counter.beginDay, counter.beginHour, counter.beginMin, counter.beginSec);//开始时间
			var offset = Date.parse(endTime) - Date.parse(beginDate);//毫秒差
			if(offset < 0){
				counter.offMSec = 0;
				counter.offSec = 0;
				counter.offMin = 0;
				counter.offHour = 0;
				showDom();
				return false;
			}
			counter.offHour = Math.floor(offset/(3600000));//得到小时数
			var leave = offset%(3600000);
			counter.offMin = Math.floor(leave/(60000));//得到分钟数
			var leave2 = leave%(60000);
			counter.offSec = Math.floor(leave2/1000);//得到秒数
			showDom();
		}
		return {
			init: function(){
				//初始化
				setInitTime();

				//开始倒计时
				var timer = setInterval(function(){
					--counter.offMSec;
					if(counter.offMSec < 0){
						counter.offMSec = 9;
						--counter.offSec;
						if(counter.offSec < 0){
							counter.offSec = 59;
							--counter.offMin;
							if(counter.offMin < 0){
								counter.offMin = 59;
								--counter.offHour;
								if(counter.offHour < 0){
									clearInterval(timer);
									counter.offSec = 0;
									counter.offMin = 0;
									counter.offHour = 0;	
								}
							}
						}
					}
					showDom();
				},100)
			}
		}
	})();