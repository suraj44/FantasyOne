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

function doesUserExist(username, password, callback) {
    sql.query('SELECT username, admin from users where username = ? AND password = ?',[username, password] ,function(err, results){
        if (err) {
            throw err;
        }
        console.log(results);
        return callback(results);
    })
}

function addNewUser(username, first_name, last_name, email_id, password, dob, admin, callback) {
    sql.query('INSERT INTO users(username,first_name,last_name,email_id,password,dob,admin) values(?,?,?,?,?,?,?)',[username, first_name, last_name, email_id, password, dob, admin] ,function(err, results){
        console.log(err);
        return callback(err);
    })
}

function doesUserHaveTeam(username, callback) {
    sql.query('select TeamID from Teams where user_name = ?', [username],function(err, results){
        if(err)
            {
                throw err;
                console.log(err);
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

module.exports.getUserCount = getUserCount
module.exports.doesUserExist = doesUserExist;
module.exports.addNewUser = addNewUser;
module.exports.doesUserHaveTeam = doesUserHaveTeam;