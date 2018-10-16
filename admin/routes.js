const router = require('express').Router()
//const model = require('./admin-model')
const controller = require('./admin-controller')
router.get('/login',function(req,res)
{
		res.sendFile(__dirname +  "/templates/admin-login.html")
	
});

router.get('/login_success',function(req,res)
{
		res.sendFile(__dirname +  "/templates/success.html")
	
});


//router.post('/login', controller.sign_in(req,res));


 router.get('/lol', function(req,res,next) {
	 controller.loginRequied(req,res,next);
 }, function(req,res) {
	 res.redirect('login_success')
 });
router.post('/login', function(req,res) {
	username = req.body.username;
	password = req.body.password;
	
	controller.sign_in(req,res);
})
// why doesn't using this directly work?
// router.post('/login', controller.sign_in(req,res));

router.get('/logout' ,function(req, res) {
	req.session.destroy();
	res.redirect('login');
})

module.exports = router