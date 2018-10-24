const model = require('./admin-model');
const team_model = require('../team/team-model')
const driver_model = require('../drivers/driver-model')
const sha1 = require('sha1');
const async = require('async')
var path = require('path');
var appDir = path.dirname(require.main.filename);


exports.register_page = function(req,res) {
    res.render(appDir +  "/templates/form/admin-register")
}

exports.register = function(req, res) {
    username = req.body.username;
    first_name = req.body.first_name;
    last_name = req.body.last_name;
    email_id = req.body.email_id;
    password = sha1(req.body.password);
    dob = req.body.dob;
    admin = 1;
    console.log(dob);
    model.addNewAdmin(username, first_name, last_name, email_id, password, dob, admin, function(err)  {
        if(err==null) {
            res.redirect("login");
        } else {
            res.status(401).json({ message: 'Admin with that username already exists'});
        }
    });
}


exports.sign_in = function(req, res) {
    model.doesUserExist(req.body.username, sha1(req.body.password), function(result) {
        if(result.length ==0) {
            res.status(401).json({ message: 'Authentication failed. Username or password entered was incorrect.'});
        } else if(result[0].admin==0) {
            res.status(401).json({ message: 'Sorry. You do not have administrative priviliges.'});
        } 
        else {
            req.session.username = req.body.username;
            req.session.admin = 1;
            return res.redirect('home');
        }
    });
}

exports.UpdateAllTeamPoints = function (req,res) {
    team_model.getAllTeams(function(teams){
        driver_model.getCurrentWeek(function(current_week){
            current_week = current_week[0].current_week;
            async.each(teams, function(team,callback){
                teamID = team.TeamID;
                //console.log(teamID)
                team_model.getTeamScoreForAWeek(teamID, current_week, function(Score, teamID) {
                    //console.log(Score)
                    Score = Score[0].team_weekly_score;
                    //console.log(teamID + " " + Score)
                        team_model.addTeamWeeklyPoints(current_week, teamID, Score, function() {
                            team_model.setTeamWeeklyScore(teamID, Score, function() {
                                team_model.setTeamTotalScore(teamID,function(){
                                    callback();
                                })
                            })
                        })
                    
                })
            }, function() {
                console.log("done!")
                req.session.message = "The total and weekly scores of all teams have been updated.";
                req.session.message_code = 1;
                res.redirect('home')
            })
        })


    })
}


exports.loginRequired = function(req,res, next) {
    if(req.session.username && req.session.admin==1) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user! Please Log In!'});
    }
}