const mysql = require("mysql")

const sql = mysql.createConnection({
    host: "localhost",
    user: "k1ng", 
    password: "kyrgios",
    database: "fantasyone",
    timezone: 'Z'
});

sql.connect(function (err) {
    if(err) {
        console.log("Error connecting to FantasyOne database.");
    } else {
        console.log("Connected to FantasyOne database.")
    }
        
});

function doesUserExist(username, password, callback) {
    sql.query('SELECT username, admin from users where username = ? AND password = ?',[username, password] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function userCheck(username, callback) {
    sql.query('SELECT username from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function doesEmailExist(email, callback) {
    sql.query('SELECT email_id from users where email_id = ?',[email] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function getUserProfile(username, callback) {
    sql.query('SELECT username, first_name, last_name, email_id, date(dob) as dob from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function getUserFirstName(username, callback) {
    sql.query('SELECT first_name from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}
function getUserLastName(username, callback) {
    sql.query('SELECT last_name from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function getUserEmail(username, callback) {
    sql.query('SELECT email_id from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function getUserDOB(username, callback) {
    sql.query('SELECT date(dob) as dob from users where username = ?',[username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function updateUserFirstName(username, firstname, callback) {
    sql.query('update users set first_name = ? where username = ?',[firstname ,username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function updateUserLastName(username, lastname, callback) {
    sql.query('update users set last_name = ? where username = ?',[lastname ,username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function updateUserEmail(username, newemail, callback) {
    sql.query('update users set email_id = ? where username = ?',[newemail ,username] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function updateUserName(newusername, oldusername,callback) {
    sql.query('update users set username = ? where username = ?',[newusername, oldusername] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

function addNewUser(username, first_name, last_name, email_id, password, dob, admin, callback) {
    sql.query('INSERT INTO users(username,first_name,last_name,email_id,password,dob,admin) values(?,?,?,?,?,?,?)',[username, first_name, last_name, email_id, password, dob, admin] ,function(err, results){
        //console.log(err);
        return callback(err);
    })
}

function doesUserHaveTeam(username, callback) {
    sql.query('select TeamID from Teams where user_name = ?', [username],function(err, results){
        if(err)
            {
                throw err;
                //console.log(err);
            }
        return callback(results);
    })
}

function getUserCount(callback) {
    sql.query('select COUNT(username) as user_count from users' , function(err, results){
        if(err)
            {
                throw err;
                console.log(err);
            }
        return callback(results);
    })
}

function getUserTeam(teamID, callback) {
    sql.query('select a.DriverID, a.Name, a.Tot_Points, a.Cost, a. constructor, a.img from Drivers a, Team_Driver_Link b where a.DriverID = b.driver_id and b.team_id = ?' , [teamID], function(err, results){
        if(err)
            {
                throw err;
                console.log(err);
            }
        return callback(results);
    })
}

function getTeamValue(teamID, callback) {
    
    sql.query('select SUM(Cost) as team_value from Drivers a, Team_Driver_Link b where a.DriverID = b.driver_id and b.team_id = ?' , [teamID], function(err, results){
        if(err)
            {
                throw err;
                console.log(err);
            }
        return callback(results);
    })
}

function getCurrentWeek(callback) {
    sql.query('select MAX(week_no) as max_week from criteria', function(err,results) {
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

function getTransferLock(callback) {
    sql.query('select lock_val from locks where lock_name = "transfer"',function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })
}


module.exports.getTransferLock = getTransferLock;
module.exports.getUserDOB = getUserDOB;
module.exports.doesEmailExist = doesEmailExist;
module.exports.updateUserEmail = updateUserEmail;
module.exports.getUserEmail = getUserEmail;
module.exports.updateUserFirstName = updateUserFirstName;
module.exports.updateUserLastName = updateUserLastName;
module.exports.getUserFirstName = getUserFirstName;
module.exports.getUserLastName = getUserLastName;
module.exports.updateUserName = updateUserName;
module.exports.userCheck = userCheck;
module.exports.getUserProfile = getUserProfile;
module.exports.getTeamValue = getTeamValue;
module.exports.getUserTeam = getUserTeam;
module.exports.getUserCount = getUserCount
module.exports.doesUserExist = doesUserExist;
module.exports.addNewUser = addNewUser;
module.exports.doesUserHaveTeam = doesUserHaveTeam;
module.exports.getCurrentWeek = getCurrentWeek;