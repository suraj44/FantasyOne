const router = require('express').Router()
const model = require('./admin-model')
const controller = require('./admin-controller')
const driver_model = require('../drivers/driver-model')
const driver_controller = require('../drivers/driver-controller')
const user_model = require('../user/user-model')
const team_model = require('../team/team-model')
const sha1 = require('sha1')
var path = require('path');
var appDir = path.dirname(require.main.filename);

router.get('/register', function(req,res) {
	if(req.session.username != null && req.session.admin == 1) {
        return res.redirect('already_logged_in')
	}
	if(req.session.username != null && req.session.admin == 0) {
        return res.redirect('/user/already_logged_in')
    }
    controller.register_page(req,res);
});

router.post('/register', function(req,res) {
    controller.register(req,res)});


router.get('/login',function(req,res)
{
	if(req.session.username != null && req.session.admin == 1) {
        return res.redirect('already_logged_in')
	}
	if(req.session.username != null && req.session.admin == 0) {
        return res.redirect('/user/already_logged_in')
    }
		res.render(appDir + "/templates/form/admin-login");
});

router.get('/home',function(req,res,next) {
	controller.loginRequired(req,res,next);
	}, function(req,res) {
		if(req.session.message) {
			message = req.session.message;
			msg_code = req.session.message_code;
			req.session.message = null;
			req.session.message_code = null;
		} else {
			message = null;
			msg_code = null;
		}
		//console.log(req.session.admin);
		driver_model.getAllDrivers(function(result) {
			drivers = result;
			user_model.getUserCount(function(result) {
				userCount = result[0].user_count;
				team_model.getAllTeamAvgPoints(function(result) {
					avgpts = result[0].avgpts;
					model.getTransferLock(function(result) {
						lock = result[0].lock_val;
						res.render((appDir +  "/templates/admin-dash/home"),
			{AllDrivers: drivers, userCount : userCount, avgpts: avgpts,  message: message, msg_code:msg_code, lock:lock}
			)
					})
				})
				
			})
		})
	
	});
router.post('/login', function(req,res) {	
	controller.sign_in(req,res);
})


// Update the Weekly Score of a driver
router.get('/update_weekly_score', function(req,res) {
		//console.log(req.session.admin);
		driver_model.getAllDriversbyConstructor(function(result) {
			//console.log(result);
			res.render((appDir +  "/templates/admin-dash/update_test"),
			{AllDrivers: result}
			)
		})
		//res.render(appDir + "/templates/admin-dash/update_test");
	});


router.post('/update_weekly_score', function(req,res,next) {
	controller.loginRequired(req,res,next);
	}, function(req, res){
	week_no = req.body.week_no;
	driverID = req.body.DriverID;
	race_finish = parseFloat(req.body.race_finish);
	qualifying_finish = req.body.qualifying_finish;
	no_overtakes = req.body.no_overtakes;
	if(req.body.beat_teammate_race=="on") {
		beat_teammate_race = 1;
	}
	else {
		beat_teammate_race = 0;
	}

	if(req.body.beat_teammate_qualifying=="on") {
		beat_teammate_qualifying = 1;
	}
	else {
		beat_teammate_qualifying = 0;
	}
	
	switch(race_finish) {
		case 1:
			race_finish = 25;
			break;
		case 2:
			race_finish = 18;
			break;
		case 3:
			race_finish = 15;
			break;
		case 4:
			race_finish = 12;
			break;
		case 5:
			race_finish = 10;
			break;
		case 6:
			race_finish = 8;
			break;
		case 7:
			race_finish = 6;
			break;
		case 8:
			race_finish = 4;
			break;
		case 9:
			race_finish = 2;
			break;
		case 10:
			race_finish = 1;
			break;
		default:
			race_finish = 0;
			break;
	}
	console.log("Race finish "+ race_finish)

	if(qualifying_finish <=10 && qualifying_finish > 0) {
		qualifying_finish = 11 -qualifying_finish;
	} else {
		qualifying_finish = 0;
	}

	week_score = race_finish + qualifying_finish + 2*no_overtakes + 3*beat_teammate_race + 2*beat_teammate_qualifying;
	console.log(week_score)


    driver_model.updateDriverWeeklyScore(week_no, driverID,race_finish, qualifying_finish, no_overtakes, beat_teammate_race, beat_teammate_qualifying, week_score, function(err) {
        if(err) {
            console.log(err);
        }
    })

    driver_model.updateDriverTotalScore(function(err) {
        if(err) {
            res.redirect("/admin/update_weekly_score");
            console.log("Error in updating database: " + err);
        } else {
            console.log("Database was updated successfully.")
            res.redirect("/admin/update_weekly_score");
            
        }
    })
})

router.get('/update_driver_price', function(req,res) {
		driver_model.getAllDriversbyConstructor(function(result) {
			res.render((appDir +  "/templates/admin-dash/update_price_test"),
			{AllDrivers: result}
			)
		})
	});

router.post('/update_driver_price', function(req,res,next) {
	controller.loginRequired(req,res,next);
	}, function(req, res){
	driverID = req.body.DriverID;
    newPrice = req.body.Price;

    driver_model.updateDriverPrice(newPrice, driverID, function(err) {
        if(err) {
            res.redirect("update_driver_price");
            console.log("Error in updating database: " + err);
        } else {
            console.log("Database was updated successfully.")
            res.redirect("/admin/update_driver_price");
            
        }
    })
})

router.get('/add_new_admin', function(req,res,next) {
	controller.loginRequired(req,res,next);
	},function(req,res) {
    res.render(appDir + '/templates/form/admin-register.ejs');
})

router.post('/add_new_admin', function(req,res,next) {
	controller.loginRequired(req,res,next);
	}, function(req, res){
		username = req.body.username;
		first_name = req.body.first_name;
		last_name = req.body.last_name;
		email_id = req.body.email_id;
		password = sha1(req.body.password);
		dob = req.body.dob;
		if(req.body.admin=="on")
			admin =1;
		else
			admin = 0;
		driver_model.add
		console.log(dob);
		model.addNewAdmin(username, first_name, last_name, email_id, password, dob, admin, function(err)  {
			if(err==null) {
				res.redirect("/admin/home");
			} else {
				res.status(401).json({ message: 'Admin with that username already exists'});
			}
		})
})

router.get('/update_all_team_points', function(req,res,next) {
	controller.loginRequired(req,res,next);
}, function(req,res) {
	controller.UpdateAllTeamPoints(req,res);
});

router.get('/enable_transfers', function(req,res) {
	model.setTransferLock(0, function(result) {
		req.session.message = "Transfers have been enabled";
		req.session.message_code = 2;
		res.redirect('home')
	})
})

router.get('/disable_transfers', function(req,res) {
	model.setTransferLock(1, function(result) {
		res.redirect('home')
	})
})

router.get("/authorization_error", function(req,res) {
    message = "FORBIDDEN";
    desc = "Only administrators are privileged to view this page.";
    return res.render((appDir + '/templates/error/admin_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/login_error", function(req,res) {
    message = "Login Error";
    desc = "The username or password you entered did not match with our records.";
    return res.render((appDir + '/templates/error/admin_login_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/privilege_error", function(req,res) {
    message = "Access Denied";
    desc = "You do not have the priviliges to login as admin";
    return res.render((appDir + '/templates/error/privilege_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/already_logged_in", function(req,res) {
    message = "You're already logged in!";
    desc = null;
    return res.render((appDir + '/templates/error/admin_already_loggedin.ejs'), { url: req.url, message: message , desc : desc });
})

router.get('/logout' ,function(req, res) {
	req.session.destroy();
	res.redirect('/');
})

module.exports = router