var express = require('express');
var compression = require('compression')

var app = express();

 
app.use(compression( ))

 
app.use('/asset', express.static('asset'));
app.use('/', express.static('./'));


app.listen(process.env.LEANCLOUD_APP_PORT || 8080);
