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

function getAllDrivers() {
    drivers = function() {
        sql.query('SELECT * from Drivers', function(err, drivers) {
            if(err) {
                console.log(err);
            } else {
            return rows;
            }
    });
    return drivers;
}
    console.log(drivers[0]);
};



var Driver = {
    id : 0,
    name : "",
    total_points : 0,
    cost : 0.0,
    week_points : 0
};

module.exports = Driver;
getAllDrivers();