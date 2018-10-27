const model = require('./user-model');
const team_model = require('../team/team-model')
const driver_model = require('../drivers/driver-model')
const league_model = require('../leagues/league-model')
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

         return res.redirect('home');
        }
    });
}

exports.loginRequired = function(req,res, next) {
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
            
            })
            // res.render((appDir +  "/templates/form/create_team2") ,{AllDrivers: result, team_name: team_name});
            
        } else {
            res.status(401).json({ message: 'Team with that name already exists!'})
        }
    })

    

    
}


exports.createLeague_page = function(req,res) {
    res.render(appDir + "/templates/form/create_league")
}

exports.createLeague = function(req, res) {
    league_name = req.body.league_name;
    league_model.createLeague(function() {
        league_model.getLeagueID(function(ID) {
            ID = ID[0].league_id;
            league_code = sha1(ID).slice(0,10);
            league_model.insertLeagueCode(ID, league_code, function() {
                league_model.insertLeagueName(ID, league_name, function() {
                    team_model.getTeamIDfromUser(req.session.username, function(teamID) {
                        teamID = teamID[0].TeamID
                        league_model.insertTeamintoLeague(teamID, ID, function () {
                            req.session.message = league_code;
                            req.session.message_code = 1;
                            res.redirect('home')
                            console.log(league_code)
                        })
                    })
                })
            })
        })
    })
}

exports.joinLeague_page = function(req,res) {
    res.render(appDir + "/templates/form/join_league")
}

exports.joinLeague = function(req, res) {
    league_code = req.body.league_code;

    league_model.getLeagueIDfromCode(league_code, function(ID) {
        ID = ID[0].league_id;
        team_model.getTeamIDfromUser(req.session.username, function(teamID) {
            teamID = teamID[0].TeamID
            league_model.insertTeamintoLeague(teamID, ID, function () {
                league_model.getLeagueName(ID, function(name) {
                    req.session.message = name[0].LeagueName
                    req.session.message_code = 2;
                    res.redirect('home')
                    console.log(league_code)
                })
                
            })
    })
    })
}

exports.leaderboardPage = function(req,res) {
    league_name = req.param('league_name');
    username = req.session.username;
    console.log(league_name);
    league_model.getLeagueLeaderboard(league_name, function(leaderboard) {
        console.log(leaderboard);
        return res.render((appDir + "/templates/user-dash/leaderboard.ejs"), {username:username,leaderboard:leaderboard, username:username});
    })
}
exports.login_page = function(req,res) {
    res.render(appDir + "/templates/form/user-login")
}
exports.home_page = function(req,res) {
    if(req.session.message) {
        message = req.session.message;
        msg_code = req.session.message_code;
        req.session.message = null;
        req.session.message_code = null;
    } else {
        message = null;
        msg_code = null;
    }
    model.doesUserHaveTeam(req.session.username, function(result) {
        console.log(result)
        if(result.length==1) {
            model.getUserTeam(result[0].TeamID, function(team) {
                model.getTeamValue(result[0].TeamID, function(team_val) {
                    team_val = (team_val[0].team_value).toFixed(2);
                    league_model.getTeamLeagues(req.session.username, function(leagueNames) {
                        team_model.getTeamTotalPoints(req.session.username, function(totalPoints) {
                            model.getCurrentWeek(function(currWeek){
                                model.getTransferLock(function(result) {
                                    lock = result[0].lock_val;
                                    username = req.session.username;
                                    return res.render((appDir + "/templates/user-dash/home.ejs"), {username:username, currWeek:currWeek, team: team, team_val:team_val, message: message, msg_code:msg_code, leagueNames:leagueNames, totalPoints:totalPoints, lock:lock});
                                })      
                            })
                        })
                        
                })
                
            })
        } )}
        else {
            return res.redirect('create_team1')
        }
    })
    //res.render((appDir +  "/templates/user-dash/home"), {message:message})
}

exports.my_profile = function(req,res) {
    username = req.session.username;
    model.getUserProfile(username, function(result){
        result[0].dob = result[0].dob.toDateString().slice(4);
        res.render(appDir + '/templates/user-dash/my_profile', {User:result});
    })
}

exports.update_username_page = function(req,res) {
    if(req.session.message != null) {
        message = req.session.message;
        req.session.message = null;
    } else {
        message = null;
    }
    username = req.session.username;
    res.render(appDir + '/templates/form/update_username', {username: username, message:message})
}

exports.update_username = function(req,res) {
    oldUsername = req.session.username;
    newUsername = req.body.username;
    if(oldUsername == newUsername){
        req.session.message = "That is already your username!"
        return res.redirect("update_username")
    }
    model.userCheck(newUsername, function(result) {
        console.log("haahaha")
        console.log(result)
        console.log("^res")
        if( result.length == 0 ) {
            console.log('outside if')
            model.updateUserName(newUsername, oldUsername, function(result) {
                console.log('inside if')
                req.session.username = newUsername;
                res.redirect('my_profile')
            })
        } else {
            console.log('else')
            req.session.message = "That username already exists."
            res.redirect('update_username');
        }
    })
}

exports.update_email_page = function(req,res) {
    if(req.session.message != null) {
        message = req.session.message;
        req.session.message = null;
    } else {
        message = null;
    }
    model.getUserEmail(username, function(email) {
        email = email[0].email_id;
        res.render(appDir + '/templates/form/update_email', {email: email, message:message})
    })
}

exports.update_email = function(req,res) {
    username = req.session.username;

    model.getUserEmail(username, function(result) {
        oldemail = result[0].email_id;
        newemail = req.body.email;
        if(oldemail == newemail){
            req.session.message = "That is already your email!"
            return res.redirect("update_email")
        }
        model.doesEmailExist(newemail, function(result) {
            if( result.length == 0 ) {
                model.updateUserEmail(username, newemail, function(result) {
                    res.redirect('my_profile')
                })
            } else {
                console.log('else')
                req.session.message = "That email is in use by another user."
                res.redirect('update_email');
            }
        })
    })
}

exports.update_firstname_page = function(req,res) {
    username = req.session.username;
    model.getUserFirstName(username, function(result) {
        first_name = result[0].first_name;
        res.render(appDir + '/templates/form/update_firstname', {firstname: first_name});
    })
    
}

exports.update_firstname = function(req,res) {
    newfirstname = req.body.firstname;
    username = req.session.username;
    model.updateUserFirstName(username, newfirstname, function(result) {
        res.redirect('my_profile')
    })
}

exports.update_lastname_page = function(req,res) {
    username = req.session.username;
    model.getUserLastName(username, function(result) {
        last_name = result[0].last_name;
        res.render(appDir + '/templates/form/update_lastname', {lastname: last_name});
    })
}

exports.update_lastname = function(req,res) {
    newlastname = req.body.lastname;
    username = req.session.username;
    model.updateUserLastName(username, newlastname, function(result){
        res.redirect('my_profile')
    })
}

exports.make_transfers_page = function(req,res) {
    model.doesUserHaveTeam(req.session.username, function(result) {
        model.getUserTeam(result[0].TeamID, function(team) {
            model.getTeamValue(result[0].TeamID, function(team_val) {
            model.getTransferLock(function(result) {
                driver_model.getDriverAggregateStats(function(driveragg) {
                    team_val = 70 - team_val[0].team_value;
                    lock = result[0].lock_val;
                    username = req.session.username;
                    if(lock==1) {
                        return res.status(401).json({message : "Transfers are disabled as the raceweek is live."})
                    } else {

                        teams = [];
                        ids = [];
                        for(i = 0 ; i < team.length ;i++) {
                            teams.push(team[i].Name)
                            ids.push(team[i].DriverID)
                        }
                        team  = teams;
                        console.log(team);
                        console.log(driveragg);
                        return res.render((appDir + "/templates/user-dash/transfers.ejs"), {username:username, team:team, driveragg:driveragg, team_val:team_val, ids:ids});
                    }
                })
                
            })
        })
        })
    })
}

exports.make_transfers = function(req,res) {
    username = req.session.username;
    drivers = req.body.driverarr;
    drivers = req.body.driverarr.split(",");
    for(i=0 ; i < 5; i++) {
        drivers[i] = parseFloat(drivers[i]);
    }

    team_model.getTeamIDfromUser(username, function(team_id) {
        team_id = team_id[0].TeamID;
        team_model.deleteUserTeam(team_id, function(result) {
            team_model.insertDriverIntoTeam(team_id, drivers[0], function(result) {
                team_model.insertDriverIntoTeam(team_id, drivers[1], function(result) {
                    team_model.insertDriverIntoTeam(team_id, drivers[2], function(result) {
                        team_model.insertDriverIntoTeam(team_id, drivers[3], function(result) {
                            team_model.insertDriverIntoTeam(team_id, drivers[4], function(result) {
                                res.redirect('home');
                            })
                        })
                    })
                })
            })

        })
    })
}
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('login');
}