/**
 * author yiper.fan
 */
export declare const IS_ANDROID: boolean;
export declare const IS_IOS: boolean;
export declare const IS_WECHAT: boolean;
export declare const IS_PC: boolean;
/********* string方法 **********/
/**
 * 获取URL的参数
 * @returns {string}
 */
export declare const getRequestParams: (key: string) => string | undefined;
/**
 * 获取字符串长度 汉字算两个
 * @param {string} val
 * @returns {number}
 */
export declare const getByteLen: (val: string) => number;
/**
 * 截取字符串 并添加...
 * @param {string} str 内容
 * @param {number} num 保留几个字符串，汉字算两个
 * @param {boolean} showEllipsis - 是否显示省略号 默认为true 显示
 */
export declare const truncationFont: (str: string, num: number, showEllipsis?: boolean) => string;
/**
 * 给URL添加查询字符串
 * @param {String} url
 * @param {Object} obj
 * @returns {string}
 */
export declare const setUrlQuery: (url: string, obj?: {
    [index: string]: any;
}) => string;
/********* string方法 end! **********/
/***** Array 相关 */
/**
 * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
 * @param value
 * @returns {boolean}
 */
export declare const isArray: (value: any) => boolean;
/**
 * 打乱数组元素
 *
 */
export declare const upset: (arr: any[]) => any[];
/******Array 相关 end */
/**
 * 复制文本
 * @param text 要复制的数据
 */
export declare const copy: (text: string) => Promise<unknown>;
/**
 *
 * 简易提示框
 */
export declare const Falert: (message: object | string) => void;
/**
 * toast提示
 * @param message
 * @param params
 * @returns
 */
export declare const Ftoast: (message: string, params?: {
    time?: number | undefined;
} | undefined) => Promise<unknown>;
/**
 *
 * @param func 要执行的方法
 * @param wait  间隔时间
 * @param immediate  布尔值    true 间隔前执行   false 间隔后执行
 * @returns {Function}  返回要执行的方法
 */
export declare const debounce: (func: Function, wait: number, immediate: boolean) => (this: any) => Function;
/**
 * 格式化日期
 * @param d  日期时间戳或者日期字符串 2021-10-06 ,时间戳为毫秒
 * @param {string} fmt   格式化的格式 默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string}  格式化后的时间
 */
export declare const formatDate: (d: string | number, fmt?: string) => string;
/**
 * 简单的post请求
 * @param url
 * @param data
 * @param fn
 */
export declare const postJSON: (url: string, data: object, fn: Function) => void;
/**
 * 获取JSON
 * @param {string} url string
 * @param {Function} fn callback
 */
export declare const getRemoteJSON: (url: string, fn: Function) => void;
/**
 * 倒计时
 * @param {Number} times 倒计时所剩的秒  ，注意不是日期，请自行计算所剩多少秒
 * @param {Function} callback
 * @param {Function} endCallBack
 */
declare type time = string | number;
declare type callbackData = {
    day: time;
    hour: time;
    minute: time;
    second: time;
    /**
     * eg: 1天2小时 ，则day2hour 返回 24+2 = 26
     */
    day2hour: time;
};
declare type callbackFn = (data: callbackData) => void;
export declare const countDown: (times: number, callback: callbackFn, endCallBack?: Function) => any;
export {};
