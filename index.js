const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./lib/route.js'); 
const driver_routes = require('./drivers/driver-route.js')
const admin_routes = require('./admin/routes.js')
const path = require('path');
const stylus = require('stylus')
const nib = require('nib')

app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')


function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/',routes);
app.use('/drivers', driver_routes)
app.use('/admin', admin_routes)
console.log("The connection is on localhost:3000");
app.listen(3000);