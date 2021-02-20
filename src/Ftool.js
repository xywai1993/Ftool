"use strict";
/**
 * author yiper.fan
 */
exports.__esModule = true;
exports.postErrorLog = exports.postJSON = exports.formatDate = exports.getJSON = exports.debounce = exports.Falert = exports.getByteLen = exports.getRequestParams = exports.upset = exports.isArray = exports.IS_PC = exports.IS_WECHAT = exports.IS_IOS = exports.IS_ANDROID = void 0;
var ua = navigator.userAgent.toUpperCase();
var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
exports.IS_ANDROID = ua.indexOf('ANDROID') !== -1;
exports.IS_IOS = ua.indexOf('IPHONE OS') !== -1;
exports.IS_WECHAT = ua.indexOf('MICROMESSENGER') !== -1;
exports.IS_PC = !Agents.some(function (item) { return ua.indexOf(item.toUpperCase()) > 0; });
/**
 * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
 * @param value
 * @returns {boolean}
 */
var isArray = function (value) {
    return Object.prototype.toString.call(value) == '[object Array]';
};
exports.isArray = isArray;
/**
 * 打乱数组元素
 *
 */
var upset = function (arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
};
exports.upset = upset;
/**
 * 获取URL的参数
 * @returns {string}
 */
var getRequestParams = function (key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split('&');
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split('=');
        if (ar[0] == key) {
            return ar[1];
        }
    }
};
exports.getRequestParams = getRequestParams;
/**
 * 获取字符串长度 汉字算两个
 * @param {string} val
 * @returns {number}
 */
var getByteLen = function (val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var length_1 = val.charCodeAt(i);
        if (length_1 >= 0 && length_1 <= 128) {
            len += 1;
        }
        else {
            len += 2;
        }
    }
    return len;
};
exports.getByteLen = getByteLen;
/**
 *
 * 简易提示框
 */
var Falert = function (message) {
    var dom = document.querySelector('#toolAlert');
    var debugDom = dom ? dom : createAlertDom();
    console.log(debugDom);
    debugDom.style.display = 'block';
    var messageDom = document.querySelector('#toolmessage');
    messageDom.innerHTML = typeof message === typeof {} ? JSON.stringify(message) : message;
    //debugDom.appendChild(messageDom);
    function createAlertDom() {
        var dom = document.createElement('div');
        dom.id = 'toolAlert';
        dom.style.cssText = 'display:none;background:rgba(0,0,0,.5);height:100%;width:100%;overflow:auto;position:fixed;left:0;top:0;z-index:99999';
        dom.innerHTML = "\n            <div style=\"width: 88%;margin: 45% auto 0;background:#eeeeee;border-radius: 10px;\">\n                <h4 id=\"toolmessage\" style=\"padding: 20px 3px;text-align: center;word-break:break-all;\"></h4>\n                <p style=\"text-align: center;padding: 10px 0;border-top:1px solid #a7a7de;\">\u597D</p>\n            </div>    \n\t\t";
        var ElementBody = document.querySelector('body');
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
exports.Falert = Falert;
/**
 * 在页面中开一个控制台，打印调试信息
 * @param message  打印字符
 * @param {array} host - host列表，在此列表中的不会打印出log，可用于防止线上环境出现控制台
 */
var host = [];
var debuglog = function (message) {
    var arr = host;
    if (arr.indexOf(location.host) !== -1) {
        return;
    }
    var dom = document.querySelector('#debugDom');
    var debugDom = dom ? dom : creatDom();
    var CreatMessage = /** @class */ (function () {
        function CreatMessage(message) {
            this.messageDom = document.createElement('div');
            this.message = typeof message === typeof {} ? JSON.stringify(message) : message;
            this.messageDom.style.cssText = ' word-wrap:break-word';
            this.messageDom.innerHTML = this.message;
            debugDom.appendChild(this.messageDom);
        }
        return CreatMessage;
    }());
    function creatDom() {
        var dom = document.createElement('div');
        dom.id = 'debugDom';
        dom.style.cssText = 'background:#000;color:#ffffff;width:100%;height:300px;overflow:auto; word-wrap:break-word';
        var ElementBody = document.querySelector('body');
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
var debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        console.log(1111, new Date().getTime(), timestamp);
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
exports.debounce = debounce;
/**
 * 简单的ajax  get 请求
 * @param {string} url string
 * @param {Function} fn callback
 */
var getJSON = function (url, fn) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Success!
            var data = JSON.parse(request.responseText);
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
exports.getJSON = getJSON;
var formatDate = function (date, fmt) {
    if (fmt === void 0) { fmt = 'YYYY-MM-DD HH:mm:ss'; }
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'));
    }
    if (typeof date === 'number') {
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
        S: date.getMilliseconds()
    };
    var week = {
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
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
exports.formatDate = formatDate;
/**
 * 简单的post请求
 * @param url
 * @param data
 * @param fn
 */
var postJSON = function (url, data, fn) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // Success!
            var data_1 = JSON.parse(request.responseText);
            fn(data_1);
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
exports.postJSON = postJSON;
/**
 * 提交error日志到服务器
 * 待优化
 * @param url 提交的日志地址  "//api.fanep.cn/api/error-log";
 */
var postErrorLog = function (url) {
    if (url === void 0) { url = '//api.fanep.cn/api/error-log'; }
    var ua = window.navigator.userAgent;
    var host = location.href;
    var postFn = function (data) {
        if (window.fetch) {
            fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(data)
            });
        }
        else {
            exports.postJSON(url, data, function () { });
        }
    };
    postFn({ ua: ua, text: '加载成功', host: host });
    window.onerror = function (e) {
        postFn({ ua: ua, text: e, host: host });
    };
};
exports.postErrorLog = postErrorLog;
