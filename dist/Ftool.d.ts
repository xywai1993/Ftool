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
 * @param {boolean} showEllipsis - 是否显示省略号
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
 *
 * 简易提示框
 */
export declare const Falert: (message: object | string) => void;
/**
 *
 * @param func 要执行的方法
 * @param wait  间隔时间
 * @param immediate  布尔值    true 间隔前执行   false 间隔后执行
 * @returns {Function}  返回要执行的方法
 */
export declare const debounce: (func: Function, wait: number, immediate: boolean) => (this: any) => Function;
/**
 *
 * @param d  日期时间戳或者日期字符串 2021-10-06
 * @param fmt   格式化  格式
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
export declare const countDown: (times: number, callback: Function, endCallBack?: Function) => any;
