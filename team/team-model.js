const mysql = require("mysql")

const sql = mysql.createConnection({
    host: "localhost",
    user: "k1ng", 
    password: "kyrgios",
    database: "fantasyone"
});

sql.connect(function (err) {
    if(err) {
        console.log("Error connecting to FantasyOne database.");
    } else {
        console.log("Connected to FantasyOne database.")
    }
        
});

function createTeam(teamName, user_name, callback) {
    sql.query('INSERT INTO Teams(team_name, user_name) values(?, ?)',[teamName, user_name] ,function(err, results){
        // if (err) {
        //     throw err;
        // }sele
        return callback(err);
    })
}

function getAllTeams(callback) {
    sql.query('select TeamID from Teams',function(err, results){
        // if (err) {
        //     throw err;
        // }sele
        return callback(results);
    })
}

function getTeamID(teamName, user_name, callback) {
    sql.query('SELECT TeamID from Teams where team_name = ? AND user_name = ? ',[teamName, user_name] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function getTeamIDfromUser(user_name, callback) {
    sql.query('SELECT TeamID from Teams where user_name = ? ',[user_name] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function getAllTeamAvgPoints(callback) {
    sql.query('select AVG(total_points) as avgpts from Teams;' ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function getTeamScoreForAWeek(TeamID,Week_No, callback) {
    sql.query('select SUM(week_points) as team_weekly_score from Team_Driver_Link a, criteria b where a.team_id = ? AND a.driver_id  = b.driverid and b.week_no =?' ,[TeamID, Week_No], function(err, results){
        if (err) {
            throw err;
        }
        return callback(results, TeamID);
    })
} 

function insertDriverIntoTeam(teamID, driverID, callback) {
    sql.query('INSERT INTO Team_Driver_Link(team_id, driver_id) values(?,?)',[teamID, driverID] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function addTeamWeeklyPoints(weekNo, TeamID, WeeklyPoints, callback) {
    sql.query('INSERT INTO Team_Weekly_Points values(?,?,?)',[weekNo,TeamID, WeeklyPoints] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function setTeamWeeklyScore(teamID, score, callback) {
    sql.query('update Teams set weekly_score = ? where TeamID = ?',[score, teamID] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

function setTeamTotalScore(teamID, callback) {
    sql.query('update Teams set total_points = (select SUM(WeeklyPoints) as total_points from Team_Weekly_Points where TeamID = ?) where TeamID = ?;',[teamID, teamID] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

module.exports.setTeamTotalScore = setTeamTotalScore;
module.exports.setTeamWeeklyScore = setTeamWeeklyScore;
module.exports.addTeamWeeklyPoints = addTeamWeeklyPoints;
module.exports.getAllTeams = getAllTeams;
module.exports.getTeamScoreForAWeek = getTeamScoreForAWeek;
module.exports.getTeamIDfromUser = getTeamIDfromUser;
module.exports.getAllTeamAvgPoints = getAllTeamAvgPoints;
module.exports.createTeam = createTeam;
module.exports.getTeamID = getTeamID;
module.exports.insertDriverIntoTeam = insertDriverIntoTeam;