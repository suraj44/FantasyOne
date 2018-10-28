var express = require('express');
var router = express.Router();
var drivers = require('../drivers/driver-model')
router.get('/',function(req,res)
{
	login = false;
	admin = false;
	if(req.session.username != null) {
		login = true;
		if(req.session.admin == 1) {
			admin = true;
		}
	}
	res.render('index', {login:login, admin:admin});
})



module.exports = router
