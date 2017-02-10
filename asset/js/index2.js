var $p0 = $("#p0"),
    $p1 = $("#p1"),
    $p2 = $("#p2"),
    $p3 = $("#p3");

var beginShow = function (el) {
    $(el).show();
}
var completeHide = function (el) {
    $(el).hide();
}

//图片加载进度
var imageLoader = function (urls, callback) {
    var deffreds = [],
        count = urls.length,
        index = 0,
        $loadingProgress = $("#loadingProgress");
    urls.forEach(function (url) {
        var img = new Image();
        $(img).on("load",function () {
            index += 1;
            $loadingProgress.width(`${index / count *100}%` );
        });
        img.src = url;
    });
}
var p1_animate = function () {
    imageLoader([
        '/asset/img/p1/bg.png?a=1',
        '/asset/img/p1/bg.png?a=2',
        '/asset/img/p1/bg.png?a=3',
        '/asset/img/p1/bg.png?a=4',
        '/asset/img/p1/bg.png?a=5'
        ]);
}
p1_animate();
var mySequence = [
    {
        e: $p0[0],
        p: { opacity: 1 },
        o: {
            duration: 1000,
            begin: beginShow,
            complete: completeHide
        }
    },
    {
        e: $p1[0],
        p: { opacity: 1 },
        o: {
            duration: 1000,
            begin: beginShow,
            complete: completeHide
        }
    },
    {
        e: $p2[0],
        p: { opacity: 1 },
        o: {
            duration: 1000,
            begin: beginShow,
            complete: completeHide
        }
    },
    {
        e: $p3[0],
        p: { opacity: 1 },
        o: {
            duration: 1000,
            begin: beginShow,
            complete: completeHide
        }
    }
];

//$.Velocity.RunSequence(mySequence);