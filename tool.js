
;(function(window){
    window.Ftool={} ;

    var ua = navigator.userAgent.toUpperCase() ;
    Ftool.IS_ANDROID = ua.indexOf('ANDROID') != -1 ;

    Ftool.IS_IOS = ua.indexOf('IPHONE OS') != -1 ;

    Ftool.IS_WECHAT = ua.indexOf('MICROMESSENGER') != -1;

    Ftool.IS_PC=function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }();

    Ftool = {
        /**
         * 判断值是否是数组 ，详细参考javascript高级程序设计第三版597页。
         * @param value
         * @returns {boolean}
         */
        isArray:function(value){
            return Object.prototype.toString.call(value) == "[object Array]" ;
        },
    	/**
		 * 打乱数组元素
         *
         */
    	upset:	function(arr){
    		return arr.sort(function() { Math.random() - 0.5 })
        },
        /**
         * 获取UR了参数
         * @returns {}
         */
        getRequest: function (key) {
            var search = location.search.slice(1); //得到get方式提交的查询字符串
            var arr = search.split("&");
            for (var i = 0; i < arr.length; i++) {
                var ar = arr[i].split("=");
                if (ar[0] == key) {
                    return ar[1];
                }
            }
        }
    };


   // Ftool.IS_TXT = ua.indexOf('PATXT') != -1;

    /**
     * 获取滑动的方向
     * @param element  在哪个元素上
     * @param num   滑动的灵敏度 数字越低 灵敏度越高
     * @returns {dir: null, isTouch: boolean}
     */
    Ftool.touchDirection=function(element,num){
        var startX= 0,
            startY= 0,
            endX =0,
            endY =0 ,
            dir = {dir:null,isTouch:false};
            oNum = num || 30 ;
        element.addEventListener('touchstart',function(event){
            dir.isTouch = false;
            //event.preventDefault();
            var touch = event.targetTouches[0] ;
            startX = touch.pageX ;
            startY = touch.pageY;
        },false);

        element.addEventListener('touchmove',function(event){
            dir.isTouch = true;
            //event.preventDefault();
            var touch = event.targetTouches[0] ;
            endX = touch.pageX ;
            endY = touch.pageY;
            // console.log(startX,startY)
        },false);

        element.addEventListener('touchend',function(event){

            //event.preventDefault();
            var touchX = endX - startX ,
                touchY = endY - startY;

            if(Math.abs(touchX)>Math.abs(touchY)){
                if(touchX<-oNum){
                    // console.log('向左')
                    dir.dir = 'left' ;
                }else  if(touchX>oNum){
                    // console.log('向右')
                    dir.dir = 'right' ;
                }
            }else{
                if(touchY<-oNum){
                    // console.log('向上');
                    dir.dir = 'top' ;
                }
                if(touchY>oNum){
                    // console.log('向下') ;
                    dir.dir = 'bottom' ;
                }
            }
        },false);
        return dir ;
    };

    /**
     * 简单的ajax  get 请求
     * @param url string
     * @param fn callback
     */
    Ftool.getJSON=function(url,fn){

        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onreadystatechange = function() {
            if (request.readyState==4 && request.status==200) {
                // Success!
                var data = JSON.parse(request.responseText);
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
     * time:2015年12月10日14:31:15
     * version: 0.1.2
     *
     *
     * Update time：2015年5月8日16:31:50
     * 全屏阴影模块
     * option：
     * {
     *  id: '' ,       //id
     *  click: true , // 点击是否取消  ,默认false
     *  csstext : ''  // css ,
     *
     *  onOpen:function(){},
     *  onClose:function(){}
     * }
     *
     * @param option
     * @constructor
     * .js-shadow{ position:absolute;left:0;top:0;width:100%; background:rgba(0,0,0,.4); z-index: 100;}
     */

    function Shadow(parse) {
        var self = this;

        self.option = {
            id: '',
            cssText: '',
            click: false,
            onOpen: function () {
            },
            onClose: function () {
            }
        };

        for (var i in parse) {
            self.option[i] = parse[i];
        }

        self.shadow = document.createElement('div');
        self.in = false;
        //设置id 供外部使用
        self.shadow.id = self.option.id;

        // 设置 样式
        //self.shadow.className = 'js-shadow' ;
        self.shadow.style.cssText = 'position:absolute;left:0;top:0;width:100%; background:rgba(0,0,0,.4); z-index: 100;' + self.option.csstext;
        self.shadow.style.height = document.body.scrollHeight + 'px';

        // 设置是否 点击关闭
        if (self.option.click) {
            self.shadow.onclick = function () {
                document.body.removeChild(self.shadow);
                self.in = false;
            }
        }
        //监听onclick 事件
        self.shadow.addEventListener('click', function () {
            if (self.option.click) {
                self.option.onClose()
            }
        }, false)

    }

    Shadow.prototype.open = function (callback) {
        var self = this;
        document.body.appendChild(self.shadow);
        self.in = true;
        if (callback) {
            callback();
        } else {
            self.option.onOpen()
        }
    };
    Shadow.prototype.close = function (callback) {
        var self = this;
        if (self.in) {
            document.body.removeChild(self.shadow);
            self.in = false;
        }
        if (callback) {
            callback();
        } else {
            self.option.onClose()
        }

    };

    /**
     * 显示当前字符数 以及控制最大输入字符
     * @param input  输入框  id
     * @param target  显示当前字符数的容器  id
     * @param max   最大字符数 number
     * @constructor
     */
    function MaxLength(input, target, max) {

        var input = this.input = document.getElementById(input),
         target = this.target = document.getElementById(target),
         max = this.max = max;

        input.addEventListener('focus', function () {
            var self = this;
            document.addEventListener('keyup', function () {

                if (self.value.length > max) {
                    self.value = self.value.substr(0, max);
                    return
                }
                target.innerText = '' + self.value.length + '/' + max;
            });
        });
    }


})(window);

