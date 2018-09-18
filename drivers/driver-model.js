/**
 * To test this file, execute node driver-model.js in the teriminal
 */
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
/**
 * Function that fetches all drivers, unordered
 */
function getAllDrivers(callback) {
    sql.query('SELECT * from Drivers', function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })
}

/**
 * Function that fetches all drivers from the database, ordered by total points
 */
function getDriversSortedByTotalPoints(callback) {
    sql.query('SELECT * from Drivers ORDER BY Tot_Points', function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })

}


// Since JavaScript is a loosely typed language, you can't specify what the datatype of a function should be.
// However, you can 'mark' the datatype of the parameters for the compiler. The format for doing so is: (refer to the readme for more reference)
// Number follows the IEEE 754 precision standard and hence, includes floats as well. There's no specific type for int.
// See, the function works even without a callback, but I added it because we would want to return to the frontend that the operation has been completed 
// without having to deal with that asychronous issue.
/**
 * @param {Number} driverID The ID of the driver whose score needs to be updated
 * @param {Number} newScore The new score of the corresponding driver
 * @return {void} No return value222
 */
function updateDriverWeeklyScore(driverID, newScore, callback){
    sql.query('UPDATE Drivers SET Week_Points = ? WHERE DriverID = ?', [newScore, driverID], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);

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

// Uncomment whichever function call you want, to test the corresponding function.

// updateDriverWeeklyScore(1, 20.2, function(error) {
//     if(error) {
//         throw error
//     }
//     console.log("Weekly score has been updated.");
// })

// getAllDrivers(function(result){
//     //console.log(result);
//     L = result;
//     console.log(L[0]);
// })

// getDriversSortedByTotalPoints(function(result) {
//     console.log(result);
// })

module.exports = Driver;
