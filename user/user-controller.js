const model = require('./user-model');
const sha1 = require('sha1');
exports.sign_in = function(req, res) {
    model.doesUserExist(req.body.username, sha1(req.body.password), function(result) {
        if(result.length ==0) {
            res.status(401).json({ message: 'Authentication failed. Username or password entered was incorrect.'});
        } 
        else {
            req.session.username = req.body.username;
            req.session.admin = 0;
            return res.redirect('home');
        }
    });
}

exports.loginRequied = function(req,res, next) {
    if(req.session.username) {
        next();
    } else {
        return res.status(401).json({ message: 'Please login to view this page'});
    }
}

exports.register = function(req, res) {
    username = req.body.username;
    first_name = req.body.first_name;
    last_name = req.body.last_name;
    email_id = req.body.email_id;
    password = sha1(req.body.password);
    dob = req.body.dob;
    admin = 0 ;
    console.log(dob);
    model.addNewUser(username, first_name, last_name, email_id, password, dob, admin, function(err)  {
        if(err==null) {
            res.redirect("login");
        } else {
            res.status(401).json({ message: 'User with that username already exists'});
        }
    });
}

exports.login_page = function(req,res) {
    res.render(__dirname +  "/templates/user-login")
}
exports.home_page = function(req,res) {
    res.render(__dirname +  "/templates/user-home")
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('login');
}