const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./lib/route.js'); 
const driver_routes = require('./drivers/driver-route.js')
const admin_routes = require('./admin/routes.js')
const user_routes = require('./user/routes.js')
const path = require('path');
const stylus = require('stylus')
const nib = require('nib')
const SECRET_KEY = '\xd6\xca\xbb\xa7u\xaa\x8a\xec\xf4\xb4#\xdf'
const session = require('express-session')

app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')



// Fix directories for static files
app.use("/lib", express.static(__dirname + '/templates/lib'));
app.use("/img", express.static(__dirname + '/templates/img'));
app.use("/css", express.static(__dirname + '/templates/css'));
app.use("/js", express.static(__dirname + '/templates/js'));


  
app.use(express.static('public'))
app.use(session({secret: SECRET_KEY, resave :false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/',routes);
app.use('/drivers', driver_routes)
app.use('/admin', admin_routes)
app.use('/user', user_routes)

console.log("The connection is on localhost:3000");
app.listen(3000);