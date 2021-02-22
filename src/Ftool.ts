/**
 * author yiper.fan
 */

const ua = navigator.userAgent.toUpperCase();
const Agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];

export const IS_ANDROID = ua.indexOf('ANDROID') !== -1;
export const IS_IOS = ua.indexOf('IPHONE OS') !== -1;
export const IS_WECHAT = ua.indexOf('MICROMESSENGER') !== -1;
export const IS_PC = !Agents.some((item) => ua.indexOf(item.toUpperCase()) > 0);

/********* string方法 **********/

/**
 * 获取URL的参数
 * @returns {string}
 */
export const getRequestParams = function (key: string) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split('&');
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split('=');
        if (ar[0] == key) {
            return ar[1];
        }
    }

    return undefined;
};

/**
 * 获取字符串长度 汉字算两个
 * @param {string} val
 * @returns {number}
 */
export const getByteLen = (val: string): number => {
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
};

/**
 * 截取字符串 并添加...
 * @param {string} str 内容
 * @param {number} num 保留几个字符串，汉字算两个
 * @param {boolean} showEllipsis - 是否显示省略号
 */
export const truncationFont = function (str: string, num: number, showEllipsis: boolean = true): string {
    if (!str) {
        return str;
    }

    let s = '';
    for (let i of str) {
        s += i;
        if (getByteLen(s) > (num - 2) * 2) {
            break;
        }
    }

    return showEllipsis ? (str !== s ? s + '...' : str) : s;
    // return getByteLen(str) <= num * 2 ? str : showEllipsis ? str.substr(0, num) + '...' : str.substr(0, num);
};

/**
 * 给URL添加查询字符串
 * @param {String} url
 * @param {Object} obj
 * @returns {string}
 */
export const setUrlQuery = function (url: string, obj: object = {}): string {
    let p = [];
    for (let key in obj) {
        p.push(`${key}=${obj[key]}`);
    }
    return `${url}?${p.join('&')}`;
};

/********* string方法 end! **********/

/***** Array 相关 */

/**
 * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
 * @param value
 * @returns {boolean}
 */
export const isArray = function (value: any): boolean {
    return Object.prototype.toString.call(value) == '[object Array]';
};

/**
 * 打乱数组元素
 *
 */
export const upset = function (arr: any[]) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
};

/******Array 相关 end */

/**
 *
 * 简易提示框
 */
export const Falert = function (message: object | string) {
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
        dom.style.cssText = 'display:none;background:rgba(0,0,0,.5);height:100%;width:100%;overflow:auto;position:fixed;left:0;top:0;z-index:99999';
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
            function (ev: any) {
                if (ev.target.nodeName.toUpperCase() === 'P') {
                    dom.style.display = 'none';
                }
            },
            false
        );
        dom.addEventListener(
            'touchmove',
            function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            },
            false
        );
        //dom.innerHTML = message;
        return dom;
    }
};

/**
 * 在页面中开一个控制台，打印调试信息
 * @param message  打印字符
 * @param {array} host - host列表，在此列表中的不会打印出log，可用于防止线上环境出现控制台
 */
const host: string[] = [];
const debuglog = function (message: any) {
    const arr = host;

    if (arr.indexOf(location.host) !== -1) {
        return;
    }
    const dom = document.querySelector('#debugDom');
    const debugDom = dom ? dom : creatDom();

    class CreatMessage {
        messageDom: HTMLDivElement;
        message: any;
        constructor(message: any) {
            this.messageDom = document.createElement('div');
            this.message = typeof message === typeof {} ? JSON.stringify(message) : message;
            this.messageDom.style.cssText = ' word-wrap:break-word';
            this.messageDom.innerHTML = this.message;
            debugDom.appendChild(this.messageDom);
        }
    }

    function creatDom() {
        let dom = document.createElement('div');
        dom.id = 'debugDom';
        dom.style.cssText = 'background:#000;color:#ffffff;width:100%;height:300px;overflow:auto; word-wrap:break-word';
        const ElementBody = document.querySelector('body') as HTMLBodyElement;
        ElementBody.appendChild(dom);
        //dom.innerHTML = message;
        return dom;
    }

    return new CreatMessage(message);
};

/**
 *
 * @param func 要执行的方法
 * @param wait  间隔时间
 * @param immediate  布尔值    true 间隔前执行   false 间隔后执行
 * @returns {Function}  返回要执行的方法
 */
export const debounce = function (func: Function, wait: number, immediate: boolean) {
    var timeout: any, args: any, context: any, timestamp: number, result: Function;

    var later = function () {
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

    return function (this: any) {
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
};

/**
 *
 * @param d  日期时间戳或者日期字符串 2021-10-06
 * @param fmt   格式化  格式
 * @returns {string}  格式化后的时间
 */

export const formatDate = function (d: string | number, fmt: string = 'YYYY-MM-DD HH:mm:ss') {
    let date = new Date();
    if (typeof d === 'string') {
        date = new Date(d.replace(/-/g, '/'));
    }
    if (typeof d === 'number') {
        date = new Date(date);
    }

    var o: any = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };

    var week: any = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d',
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

/**
 * 简单的post请求
 * @param url
 * @param data
 * @param fn
 */
export const postJSON = function (url: string, data: object, fn: Function) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Success!
            let data = JSON.parse(request.responseText);
            fn(data);
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
};

/**
 * 获取JSON
 * @param {string} url string
 * @param {Function} fn callback
 */
export const getRemoteJSON = function (url: string, fn: Function) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function () {
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
 * 倒计时
 * @param {Number} times 秒
 * @param {Function} callback
 * @param {Function} endCallBack
 */
type time = string | number;
export const countDown = (times: number, callback: Function, endCallBack: Function = () => {}): NodeJS.Timeout => {
    var timer: any = null;

    timer = setInterval(function () {
        let day: time = 0;
        let hour: time = 0;
        let minute: time = 0;
        let second: time = 0; //时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - day * 24;
            minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
            second = Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        const day2hour = day * 24 + hour;
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;

        //console.log(times, hour, minute, second);
        callback({ day, hour, minute, second, day2hour });
        times--;
        if (times <= 0) {
            clearInterval(timer);
            endCallBack();
        }
    }, 1000);
    return timer;
};
