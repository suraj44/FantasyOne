const router = require('express').Router()
const model = require('./admin-model')
router.get('/login',function(req,res)
{
		res.sendFile(__dirname +  "/templates/admin-login.html")
	
});

router.get('/login_success',function(req,res)
{
		res.sendFile(__dirname +  "/templates/success.html")
	
});

router.post('/login', function(req,res) {
	username = req.body.username;
	password = req.body.password;

	model.getAdminPassword(username, function(err , result) {
		if(err) {
			console.log(err)
			res.redirect('login')
		} else {
			res.redirect('login_success')
		}
	})


})

module.exports = router