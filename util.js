/**
* js util set
*/


//jQuery Check
if(typeof $pax != 'undefined') jQuery = $pax;
if(typeof jQuery == 'undefined') jQuery = {};


/**
* namespace util
*/
var util = (function($,undefined){

return {


test : function(){
	console.log("테스트");
}


/**
* timer 함수
*/
, timer : function(limitTime,interAction,finAction){
	this.limitTime = limitTime;
	this.interAction =  (typeof(interAction) == 'function')? interAction : function(){};
	this.finAction =  (typeof(finAction) == 'function')? finAction : function(){};
	this.curTimer;
	this.curTime;

	this.startTimer = function(){
		var timerTime = this.limitTime;
		var inter = this.interAction;
		var fin = this.finAction;
		var setGlobalCurTime = function(timerTime){
			this.curTime = timerTime;
		}


		var timer = setInterval(function(){
			if(timerTime < 0 ){
					clearInterval(timer);
					fin();
				}else{
					setGlobalCurTime(timerTime--);
					inter();
				}
		},1000);

		this.curTimer = timer;
	};

	this.stopTimer = function(){
		clearInterval(this.curTimer);
	};

	return this;
}


/**
*	시간 포맷 함수
*/
, makeTimeForm : function(num,format){
	var hour = Math.floor(num/3600);
	var min = Math.floor((num-(hour*3600))/60);
	var sec = num - (hour*3600) - (min*60);

	if(hour < 10) hour = "0" + hour;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;

	var result = "";
	switch(format){
	case('H:i:s'): result = hour + ":" + min + ":" + sec; break;
	case('i:s'): result = min + ":" + sec; break;
	}

	return result;
}

/**
* 휴대폰 번호 유효성 검사 함수
*/
, checkPhoneNum : function(num){
		var regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

		return regex.test(num);
	}


	/**
	* 체크박스 세팅 함수
	* params : 부모엘리먼트(Object), 전체동의체크박스 아이디(String), 초기값(boolean/true: 체크상태)
	*/
	, setCheckBox : function(obj,allID,init){
			var arrAllObj = obj.children;
			var arrCheckbox = new Array();

			for(var i=0; i<arrAllObj.length; i++){
				if(arrAllObj[i].type == 'checkbox'){
					arrCheckbox.push(arrAllObj[i]);
				}
			}

			for(var i=0; i<arrCheckbox.length; i++){
				if(arrCheckbox[i].id == allID){
					arrCheckbox[i].addEventListener('click',function(){
						for(var j=0; j<arrCheckbox.length; j++){
							if(i != j){
								arrCheckbox[j].checked = this.checked;
							}
						}
					});
					break;
				};
			}

			if(init == true){
				for(var i=0; i<arrCheckbox.length; i++){
					arrCheckbox[i].checked = true;
				}
			}
		}


    /**
     * 파일확장자 체크
     * @param fileName
     * @param checkType
     * @returns {boolean}
     */
    ,checkFileExt: function(fileName, checkType){
        var extArray;
        switch(checkType){
            case "video": extArray = ['avi', 'wmv', 'asf', 'mp4', 'flv', 'mkv'];
            case "img" 	: extArray = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
            case "excel": extArray = ['xls', 'xlsx'];
            default 	: extArray = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'txt', 'text', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'zip', 'alz', 'pdf'];
        }

        var pathMid = fileName.lastIndexOf(".");
        var pathEnd = fileName.length;

        var extName = fileName.substring(pathMid+1, pathEnd).toLowerCase();

        if(extArray.indexOf(extName) != -1){
            return true;
        }else{
            return false;
        }
    }

}

})(jQuery)

/*trim*/
String.prototype.trim = function() {
return this.replace(/(^\s*)|(\s*$)/gi, "");
}


/* *
 *date
* Useage : new Date().format(dateform)
*/
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/**
* set String to Date Form
* yyyy-mm-dd hh:mm:ss
*/
String.prototype.setDateForm = function(len){
	var dateForm;
	switch(len){
		case(12):
			dateForm = this.substr(0,4) + "-";
			dateForm += this.substr(4,2) + "-";
			dateForm += this.substr(6,2) + " ";
			dateForm += this.substr(8,2) + ":";
			dateForm += this.substr(10,2);
			break;
	}

	return dateForm;
};
