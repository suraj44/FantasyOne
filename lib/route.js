var express = require('express');
var router = express.Router();
var drivers = require('../drivers/driver-model')
router.get('/',function(req,res)
{
	res.render('index');
})
module.exports = router
