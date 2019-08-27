/**
 * author yiper.fan
 */

var ua = navigator.userAgent.toUpperCase();

const tool: any = {
	IS_ANDROID: ua.indexOf('ANDROID') !== -1,

	IS_IOS: ua.indexOf('IPHONE OS') !== -1,

	IS_WECHAT: ua.indexOf('MICROMESSENGER') !== -1,
	/**
	 * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
	 * @param value
	 * @returns {boolean}
	 */
	isArray: function(value: any) {
		return Object.prototype.toString.call(value) == '[object Array]';
	},
	/**
	 * 打乱数组元素
	 *
	 */
	upset: function(arr: any[]) {
		return arr.sort(function() {
			return Math.random() - 0.5;
		});
	},
	/**
	 * 获取URL的参数
	 * @returns {}
	 */
	getRequest: function(key: string) {
		var search = location.search.slice(1); //得到get方式提交的查询字符串
		var arr = search.split('&');
		for (var i = 0; i < arr.length; i++) {
			var ar = arr[i].split('=');
			if (ar[0] == key) {
				return ar[1];
			}
		}
	},
	/**
	 * 获取字符串长度 汉字算两个
	 * @param {string} val
	 * @returns {number}
	 */
	getByteLen(val: string) {
		let len = 0;
		for (let i = 0; i < val.length; i++) {
			const length = val.charCodeAt(i);
			if (length >= 0 && length <= 128) {
				len += 1;
			} else {
				len += 2;
			}
		}
		return len;
	},
	/**
	 *
	 * @param message  提示字符
	 */
	alert: function(message: object | string) {
		const dom = document.querySelector('#toolAlert') as HTMLDivElement;
		const debugDom = dom ? dom : createAlertDom();

		console.log(debugDom);
		debugDom.style.display = 'block';
		const messageDom = document.querySelector('#toolmessage') as HTMLDivElement;
		messageDom.innerHTML = typeof message === typeof {} ? <string>JSON.stringify(message) : <string>message;
		//debugDom.appendChild(messageDom);

		function createAlertDom(): HTMLDivElement {
			let dom = document.createElement('div');
			dom.id = 'toolAlert';
			dom.style.cssText =
				'display:none;background:rgba(0,0,0,.5);height:100%;width:100%;overflow:auto;position:fixed;left:0;top:0;z-index:99999';
			dom.innerHTML = `
            <div style="width: 88%;margin: 45% auto 0;background:#eeeeee;border-radius: 10px;">
                <h4 id="toolmessage" style="padding: 20px 3px;text-align: center;word-break:break-all;"></h4>
                <p style="text-align: center;padding: 10px 0;border-top:1px solid #a7a7de;">好</p>
            </div>    
		`;
			const ElementBody = document.querySelector('body') as HTMLBodyElement;
			ElementBody.appendChild(dom);
			dom.addEventListener(
				'click',
				function(ev: any) {
					if (ev.target.nodeName.toUpperCase() === 'P') {
						dom.style.display = 'none';
					}
				},
				false
			);
			dom.addEventListener(
				'touchmove',
				function(ev) {
					ev.preventDefault();
					ev.stopPropagation();
					return false;
				},
				false
			);
			//dom.innerHTML = message;
			return dom;
		}
	},
	/**
	 * 在页面中开一个控制台，打印调试信息
	 * @param message  打印字符
	 */
	debuglog: function(message: any) {
		const arr = ['m.caibeitv.com', 'v.caibeitv.com', 'e.caibeitv.com'];
		if (arr.indexOf(location.host) !== -1) {
			return;
		}
		const dom = document.querySelector('#debugDom');
		const debugDom = dom ? dom : creatDom();

		const messageDom = document.createElement('div');
		messageDom.innerHTML = typeof message === typeof {} ? JSON.stringify(message) : message;
		debugDom.appendChild(messageDom);

		function creatDom() {
			let dom = document.createElement('div');
			dom.id = 'debugDom';
			dom.style.cssText =
				'background:#000;color:#ffffff;width:100%;height:300px;overflow:auto;word-break:break-all;';
			const ElementBody = document.querySelector('body') as HTMLBodyElement;
			ElementBody.appendChild(dom);
			//dom.innerHTML = message;
			return dom;
		}
	},
	/**
	 *
	 * @param func 要执行的方法
	 * @param wait  间隔时间
	 * @param immediate  布尔值    true 间隔前执行   false 间隔后执行
	 * @returns {Function}  返回要执行的方法
	 */
	debounce: function(func: Function, wait: number, immediate: boolean) {
		var timeout: null | number, args: any, context: any, timestamp: number, result: Function;

		var later = function() {
			console.log(1111, new Date().getTime(), timestamp);
			var last = new Date().getTime() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function(this: any) {
			context = this;
			args = arguments;
			timestamp = new Date().getTime();
			var callNow = immediate && !timeout;
			console.log(timeout);
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	}
};

tool.IS_PC = (function() {
	let userAgentInfo = navigator.userAgent;
	let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
})();

// tool.IS_TXT = ua.indexOf('PATXT') != -1;

/**
 * 获取滑动的方向
 * @param element  在哪个元素上
 * @param num   滑动的灵敏度 数字越低 灵敏度越高
 * @returns {object} {dir: null, isTouch: boolean}
 */
tool.touchDirection = function(element: Element, num: number) {
	var startX = 0,
		startY = 0,
		endX = 0,
		endY = 0,
		dir: dir = { dir: '', isTouch: false };
	const oNum = num || 30;
	element.addEventListener(
		'touchstart',
		function(event: any) {
			dir.isTouch = false;
			//event.preventDefault();
			var touch = event.targetTouches[0];
			startX = touch.pageX;
			startY = touch.pageY;
		},
		false
	);

	element.addEventListener(
		'touchmove',
		function(event: any) {
			dir.isTouch = true;
			//event.preventDefault();
			var touch = event.targetTouches[0];
			endX = touch.pageX;
			endY = touch.pageY;
			// console.log(startX,startY)
		},
		false
	);

	element.addEventListener(
		'touchend',
		function() {
			//event.preventDefault();
			const touchX = endX - startX,
				touchY = endY - startY;

			if (Math.abs(touchX) > Math.abs(touchY)) {
				if (touchX < -oNum) {
					// console.log('向左')
					dir.dir = 'left';
				} else if (touchX > oNum) {
					// console.log('向右')
					dir.dir = 'right';
				}
			} else {
				if (touchY < -oNum) {
					// console.log('向上');
					dir.dir = 'top';
				}
				if (touchY > oNum) {
					// console.log('向下') ;
					dir.dir = 'bottom';
				}
			}
		},
		false
	);
	return dir;
};

/**
 * 简单的ajax  get 请求
 * @param {string} url string
 * @param {Function} fn callback
 */
tool.getJSON = function(url: string, fn: Function) {
	const request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			// Success!
			let data = JSON.parse(request.responseText);
			fn(data);
		} else {
			// We reached our target server, but it returned an error
		}
	};
	//request.onerror = function() {
	//    // There was a connection error of some sort
	//};

	request.send();
};
/**
 *
 * @param date  日期时间戳
 * @param fmt   格式化  格式
 * @returns {string}  格式化后的时间
 */
interface oo {
	[index: string]: number;
}
interface weekweek {
	[index: string]: string;
}
tool.formatDate = function(date: any, fmt = 'YYYY-MM-DD HH:mm:ss') {
	if (typeof date === 'string') {
		date = new Date(date.replace(/-/g, '/'));
	}
	if (typeof date === 'number') {
		date = new Date(date);
	}

	var o: oo = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		S: date.getMilliseconds()
	};

	var week: weekweek = {
		'0': '\u65e5',
		'1': '\u4e00',
		'2': '\u4e8c',
		'3': '\u4e09',
		'4': '\u56db',
		'5': '\u4e94',
		'6': '\u516d'
	};
	if (/(Y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']
		);
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length)
			);
		}
	}
	return fmt;
};

//
// window['Ftool'] = tool ;
// module.exports = tool ;
export default tool;
export { tool as Ftool };
