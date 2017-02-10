var app = new Vue({
    el: '#app',
    data: {
        imageLoaded: false,
        imageLoadInfo: {
            current: 0,
            count: 4
        },
        pageIndex: 0,
        pageCount: 4,
        pageCache: null,
        message: 'Hello Vue!',
        page1: {
            loaded: false,
            text: {
                text1: 800
            }
        },
        page2: { loaded: false },
        page3: { loaded: false },
        page4: { loaded: false }
    },
    computed: {

    },
    methods: {
        textShow: function () {

        },
        nextPage: function (time, cb) {
            setTimeout(function () {
                var curPage = this[`page${this.pageIndex}`];
                if (curPage) {
                    curPage.loaded = false;
                      for (var text in curPage.text) {
                        if (curPage.text.hasOwnProperty(text)) {
                             curPage.text[text] = true;
                        }
                    }
                }
                this.pageIndex += 1;
                curPage = this[`page${this.pageIndex}`];
                if (curPage) {
                    curPage.loaded = true;
                    for (var text in curPage.text) {
                        if (curPage.text.hasOwnProperty(text)) {
                            setTimeout(function () {
                                curPage.text[text] = false;
                            }, curPage.text[text])
                        }
                    }
                }
                cb && cb();
            }.bind(this), time);
        },
        init: function () {
            this.nextPage(200, function () {
                this.imageLoaded = true;
            }.bind(this));
        }
    }
});
app.init();