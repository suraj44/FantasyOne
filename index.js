var express = require('express');
var app = express();
var things = require('./things.js');
var path = require('path');
app.use(express.static(path.join(__dirname, 'views')));
app.use('/',things);

app.listen(3000);