const model = require('./admin-model');
const sha1 = require('sha1');
exports.sign_in = function(req, res) {
    model.doesUserExist(req.body.username, sha1(req.body.password), function(result) {
        if(result.length ==0) {
            res.status(401).json({ message: 'Authentication failed. Username or password entered was incorrect.'});
        } else if(result[0].admin==0) {
            res.status(401).json({ message: 'Sorry. You do not have administrative priviliges.'});
        } 
        else {
            req.session.username = req.body.username;
            req.session.admin = 1;
            return res.redirect('home');
        }
    });
}

exports.loginRequied = function(req,res, next) {
    if(req.session.username && req.session.admin==1) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}