const model = require('./user-model');
const team_model = require('../team/team-model')
const driver_model = require('../drivers/driver-model')
const sha1 = require('sha1');
var path = require('path');
var appDir = path.dirname(require.main.filename);
exports.sign_in = function(req, res) {
    model.doesUserExist(req.body.username, sha1(req.body.password), function(result) {
        if(result.length ==0) {
            res.status(401).json({ message: 'Authentication failed. Username or password entered was incorrect.'});
        } 
        else {
            req.session.username = req.body.username;
            req.session.admin = 0;
            model.doesUserHaveTeam(req.body.username, function(result) {
                console.log(result)
                if(result.length==1) {
                    return res.redirect('home');
                } else {
                    return res.redirect('create_team1')
                }
            })
        // return res.redirect('home');
        }
    });
}

exports.loginRequied = function(req,res, next) {
    if(req.session.username) {
        next();
    } else {
        return res.status(401).json({ message: 'Please login to view this page'});
    }
}

exports.register_page = function(req,res) {
    res.render(appDir +  "/templates/form/user-register")
}

exports.register = function(req, res) {
    username = req.body.username;
    first_name = req.body.first_name;
    last_name = req.body.last_name;
    email_id = req.body.email_id;
    password = sha1(req.body.password);
    dob = req.body.dob;
    admin = 0 ;
    console.log(dob);
    model.addNewUser(username, first_name, last_name, email_id, password, dob, admin, function(err)  {
        if(err==null) {
            res.redirect("login");
        } else {
            res.status(401).json({ message: 'User with that username already exists'});
        }
    });
}

exports.create_team1_page = function(req,res) {

    driver_model.getAllDrivers(function(result) {
        //console.log(result);
        res.render((appDir +  "/templates/form/create_team1"),
        {AllDrivers: result}
        )
    })
}
exports.create_team1 = function(req,res) {
    team_name = req.body.team_name;
    user_name = req.session.username;
    console.log("username " + user_name)
    console.log(req.body)
    console.log(req.body.driverarr.split(","))
    drivers = req.body.driverarr.split(",");
    for(i=0 ; i < 5; i++) {
        drivers[i] = parseFloat(drivers[i]);
    }
    console.log(drivers)

    team_model.createTeam(team_name, user_name, function(err) {
        console.log(err)
        if(err==null) {
            
            team_model.getTeamID(team_name, user_name,  function(teamID) {
                team_model.insertDriverIntoTeam(teamID[0].TeamID, drivers[0], function(result) {
                    team_model.insertDriverIntoTeam(teamID[0].TeamID, drivers[1], function(result) {
                        team_model.insertDriverIntoTeam(teamID[0].TeamID, drivers[2], function(result) {
                            team_model.insertDriverIntoTeam(teamID[0].TeamID, drivers[3], function(result) {
                                team_model.insertDriverIntoTeam(teamID[0].TeamID, drivers[4], function(result) {
                                    res.redirect('home');
                                })
                            })
                        })
                    })
                })
            
                // driver_model.getDriverID(driver1, function(result) {
                //     team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                //         driver_model.getDriverID(driver2, function(result) {
                //             team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                //                 driver_model.getDriverID(driver3, function(result) {
                //                     team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                //                         driver_model.getDriverID(driver4, function(result) {
                //                             team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                //                                 driver_model.getDriverID(driver5, function(result) {
                //                                     team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                //                                         res.redirect('home');
                //                                     })
                //                                 })
                //                             })
                //                         })
                //                     })
                //                 })
                //             })
                //         })
                //     })
                // })
            })
            // res.render((appDir +  "/templates/form/create_team2") ,{AllDrivers: result, team_name: team_name});
            
        } else {
            res.status(401).json({ message: 'Team with that name already exists!'})
        }
    })

    

    
}

// exports.create_team2_page = function(req,res) {
//     driver_model.getAllDrivers(function(result) {		
//             res.render((appDir +  "/templates/form/create_team2"),
//             {AllDrivers: result}
//             )
// 	})

// }

exports.create_team2 = function(req,res) {
    driver1 = req.body.driver1;
    driver2 = req.body.driver2;
    driver3 = req.body.driver3;
    driver4 = req.body.driver4;
    driver5 = req.body.driver5;
    
    duplicate_check = new Set([driver1,driver2,driver3,driver4,driver5]);
    if(duplicate_check.size != 5) {
        res.status(401).json({ message: 'Your team has duplicate drivers'});
    } else {
        console.log("GG");
        console.log(req.session.team_name);
        // for (let item of duplicate_check.values()) {
        //     team_model.getTeamID(req.session.team_name, function(teamID) {
        //         console.log(teamID[0].TeamID);
        //         driver_model.getDriverID(item, function(result) {
        //             console.log(result);
        //             team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
        //                 console.log(driver1);
        //             })
        //         })
        //     })
        // }

        team_model.getTeamID(req.session.team_name, function(teamID) {
            
            driver_model.getDriverID(driver1, function(result) {
                team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                    driver_model.getDriverID(driver2, function(result) {
                        team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                            driver_model.getDriverID(driver3, function(result) {
                                team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                                    driver_model.getDriverID(driver4, function(result) {
                                        team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                                            driver_model.getDriverID(driver5, function(result) {
                                                team_model.insertDriverIntoTeam(teamID[0].TeamID, result[0].DriverID, function(result) {
                                                    res.redirect('home');
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        // console.log(duplicate_check.values()[0]);
        // team_model.getTeamID(req.session.team_name, function(teamID) {
        //     driver_model.getDriverID(driver1, function(result) {
        //         team_model.insertDriverIntoTeam(teamID, result, function(result) {
        //             console.log(driver1);
        //         })
        //     })
        //     driver_model.getDriverID(driver2, function(result) {
        //         team_model.insertDriverIntoTeam(teamID, result, function(result) {
        //             console.log(driver2);
        //         })
        //     })
        //     driver_model.getDriverID(driver3, function(result) {
        //         team_model.insertDriverIntoTeam(teamID, result, function(result) {
        //             console.log(driver3);
        //         })
        //     })
        //     driver_model.getDriverID(driver4, function(result) {
        //         team_model.insertDriverIntoTeam(teamID, result, function(result) {
        //             console.log(driver4);
        //         })
        //     })
        //     driver_model.getDriverID(driver5, function(result) {
        //         team_model.insertDriverIntoTeam(teamID, result, function(result) {
        //             console.log(driver5);
        //         })
        //     })
        // })


    }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    
}

exports.login_page = function(req,res) {
    res.render(appDir + "/templates/form/user-login")
}
exports.home_page = function(req,res) {
    res.render(appDir +  "/templates/user/user-home", {})
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('login');
}