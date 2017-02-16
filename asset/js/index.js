var $p0 = $("#p0"),
    $p1 = $("#p1"),
    $p2 = $("#p2"),
    $p3 = $("#p3"),
    $p4 = $("#p4");


function delay(time) {
    var dfd = $.Deferred();
    setTimeout(function () {
        dfd.resolve();
    }, time);
    return dfd;
}

//图片加载进度
var imageLoader = function (urls) {
    var dfd = $.Deferred();
    var deffreds = [],
        count = urls.length,
        index = 0,
        $loadingProgress = $("#loadingProgress");
    urls.forEach(function (url) {
        var img = new Image();
        $(img).on("load", function () {
            index += 1;
            var i = index > 1 ? index - 1 : 0;
            $loadingProgress.width(`${i / count * 100}%`);
            if (index === count) {
                dfd.resolve();
            }
        });
        img.src = url;
    });
    return dfd;

}
//场景0（加载等待）
var p0_animate = function () {
    //$p0.fadeIn(0);
    return imageLoader([
        "/asset/img/p1/bg.png",
        "/asset/img/p1/light.png",
        "/asset/img/p2/astronaut.gif",
        "/asset/img/p2/ball2.png",
        "/asset/img/p2/ball3.png",
        "/asset/img/p2/ball4.png",
        "/asset/img/p2/star.png",
        "/asset/img/p2/star-x.png",
        "/asset/img/p2/ball1.png",
        "/asset/img/p2/star-blue.png",
        "/asset/img/p2/star-red.png",
        "/asset/img/p3/astronaut.gif",
        "/asset/img/p3/aerolite1.png",
        "/asset/img/p3/aerolite2.png",
        "/asset/img/p3/aerolite3.png",
        "/asset/img/p4/ufo.png",
        "/asset/img/p4/logo.png",
        "/asset/img/p4/planet1.png",
        "/asset/img/p4/planet2.png",
        "/asset/img/p4/astronaut.png",
        "/asset/img/p4/planet-bottom.png",
        "/asset/img/p4/earth.png"
    ]).then(function () {

        //星星随机闪烁-1
        $(".star").each(function () {
            $(this).css("animation-name", `star-${Math.random(2).toFixed(0)}`);
        });
        //星星随机闪烁-2
        $(".star-cross").each(function () {
            $(this).css("animation-name", `zoom-${Math.random(2).toFixed(0)}`);
        });


        //延迟3s
        return delay(1000)
            .then(function () {
                return $p0.fadeOut().promise();
            });
    });;
}
//场景1
var p1_animate = function () {
    var $text1 = $p1.find(".text1"),
        $btn = $("#p1-btn,#p1-btn-text"),
        dfd = $.Deferred();
    $btn.hide();
    $p1.addClass("ready");
    $p1.fadeIn().promise()
        .then(function () { return delay(1000) })
        .then(function () { $text1.addClass("show"); return delay(1000); })
        .then(function () { $btn.fadeIn() });

    $btn.one("click", function () {
        $text1.addClass("hide")
            .removeClass("show");
        delay(100)
            .then($p1.fadeOut().promise())
            .then(dfd.resolve);
    });

    return dfd;

}
//场景2
var p2_animate = function () {
    //入场时间 10s
    $p2.fadeIn();

    //宇航员进场
    $("#p2 .astronaut")
        .css("transition-duration", "3s")
        .addClass("show")
        .addClass("ready");

    //三秒后背景开始滚动
    $("#p2 .bg-animation")
        .css("transition-delay", "3s")
        .css("transition-duration", `${10}s`)
        .addClass("next");

    //文字1
    return delay(100)
        .then(function () {
            $p2.find(".text1")
                .addClass("show");
            return delay(1000 * 4);
        })
        .then(function () {
            $p2.find(".text1")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            //文字二 14s
            return delay(200);
        })
        .then(function () {
            $p2.find(".text2")
                .addClass("show");
            return delay(1000 * 5);
        })
        .then(function () {
            $p2.find(".text2")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            //文字三 20s
            return delay(200);
        })
        .then(function () {
            $p2.find(".text3")
                .addClass("show");
            return delay(1000 * 5);
        })
        .then(function () {
            $p2.find(".text3")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            return $p2.fadeOut().promise();
        });

}
//场景3
var p3_animate = function () {
    $p3.fadeIn();
    var $aerolite1 = $p3.find("#aerolite1"),
        $aerolite2 = $p3.find("#aerolite2"),
        $aerolite3 = $p3.find("#aerolite3"),
        $aeroliteWrap = $p3.find(".aerolite-wrapper"),
        shadowAerolites = [];
    var durationTime = 2500;//陨石坠落速度

    $p3.find(".astronaut").addClass("ready");
    //撞击到身上的陨石
    function createAerolite($aerolite, delayTime, hideTime) {
        $aerolite.css("animation-delay", `${delayTime}ms`)
            .css("animation-duration", `${durationTime}ms`)
            .css("z-index", 110);

        var animation = function () {
            delay(delayTime + hideTime)
                .then(function () {
                    $aerolite.fadeOut(250).promise();
                    return delay(durationTime - delayTime - hideTime);
                })
                .then(function () { $aerolite.show(); });
        }
        setInterval(function () {
            animation();
        }, durationTime);
        animation();
    }
    //初始化陨石（前景）
    createAerolite($aerolite1, 100, 0.55 * durationTime);
    createAerolite($aerolite2, 800, 0.39 * durationTime);
    createAerolite($aerolite3, 1600, 0.39 * durationTime);
    //从背后穿过的陨石
    function createShadowAerolite(type, delay, top, left, opacity) {
        var $a = $("<div class='aerolite'></div>");
        $a.addClass(`a${type}`);
        $a.css("margin-top", `${top}%`);
        $a.css("margin-left", `${left}%`);
        $a.css("animation-delay", `${delay}ms`);
        $a.css("opacity", `${opacity}`);
        $a.css("animation-duration", `${durationTime}ms`);
        shadowAerolites.push($a);
    }


    //初始化从陨石（背景)
    createShadowAerolite(1, 200, -10, 30, 0.8);
    createShadowAerolite(1, 1500, -10, -70, 0.6);
    createShadowAerolite(2, 500, -10, -50, 0.4);
    createShadowAerolite(3, 200, 20, 0, 0.8);
    createShadowAerolite(3, 2200, -10, -63, 0.6);
    //添加陨石（背景）到容器
    $aeroliteWrap.append(shadowAerolites);

    //文字
    return delay(100)
        .then(function () {
            $p3.find(".text1")
                .addClass("show");
            return delay(1000 * 3);
        })
        .then(function () {
            $p3.find(".text1")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            $p3.find(".text2")
                .addClass("show");
            return delay(1000 * 3);
        })
        .then(function () {
            $p3.find(".text2")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            $p3.find(".text3")
                .addClass("show");
            return delay(1000 * 3);
        })
        .then(function () {
            $p3.find(".text3")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            return $p3.fadeOut().promise();
        });

}

var p4_animate = function () {
    $p4.fadeIn();
    //star_toolbar($p4);
    $("#p4-btn,#p4-btn-text").click(function () {
        alert("还在准备中...");
    });
    //添加宇航员
    var $astronaut = $p4.find(".astronaut");
    var astronautZIndex = 100;
    var createAstronaut = function (offset) {
        var $clone = $astronaut.clone();
        $clone.css("transform", `translate(${offset.left}rem,${offset.top}rem)scale(${offset.zoom || 1})`);
        astronautZIndex += 1;
        $clone.css("z-index", astronautZIndex);
        $clone.hide();
        $p4.find(".bg1").append($clone);
        return function () {
            return delay(500)
                .then(function () { return $clone.fadeIn(300).promise(); })
        }
    }
    //挨个添加宇航员
    delay(0)
        .then(function () { return $astronaut.fadeIn().promise(); })
        .then(createAstronaut({ left: '-1.4', top: '0.3', zoom: 0.9 }))//left 1
        .then(createAstronaut({ left: '1.4', top: '0.8', zoom: 0.9 }))//right 1
        .then(createAstronaut({ left: '-2.5', top: '1', zoom: 0.9 }))//left 2
        .then(createAstronaut({ left: '3', top: '1.2', zoom: 0.9 }))//left 2
        .then(createAstronaut({ left: '0.3', top: '1', zoom: 0.9 }))//center 2


    //三秒后背景开始滚动
    $p4.find('.bg-animation')
        .css("transition-delay", "3s")
        .css("transition-duration", `${12}s`)
        .addClass("next");


    delay(1000)
        .then(function () {
            $p4.find(".text1")
                .addClass("show");
            return delay(1000 * 3);
        })
        .then(function () {
            $p4.find(".text1")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            $p4.find(".text2")
                .addClass("show");
            return delay(1000 * 2.5);
        })
        .then(function () {
            $p4.find(".text2")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            //文字三 20s
            return delay(200);
        })
        .then(function () {
            $p4.find(".text3")
                .addClass("show");
            return delay(1000 * 2.5);
        })
        .then(function () {
            $p4.find(".text3")
                .removeClass("show")
                .addClass("hide");
            return delay(200);
        })
        .then(function () {
            //文字三 20s
            return delay(5000);
        })
        .then(function () {
            //logo 下文字
            $p4.find(".text4")
                .addClass("show");
            return delay(1000 * 1.5);
        })
        .then(function () {
            $("#p4-btn,#p4-btn-text").fadeIn();
        })

}

var star_toolbar = function ($p) {
    var $toolbar = $(".star-toolbar"),
        $container = $p.find(".star-container:first"),
        $sel = $("#selStar"),
        $btn = $("#btnStar");
    $toolbar.show();
    $btn.click(function () {
        if ($container.length) {
            $container.append(`<div class="${$sel.val()}" style="left:10%;top:10%"></div>`);
        }
        $container.find("div").draggable({
            containment: 'parent',
            stop: function () {
                var l = (100 * parseFloat($(this).position().left / parseFloat($(this).parent().width()))) + "%";
                var t = (100 * parseFloat($(this).position().top / parseFloat($(this).parent().height()))) + "%";
                $(this).css("left", l);
                $(this).css("top", t);
            },
            addClasses: false
        });
    });

}
//p4_animate();
//p4_animate();
 
p0_animate()
    .then(p1_animate)
    .then(p2_animate)
    .then(p3_animate)
    .then(p4_animate);
/* */