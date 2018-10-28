const router = require('express').Router()
const sha1 = require('sha1')
const model = require('./user-model')
const controller = require('./user-controller')
const path = require("path")
const appDir = path.dirname(require.main.filename);

router.get('/register', function(req,res) {
    controller.register_page(req,res);
});

router.post('/register', function(req,res) {
    controller.register(req,res)});

router.get('/login', function(req,res) {
    controller.login_page(req,res);
})

router.post('/login', function(req,res) {
    controller.sign_in(req,res);
})

router.get('/home', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.home_page(req,res);
})

router.get('/logout', function(req,res) {
    controller.logout(req,res);
})

router.get('/create_team1', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.create_team1_page(req,res);
})

router.post('/create_team1', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.create_team1(req,res);
})


router.get('/create_league', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.createLeague_page(req,res);
})

router.post('/create_league', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.createLeague(req,res);
})

router.get('/join_league', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.joinLeague_page(req,res);
})

router.post('/join_league', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.joinLeague(req,res);
})

router.get('/my_profile', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.my_profile(req,res);
})

router.get('/update_username', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_username_page(req,res);
})

router.post('/update_username', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_username(req,res);

})

router.get('/update_firstname', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_firstname_page(req,res);
})

router.post('/update_firstname', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_firstname(req,res);

})

router.get('/update_lastname', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_lastname_page(req,res);
})

router.post('/update_lastname', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_lastname(req,res);

})

router.get('/update_email', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_email_page(req,res);
})

router.post('/update_email', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.update_email(req,res);

})
router.get('/view_leaderboard', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.leaderboardPage(req,res);

})

router.get('/transfers', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.make_transfers_page(req,res);
})

router.post('/transfers', function(req,res,next) {
    controller.loginRequired(req,res,next);}, function(req,res) {
    controller.make_transfers(req,res);
})

router.get("/authorization_error", function(req,res) {
    message = "Unauthorized User";
    desc = "Please login to view this page.";
    return res.render((appDir + '/templates/error/user_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/login_failed", function(req,res) {
    message = "Login Failed";
    desc = "The username or password you entered didn't match with any in our database.";
    return res.render((appDir + '/templates/error/user_login_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/already_logged_in", function(req,res) {
    message = "You're already logged in!";
    //desc = "The username or password you entered didn't match with any in our database.";
    desc = null;
    return res.render((appDir + '/templates/error/user_already_loggedin.ejs'), { url: req.url, message: message , desc : desc });
})
module.exports = router;