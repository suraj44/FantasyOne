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


function getAdminPassword(username,  callback) {
    sql.query('SELECT pass from administrator where username = ?', [username], function (err, res) {
        if(err) {
            throw err;
        }
        console.log(res);
        return callback(err, res);
    })
}

function doesUserExist(username, password, callback) {
    sql.query('SELECT username, admin from users where username = ? AND password = ?',[username, password] ,function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })
}

function addNewAdmin(username, first_name, last_name, email_id, password, dob, admin, callback) {
    sql.query('INSERT INTO users values(?,?,?,?,?,?,?)',[username, first_name, last_name, email_id, password, dob, admin] ,function(err, results){
        if (err) {
            throw err;
        }

        return callback(err);
    })
}

module.exports.getAdminPassword = getAdminPassword;
module.exports.doesUserExist = doesUserExist;
module.exports.addNewAdmin = addNewAdmin;