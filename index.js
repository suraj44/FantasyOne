const express = require('express');
const app = express();
const routes = require('./lib/route.js');
const path = require('path');
app.use(express.static(path.join(__dirname, 'views')));
app.use('/',routes);
console.log("The connection is on localhost:3000");
app.listen(3000);