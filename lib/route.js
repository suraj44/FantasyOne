var express = require('express');
var router = express.Router();
var drivers = require('../drivers/driver-model')
router.get('/',function(req,res)
{
	res.render('index',
	{AllDrivers: drivers.getDrivers}
	)
});

router.all('/learn',function(req,res){
	res.send("Using the ALL HTTP methods feature.");
});

router.get('/template', function(request, response) {
    response.sendFile('/views/main.html', { root: __dirname }); //Since we have configured to use public folder for serving static files. We don't need to append public to the html file path.
});
module.exports = router;