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

function insertDriverIntoTeam(teamID, driverID, callback) {
    sql.query('INSERT INTO Team_Driver_Link(team_id, driver_id) values(?,?)',[teamID, driverID] ,function(err, results){
        if (err) {
            throw err;
        }
        return callback(results);
    })
}

module.exports.getTeamIDfromUser = getTeamIDfromUser;
module.exports.getAllTeamAvgPoints = getAllTeamAvgPoints;
module.exports.createTeam = createTeam;
module.exports.getTeamID = getTeamID;
module.exports.insertDriverIntoTeam = insertDriverIntoTeam;