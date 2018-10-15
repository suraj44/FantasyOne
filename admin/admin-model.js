const sha1 = require('sha1');
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

module.exports.getAdminPassword = getAdminPassword;
