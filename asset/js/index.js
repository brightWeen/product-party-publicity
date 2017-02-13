var $p0 = $("#p0"),
    $p1 = $("#p1"),
    $p2 = $("#p2"),
    $p3 = $("#p3");


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
            $loadingProgress.width(`${index / count * 100}%`);
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
    $p0.fadeIn(0);
    return imageLoader([
        '/asset/img/p1/bg.png?a=1',
        '/asset/img/p1/bg.png?a=2',
        '/asset/img/p1/bg.png?a=3',
        '/asset/img/p1/bg.png?a=4',
        '/asset/img/p1/bg.png?a=5'
    ]).then(function () {
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
    $p1.fadeIn().promise()
        .then(() => delay(1000))
        .then(() => { $text1.addClass("show"); return delay(1000); })
        .then(() => $btn.fadeIn());

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
    //星星随机闪烁-1
    $(".bg-animation .star").each(function () {
        $(this).css("animation-name", `star-${Math.random(2).toFixed(0)}`);
    });
    //星星随机闪烁-2
    $(".bg-animation .star-cross").each(function () {
        $(this).css("animation-name", `zoom-${Math.random(2).toFixed(0)}`);
    });
    //宇航员进场
    $("#p2 .astronaut")
        .css("transition-duration", "3s")
        .addClass("show");

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
        });

}
//场景3
var p3_animate = function () {
    var dfd = $.Deferred();
    $p3.fadeIn();
    var $aerolite1 = $p3.find("#aerolite1"),
        $aerolite2 = $p3.find("#aerolite2"),
        $aerolite3 = $p3.find("#aerolite3"),
        $aeroliteWrap = $p3.find(".aerolite-wrapper"),
        shadowAerolites = [];
    var durationTime = 2500;//陨石坠落速度
  
    //撞击到身上的陨石
    function createAerolite($aerolite, delayTime, hideTime) {
        $aerolite.css("animation-delay", `${delayTime}ms`)
            .css("animation-duration",`${durationTime}ms`) 
            .css("z-index", 110);

        var animation = function () {
            delay(delayTime + hideTime)
                .then(() => $aerolite.fadeOut())
                .then(() => delay(durationTime - delayTime - hideTime))
                .then(() => $aerolite.show());
        }
        setInterval(function () {
            animation();
        }, durationTime);
        animation();
    }
   createAerolite($aerolite1, 100, 0.55 * durationTime);
    createAerolite($aerolite2, 800, 0.39 * durationTime);
    createAerolite($aerolite3, 1600, 0.39 * durationTime);

    function createShadowAerolite(type, delay, top, left,opacity) {
        var $a = $("<div class='aerolite'></div>");
        $a.addClass(`a${type}`);
        $a.css("margin-top", `${top}%`);
        $a.css("margin-left", `${left}%`);
        $a.css("animation-delay", `${delay}ms`);
        $a.css("opacity", `${opacity}`);
        $a.css("animation-duration",`${durationTime}ms`);
        shadowAerolites.push($a);
    }
 


    createShadowAerolite(1, 200,-10,30,0.8);
    createShadowAerolite(1, 1500,-10,-70,0.6);

    createShadowAerolite(2, 500,-10,-50,0.4);

    createShadowAerolite(3, 200,20,0,0.8);
    createShadowAerolite(3, 2200,-10,-63,0.6);

    //createShadowAerolite(2, 2);
    //createShadowAerolite(3, 3);
    $aeroliteWrap.append(shadowAerolites);

}


//p3_animate();

p0_animate()
    .then(p1_animate)
    .then(p2_animate)
    .then(p3_animate);
