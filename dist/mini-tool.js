/**
 * 此文件用于小程序
 */
// const ua = navigator?.userAgent.toUpperCase();
// const Agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
// export const IS_ANDROID = ua.indexOf('ANDROID') !== -1;
// export const IS_IOS = ua.indexOf('IPHONE OS') !== -1;
// export const IS_WECHAT = ua.indexOf('MICROMESSENGER') !== -1;
// export const IS_PC = !Agents.some((item) => ua.indexOf(item.toUpperCase()) > 0);
/********* string方法 **********/
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
 * 截取字符串 并添加...
 * @param {string} str 内容
 * @param {number} num 保留几个字符串，汉字算两个
 * @param {boolean} showEllipsis - 是否显示省略号 默认为true 显示
 */
export const truncationFont = function (str, num, showEllipsis = true) {
    if (!str) {
        return str;
    }
    let s = '';
    for (let i of str) {
        s += i;
        if (getByteLen(s) >= num) {
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
export const setUrlQuery = function (url, obj = {}) {
    let p = [];
    for (let key in obj) {
        p.push(`${key}=${obj[key]}`);
    }
    return `${url}?${p.join('&')}`;
};
/**
 * 复制文本
 * @param text 要复制的数据
 */
export const copy = (text) => {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    // input.value = text;
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    input.select();
    console.log(document.execCommand('copy'), 'document.execCommand');
    return new Promise((resolve, rejects) => {
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            document.body.removeChild(input);
            resolve(text);
        }
        else {
            rejects('当前环境不支持复制功能');
        }
    });
};
/********* string方法 end! **********/
/***** Array 相关 */
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
/******Array 相关 end */
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
 * 格式化日期
 * @param d  日期时间戳或者日期字符串 2021-10-06 ,时间戳为毫秒
 * @param {string} fmt   格式化的格式 默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string}  格式化后的时间
 */
export const formatDate = function (d, fmt = 'YYYY-MM-DD HH:mm:ss') {
    let date = new Date();
    if (typeof d === 'string') {
        date = new Date(d.replace(/-/g, '/'));
    }
    else if (typeof d === 'number') {
        date = new Date(d);
    }
    else {
        console.warn('日期参数不合法');
        return '1992-11-25 11:11:11';
    }
    var o = {
        // 'Y+':date.getFullYear(),
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
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
        // fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        const re = /(Y+)/;
        const match = fmt.match(re);
        if (match) {
            fmt = fmt.replace(re, String(date.getFullYear()).substr(4 - match[0].length));
        }
    }
    for (var k in o) {
        // if (new RegExp('(' + k + ')').test(fmt)) {
        //     fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length));
        // }
        const re = new RegExp(`${k}`);
        // const match = fmt.match(re);
        fmt = fmt.replace(re, o[k] < 10 ? `0${o[k]}` : o[k]);
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
};
/**
 * 获取JSON
 * @param {string} url string
 * @param {Function} fn callback
 */
export const getRemoteJSON = function (url, fn) {
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
export const countDown = (times, callback, endCallBack = () => { }) => {
    var timer = null;
    timer = setInterval(function () {
        let day = 0;
        let hour = 0;
        let minute = 0;
        let second = 0; //时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - day * 24;
            minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
            second = Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        const day2hour = day * 24 + hour;
        if (day <= 9)
            day = '0' + day;
        if (hour <= 9)
            hour = '0' + hour;
        if (minute <= 9)
            minute = '0' + minute;
        if (second <= 9)
            second = '0' + second;
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
