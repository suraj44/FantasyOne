const model = require('./admin-model');

exports.sign_in = function(req, res) {
    console.log(req.body.username + " " + req.body.password);
    model.doesUserExist(req.body.username, req.body.password, function(result) {
        if(result.length ==0) {
            res.status(401).json({ message: 'Authentication failed. Username or password entered was incorrect.'});
        } else {
            req.session.username = req.body.username;
            console.log(result);
            return res.status(200).send();
        }
    });
}

exports.loginRequied = function(req,res, next) {
    if(req.session.username) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}