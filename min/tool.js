!function (a) {
    function c(a) {
        var c = this;
        c.option = {
            id: "", cssText: "", click: !1, onOpen: function () {
            }, onClose: function () {
            }
        };
        for (var i in a)c.option[i] = a[i];
        c.shadow = document.createElement("div"), c.in = !1, c.shadow.id = c.option.id, c.shadow.style.cssText = "position:absolute;left:0;top:0;width:100%; background:rgba(0,0,0,.4); z-index: 100;" + c.option.csstext, c.shadow.style.height = document.body.scrollHeight + "px", c.option.click && (c.shadow.onclick = function () {
            document.body.removeChild(c.shadow), c.in = !1
        }), c.shadow.addEventListener("click", function () {
            c.option.click && c.option.onClose()
        }, !1)
    }

    a.Ftool = {};
    var h = navigator.userAgent.toUpperCase();
    Ftool.IS_ANDROID = -1 != h.indexOf("ANDROID"), Ftool.IS_IOS = -1 != h.indexOf("IPHONE OS"), Ftool.IS_WECHAT = -1 != h.indexOf("MICROMESSENGER"), Ftool = {
        upset: function (a) {
            return a.sort(function () {
                Math.random() - .5
            })
        }, getRequest: function (a) {
            for (var c = location.search.slice(1), h = c.split("&"), i = 0; i < h.length; i++) {
                var v = h[i].split("=");
                if (v[0] == a)return v[1]
            }
        }
    }, Ftool.touchDirection = function (a, c) {
        var h = 0, v = 0, g = 0, w = 0, O = {dir: null, isTouch: !1};
        return oNum = c || 30, a.addEventListener("touchstart", function (a) {
            O.isTouch = !1;
            var c = a.targetTouches[0];
            h = c.pageX, v = c.pageY
        }, !1), a.addEventListener("touchmove", function (a) {
            O.isTouch = !0;
            var c = a.targetTouches[0];
            g = c.pageX, w = c.pageY
        }, !1), a.addEventListener("touchend", function () {
            var a = g - h, c = w - v;
            Math.abs(a) > Math.abs(c) ? -oNum > a ? O.dir = "left" : a > oNum && (O.dir = "right") : (-oNum > c && (O.dir = "top"), c > oNum && (O.dir = "bottom"))
        }, !1), O
    }, Ftool.getJSON = function (a, c) {
        var h = new XMLHttpRequest;
        h.open("GET", a, !0), h.onreadystatechange = function () {
            if (4 == h.readyState && 200 == h.status) {
                var a = JSON.parse(h.responseText);
                c(a)
            }
        }, h.send()
    }, c.prototype.open = function (a) {
        var c = this;
        document.body.appendChild(c.shadow), c.in = !0, a ? a() : c.option.onOpen()
    }, c.prototype.close = function (a) {
        var c = this;
        c.in && (document.body.removeChild(c.shadow), c.in = !1), a ? a() : c.option.onClose()
    }
}(window);