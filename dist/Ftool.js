/**
 * author yiper.fan
 */
const ua = navigator.userAgent.toUpperCase();
const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
export const IS_ANDROID = ua.indexOf('ANDROID') !== -1;
export const IS_IOS = ua.indexOf('IPHONE OS') !== -1;
export const IS_WECHAT = ua.indexOf('MICROMESSENGER') !== -1;
export const IS_PC = !Agents.some((item) => ua.indexOf(item.toUpperCase()) > 0);
/**
 * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
 * @param value
 * @returns {boolean}
 */
export const isArray = function (value) {
    return Object.prototype.toString.call(value) == '[object Array]';
};
/**
 * 打乱数组元素
 *
 */
export const upset = function (arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
};
/**
 * 获取URL的参数
 * @returns {string}
 */
export const getRequestParams = function (key) {
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
export const getByteLen = (val) => {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
        const length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 1;
        }
        else {
            len += 2;
        }
    }
    return len;
};
/**
 *
 * 简易提示框
 */
export const Falert = function (message) {
    const dom = document.querySelector('#toolAlert');
    const debugDom = dom ? dom : createAlertDom();
    console.log(debugDom);
    debugDom.style.display = 'block';
    const messageDom = document.querySelector('#toolmessage');
    messageDom.innerHTML = typeof message === typeof {} ? JSON.stringify(message) : message;
    //debugDom.appendChild(messageDom);
    function createAlertDom() {
        let dom = document.createElement('div');
        dom.id = 'toolAlert';
        dom.style.cssText = 'display:none;background:rgba(0,0,0,.5);height:100%;width:100%;overflow:auto;position:fixed;left:0;top:0;z-index:99999';
        dom.innerHTML = `
            <div style="width: 88%;margin: 45% auto 0;background:#eeeeee;border-radius: 10px;">
                <h4 id="toolmessage" style="padding: 20px 3px;text-align: center;word-break:break-all;"></h4>
                <p style="text-align: center;padding: 10px 0;border-top:1px solid #a7a7de;">好</p>
            </div>    
		`;
        const ElementBody = document.querySelector('body');
        ElementBody.appendChild(dom);
        dom.addEventListener('click', function (ev) {
            if (ev.target.nodeName.toUpperCase() === 'P') {
                dom.style.display = 'none';
            }
        }, false);
        dom.addEventListener('touchmove', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        }, false);
        //dom.innerHTML = message;
        return dom;
    }
};
/**
 * 在页面中开一个控制台，打印调试信息
 * @param message  打印字符
 * @param {array} host - host列表，在此列表中的不会打印出log，可用于防止线上环境出现控制台
 */
const host = [];
const debuglog = function (message) {
    const arr = host;
    if (arr.indexOf(location.host) !== -1) {
        return;
    }
    const dom = document.querySelector('#debugDom');
    const debugDom = dom ? dom : creatDom();
    class CreatMessage {
        constructor(message) {
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
        const ElementBody = document.querySelector('body');
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
export const debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        var last = new Date().getTime() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;
        console.log(timeout);
        if (!timeout)
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};
/**
 * 简单的ajax  get 请求
 * @param {string} url string
 * @param {Function} fn callback
 */
export const getJSON = function (url, fn) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Success!
            let data = JSON.parse(request.responseText);
            fn(data);
        }
        else {
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
 * @param d  日期时间戳或者日期字符串 2021-10-06
 * @param fmt   格式化  格式
 * @returns {string}  格式化后的时间
 */
export const formatDate = function (d, fmt = 'YYYY-MM-DD HH:mm:ss') {
    let date = new Date();
    if (typeof d === 'string') {
        date = new Date(d.replace(/-/g, '/'));
    }
    if (typeof d === 'number') {
        date = new Date(date);
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    var week = {
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
export const postJSON = function (url, data, fn) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Success!
            let data = JSON.parse(request.responseText);
            fn(data);
        }
        else {
            // We reached our target server, but it returned an error
        }
    };
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
    //request.onerror = function() {
    //    // There was a connection error of some sort
    //};
};
