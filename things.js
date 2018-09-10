var express = require('express');
var router = express.Router();

router.get('/',function(req,res)
{
	res.send("Welcome to FantasyOne!");
});

router.all('/learn',function(req,res){
	res.send("Using the ALL HTTP methods feature.");
});

module.exports = router;