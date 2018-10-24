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
                            console.log(totalPoints);
                            model.getCurrentWeek(function(currWeek){
                                console.log(currWeek);
                                return res.render((appDir + "/templates/user-dash/home.ejs"), {currWeek:currWeek, team: team, team_val:team_val, message: message, msg_code:msg_code, leagueNames:leagueNames, totalPoints:totalPoints });
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

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('login');
}