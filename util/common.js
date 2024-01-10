var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
export const fn = {

	getClass: function(oParent, sClass) {
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];
		var re = new RegExp('\\b' + sClass + '\\b', 'i');
		var i = 0;
		for (i = 0; i < aEle.length; i++) {
			if (re.test(aEle[i].className)) {
				aResult.push(aEle[i]);
			}
		}

		return aResult;
	},
	hasClass: function(el, className) {
		let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
		return reg.test(el.className)
	},

	addClass: function(el, className) {
		if (fn.hasClass(el, className)) {
			return
		}
		let newClass = el.className.split(' ')
		newClass.push(className)
		el.className = newClass.join(' ')
	},

	removeClass: function(ele, cls) {
		if (fn.hasClass(ele, cls)) {
			var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
			ele.className = ele.className.replace(reg, " ");
		}
	},

	//清除所有的样式
	removeAllClass: function(el, className) {
		var els = el.parentNode.children; // 所有同级
		for (var i = 0; i < els.length; i++) {
			fn.removeClass(els[i], className)
		}
	},

	// 保存当前状态 
	activeState: function(el, className) {
		var els = el.parentNode.children; // 所有同级
		for (var i = 0; i < els.length; i++) {
			fn.removeClass(els[i], className)
		}
		fn.addClass(el, className)
	},

	getData: function(el, name, val) {
		const prefix = 'data-'
		if (val) {
			return el.setAttribute(prefix + name, val)
		}
		// alert(el)
		return el.getAttribute(prefix + name)
	},
	//删除所有标签
	delHtmlTag: function(str) {
		return str.replace(/<[^>]+>/g, "");
	},
	//字符替换
	replaceStr: function(str) {
		return str = str.replace(/style\=".+?"|style\=\'.+?\'/g, '');
	},
	//数组去重
	unique: function (arr) {
	  return Array.from(new Set(arr))
	},
	//判断数组中所有元素都不同
	isRepeat: function(arr) {
		var hash = {};
		for (var i in arr) {
			if (hash[arr[i]]) //hash 哈希
				return true;
			hash[arr[i]] = true;
		}
		return false;
	},
	//获取数组中相同元素的个数
	getSameNum: function(val, arr) {
		var processArr = arr.filter(function(value) {
			return value == val;
		})
		return processArr.length;
	},
	//判断两个数组相同的元素
	getArrEqual: function(arr1, arr2) {
		var newArr = [];
		for (var i = 0; i < arr2.length; i++) {
			for (var j = 0; j < arr1.length; j++) {
				if (arr1[j] === arr2[i]) {
					newArr.push(arr1[j]);
				}
			}
		}
		return newArr;
	},

	//判断两个数组不同的元素
	getArrDifference: function(arr1, arr2) {
		return arr1.concat(arr2).filter(function(v, i, arr) {
			return arr.indexOf(v) === arr.lastIndexOf(v);
		});
	},

	//三位数字加个‘，’
	format_number: function(n) {
		var b = parseInt(n).toString();
		var len = b.length;
		if (len <= 3) {
			return b;
		}
		var r = len % 3;
		return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(
			",");
	},
	//三位数字加个‘，’，尾数保留两位小数
	formatFix_number: function(number, decimals, dec_point, thousands_sep) {
		/*
		 * 参数说明：
		 * number：要格式化的数字
		 * decimals：保留几位小数
		 * dec_point：小数点符号
		 * thousands_sep：千分位符号
		 * */

		number = (number + '').replace(/[^0-9+-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.ceil(n * k) / k;
			};


		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		var re = /(-?\d+)(\d{3})/;
		while (re.test(s[0])) {
			s[0] = s[0].replace(re, "$1" + sep + "$2");
		}


		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	},
	//文本框换行、空格保存
	textareaTo: function(str) {
		var reg = new RegExp("\n", "g");
		var regSpace = new RegExp(" ", "g");
		str = str.replace(reg, "<br>");
		str = str.replace(regSpace, "&nbsp;");
		return str;
	},

	//正则判断大全
	testRule: {

		//邮箱正则判断
		isEmail: function(str) {
			var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
			return reg.test(str);
		},

		//不能输入汉字
		isWord: function(str) {
			var reg = /[\W]/;
			return reg.test(str);
		},

		//手机号正则判断
		isTel: function(str) {
			var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
			return reg.test(str);
		},

		//身份证正则判断
		isCard: function(str) {
			var reg =
				/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
			return reg.test(str);
		},

		//邮政编号正则判断
		isPostal: function(str) {
			var reg = /^[1-9]\d{5}(?!\d)$/;
			return reg.test(str);
		},

		//URl正则判断
		isUrl: function(str) {
			var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
			return reg.test(str);
		},

		//只能输入数字正则判断
		isNum: function(str) {
			var reg = /^\d+$/;
			return reg.test(str);
		},

		//日期正则判断
		isDate: function(str) {
			var reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
			return reg.test(str);
		}


	},


	//getDay(-3);//3天前日期
	getDay: function(day) {
		var today = new Date();

		var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

		today.setTime(targetday_milliseconds); //注意，这行是关键代码

		var tYear = today.getFullYear();
		var tMonth = today.getMonth();
		var tDate = today.getDate();
		tMonth = this.doHandleMonth(tMonth + 1);
		tDate = this.doHandleMonth(tDate);
		return tYear + "-" + tMonth + "-" + tDate;
	},
	doHandleMonth: function(month) {
		var m = month;
		if (month.toString().length == 1) {
			m = "0" + month;
		}
		return m;
	},

	//获取本周的日期
	getDates: function() {
		var new_Date = new Date()
		var timesStamp = new_Date.getTime();
		var currenDay = new_Date.getDay();
		var dates = [];
		for (var i = 0; i < 7; i++) {
			dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
				/[年月]/g, '-').replace(/[日上下午]/g, ''));
		}
		return dates
	},


	//获取当前时间，格式YYYY-MM-DD
	getNowFormatDate: function() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	},

	/** 
	 * 时间戳转化为年 月 日 时 分 秒 
	 * number: 传入时间戳 
	 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
	 * fn.formatTime('1350052653','Y-M-D h:m:s')
	 */
	formatTime: function(number, format) {

		var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
		var returnArr = [];

		var date = new Date(number);
		returnArr.push(date.getFullYear());
		returnArr.push(this.formatNumber(date.getMonth() + 1));
		returnArr.push(this.formatNumber(date.getDate()));

		returnArr.push(this.formatNumber(date.getHours()));
		returnArr.push(this.formatNumber(date.getMinutes()));
		returnArr.push(this.formatNumber(date.getSeconds()));

		for (var i in returnArr) {
			format = format.replace(formateArr[i], returnArr[i]);
		}
		return format;
	},

	//数据转化  
	formatNumber: function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	},

	/*时间差比较：
	      interval ：D表示查询精确到天数的之差
	      interval ：H表示查询精确到小时之差
	      interval ：M表示查询精确到分钟之差
	      interval ：S表示查询精确到秒之差
	      interval ：T表示查询精确到毫秒之差
	      */
	dateDiff: function(interval, date1, date2) {
		var objInterval = {
			'D': 1000 * 60 * 60 * 24,
			'H': 1000 * 60 * 60,
			'M': 1000 * 60,
			'S': 1000,
			'T': 1
		};
		interval = interval.toUpperCase();
		//var dt1 = new  Date(Date.parse(date1.replace(/-/g, '/')));
		//var dt2 = new  Date(Date.parse(date2.replace(/-/g, '/')));
		var dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
		var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
		try {
			return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.' + interval));
		} catch (e) {
			return e.message;
		}
	},
	formatDate: function(date) {
		var myyear = date.getFullYear();
		var mymonth = date.getMonth() + 1;
		var myweekday = date.getDate();
		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		return (myyear + "-" + mymonth + "-" + myweekday);
	},
	//获得某月的天数
	getMonthDays: function(myMonth) {
		var monthStartDate = new Date(nowYear, myMonth, 1);
		var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	},
	//获得本季度的开始月份
	getQuarterStartMonth: function() {
		var quarterStartMonth = 0;
		if (nowMonth < 3) {
			quarterStartMonth = 0;
		}
		if (2 < nowMonth && nowMonth < 6) {
			quarterStartMonth = 3;
		}
		if (5 < nowMonth && nowMonth < 9) {
			quarterStartMonth = 6;
		}
		if (nowMonth > 8) {
			quarterStartMonth = 9;
		}
		return quarterStartMonth;
	},
	//获得本周的开始日期
	getWeekStartDate: function() {
		var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
		return this.formatDate(weekStartDate);
	},
	//获得本周的结束日期
	getWeekEndDate: function() {
		var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
		return this.formatDate(weekEndDate);
	},
	//获得上周的开始日期
	getLastWeekStartDate: function() {
		var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
		return this.formatDate(weekStartDate);
	},
	//获得上周的结束日期
	getLastWeekEndDate: function() {
		var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
		return this.formatDate(weekEndDate);
	},
	//获得本月的开始日期
	getMonthStartDate: function() {
		var monthStartDate = new Date(nowYear, nowMonth, 1);
		return this.formatDate(monthStartDate);
	},
	//获得本月的结束日期
	getMonthEndDate: function() {
		var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
		return this.formatDate(monthEndDate);
	},
	//获得上月开始时间
	getLastMonthStartDate: function() {
		var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
		return this.formatDate(lastMonthStartDate);
	},
	//获得上月结束时间
	getLastMonthEndDate: function() {
		var lastMonthEndDate = new Date(nowYear, lastMonth, this.getMonthDays(lastMonth));
		return this.formatDate(lastMonthEndDate);
	},
	//获得本季度的开始日期
	getQuarterStartDate: function() {
		var quarterStartDate = new Date(nowYear, this.getQuarterStartMonth(), 1);
		return this.formatDate(quarterStartDate);
	},
	//或的本季度的结束日期
	getQuarterEndDate: function() {
		var quarterEndMonth = this.getQuarterStartMonth() + 2;
		var quarterStartDate = new Date(nowYear, quarterEndMonth,
			this.getMonthDays(quarterEndMonth));
		return this.formatDate(quarterStartDate);
	}

}
