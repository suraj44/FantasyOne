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

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


function createLeague(callback) {
      league_code = makeid();
      sql.query('INSERT INTO Leagues(Type) values(1)', function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback();
        }
    })
}

function getLeagueID(callback) {
    sql.query('select MAX(LeagueID) as league_id from Leagues' , function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback(results);
        }
    })
}

function getLeagueIDfromCode(code, callback) {
    sql.query('select LeagueID as league_id from Leagues where LeagueCode = ?' ,[code], function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback(results);
        }
    })
}
function getLeagueName(league_id, callback) {
    sql.query('select LeagueName  from Leagues where LeagueID = ?' ,[league_id], function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback(results);
        }
    })
}
function insertLeagueCode(ID, code, callback) {
    sql.query('update Leagues set LeagueCode = ? where LeagueID = ?' , [code, ID],function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback(results);
        }
    })
}
function insertLeagueName(ID, name, callback) {
    sql.query('update Leagues set LeagueName = ? where LeagueID = ?' , [name, ID],function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback(results);
        }
    })
}

function insertTeamintoLeague(teamID, leagueID, callback) {
    sql.query('insert into Team_League_Link values(?,?)' , [teamID, leagueID],function(err, results){
        if(err)
            {
                console.log(err);
            }
        else {
            return callback();
        }
    })
}

function getTeamLeagues(user_name, callback) {
    sql.query('select a.LeagueName from Leagues a, Team_League_Link b, Teams c where c.user_name = ? and b.league_id = a.LeagueID and c.TeamID=b.team_id',[user_name] ,function(err,results) {
        if(err) {
            throw err;
        }
        return callback(results);
    })
}

function getLeagueLeaderboard(league_name, callback) {
    sql.query('select a.user_name,a.team_name,a.team_value,a.weekly_score,a.total_points,c.LeagueName from Teams a, Team_League_Link b, Leagues c where a.TeamID = b.team_id and b.league_id = c.LeagueID and c.LeagueName= ? order by a.total_points desc',[league_name] ,function(err,results) {
        if(err)
        {
            throw err;
        }
        else
        {
            return callback(results);
        }
    })
}

module.exports.getLeagueName = getLeagueName;
module.exports.getLeagueIDfromCode = getLeagueIDfromCode;
module.exports.insertLeagueName = insertLeagueName;
module.exports.insertTeamintoLeague = insertTeamintoLeague;
module.exports.insertLeagueCode = insertLeagueCode;
module.exports.getLeagueID = getLeagueID;  
module.exports.createLeague = createLeague;
module.exports.getTeamLeagues = getTeamLeagues;
module.exports.getLeagueLeaderboard = getLeagueLeaderboard;
console.log(makeid());