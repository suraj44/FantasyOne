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

// From what I've understood:

// Because Node works asychronously, we need to use a callback.
// If you simply tried to return result, the problem is of the scope of the variable
// So in the return statement of this function, I'm actually calling the callback() function which is defined at line #47
// and that function passes the value of result to the global variable L.
function getAllDrivers(callback) {
    sql.query('SELECT * from Drivers', function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })
}




var Driver = {
    id : 0,
    name : "",
    total_points : 0,
    cost : 0.0,
    week_points : 0
};

var L;

getAllDrivers(function(result){
    //console.log(result);
    L = result;
    console.log(L[0]);
})

module.exports = Driver;
