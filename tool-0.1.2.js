/**
time:2014年12月12日14:03:08
*/
;(function(window){
    window.Ftool={} ;

    var ua = navigator.userAgent.toUpperCase() ;
    Ftool.IS_ANDROID = ua.indexOf('ANDROID') != -1 ;

    Ftool.IS_IOS = ua.indexOf('IPHONE OS') != -1 ;

    Ftool.IS_WECHAT = ua.indexOf('MICROMESSENGER') != -1; 



    Ftool = { 

    	/**
		 * 打乱数组元素
		 *	
    	*/ 

    	upset:	function(arr){
    		return arr.sort(function() { Math.random() - 0.5 })
    	}
    } 


   // Ftool.IS_TXT = ua.indexOf('PATXT') != -1;

    /**
     * 获取滑动的方向
     * @param element  在哪个元素上
     * @param num   滑动的灵敏度 数字越低 灵敏度越高
     * @returns {{dir: null, isTouch: boolean}}
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

    

   

})(window);

