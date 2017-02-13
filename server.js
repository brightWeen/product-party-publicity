var koa = require('koa');
var serve = require('koa-static');

/*
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'CF0XJDfGyvEX5XzlO8yCFVVE-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'PuiEvdELfIV7TQJS0cXHHteT',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'q2fwobEVSxJMD5khLJq9wsxH'
});
 */
var app = koa();
//app.use(require('koa-static')(root, opts));
app.use(serve('asset'));
app.use(serve('.'));
//app.use(AV.koa());
app.listen(process.env.LEANCLOUD_APP_PORT||8080);