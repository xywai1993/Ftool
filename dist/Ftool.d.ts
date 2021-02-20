/**
 * author yiper.fan
 */
export declare const IS_ANDROID: boolean;
export declare const IS_IOS: boolean;
export declare const IS_WECHAT: boolean;
export declare const IS_PC: boolean;
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
 *
 * 简易提示框
 */
export declare const Falert: (message: string | object) => void;
/**
 *
 * @param func 要执行的方法
 * @param wait  间隔时间
 * @param immediate  布尔值    true 间隔前执行   false 间隔后执行
 * @returns {Function}  返回要执行的方法
 */
export declare const debounce: (func: Function, wait: number, immediate: boolean) => (this: any) => Function;
/**
 * 获取滑动的方向
 * @param element  在哪个元素上
 * @param num   滑动的灵敏度 数字越低 灵敏度越高
 * @returns {object} {dir: null, isTouch: boolean}
 */
export declare const touchDirection: (element: Element, num: number) => dir;
/**
 * 简单的ajax  get 请求
 * @param {string} url string
 * @param {Function} fn callback
 */
export declare const getJSON: (url: string, fn: Function) => void;
export declare const formatDate: (date: any, fmt?: string) => string;
/**
 * 简单的post请求
 * @param url
 * @param data
 * @param fn
 */
export declare const postJSON: (url: string, data: object, fn: Function) => void;
/**
 * 提交error日志到服务器
 * 待优化
 */
export declare const postErrorLog: () => void;
