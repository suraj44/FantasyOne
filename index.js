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
const session = require('express-session');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;


const appDir = path.dirname(require.main.filename);
global.document = document;
var $ = require("jquery")(window);


app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')



// Fix directories for static files
app.use("/home-page", express.static(__dirname + '/templates/home-page'));
app.use("/form", express.static(__dirname + '/templates/form'));
app.use("/driver-img", express.static(__dirname + '/templates/driver/img'));
app.use("/admin-dash", express.static(__dirname + '/templates/admin-dash'));
app.use("/user-dash", express.static(__dirname + '/templates/user-dash'));
app.use("/error", express.static(__dirname + '/templates/error'));


  
app.use(session({secret: SECRET_KEY, resave :false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/',routes);
app.use('/drivers', driver_routes)
app.use('/admin', admin_routes)
app.use('/user', user_routes)
app.use(function(req, res, next){

    message = "We are sorry, Page not found!"
    desc = "The page you are looking for might have been removed had its name changed or is temporarily unavailable."
    if(req.session.message != null) {
        message = req.session.message;
        desc = req.session.desc;
        req.session.message = null;
        req.session.desc =  null;
    }
  
    return res.render((appDir + '/templates/error/error.ejs'), { url: req.url, message: message , desc : desc });
    
  });

console.log("The connection is on localhost:3000");
app.listen(3000);