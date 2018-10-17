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

        return callback(results);
    })
}

function addNewUser(username, first_name, last_name, email_id, password, dob, admin, callback) {
    sql.query('INSERT INTO users values(?,?,?,?,?,?,?)',[username, first_name, last_name, email_id, password, dob, admin] ,function(err, results){
        return callback(err);
    })
}

module.exports.doesUserExist = doesUserExist;
module.exports.addNewUser = addNewUser;