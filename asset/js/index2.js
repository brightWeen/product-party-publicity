var $p0 = $("#p0"),
    $p1 = $("#p1"),
    $p2 = $("#p2"),
    $p3 = $("#p3");


function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve()
        }, time)
    })
}




//图片加载进度
var imageLoader = function (urls) {
    return new Promise(function (resolve) {
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
                    resolve();
                }
            });
            img.src = url;
        });
    });
}

var p0_animate = function () {
    $p0.fadeIn(0);
    return imageLoader([
        '/asset/img/p1/bg.png?a=1',
        '/asset/img/p1/bg.png?a=2',
        '/asset/img/p1/bg.png?a=3',
        '/asset/img/p1/bg.png?a=4',
        '/asset/img/p1/bg.png?a=5'
    ]).then(function () {
        //延迟1s
        return delay(1000)
            .then(function () {
                return $p0.fadeOut().promise();
            });
    });;
}
var p1_animate = function () {
    $p1.fadeIn();
    return new Promise(function (resolve) {
        $("#p1-btn,#p1-btn-text").one("click", function () {
            $p1.fadeOut().promise().then(resolve);
        });
    });
}

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



p0_animate()
    .then(p1_animate)
    .then(p2_animate);