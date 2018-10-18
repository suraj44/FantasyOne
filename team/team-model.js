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

function createTeam(teamName, callback) {
    sql.query('INSERT INTO Teams(team_name) values(?)',[teamName] ,function(err, results){
        // if (err) {
        //     throw err;
        // }sele
        return callback(err);
    })
}

function getTeamID(teamName, callback) {
    sql.query('SELECT TeamID from Teams where team_name = ?',[teamName] ,function(err, results){
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

module.exports.createTeam = createTeam;
module.exports.getTeamID = getTeamID;
module.exports.insertDriverIntoTeam = insertDriverIntoTeam;