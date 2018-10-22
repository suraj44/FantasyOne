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

function getAllDriversbyConstructor(callback) {
    sql.query('SELECT * from Drivers order by constructor, Name', function(err, results){
        if (err) {
            throw err;
        }

        return callback(results);
    })
}

function getDriverID(driverName, callback) {
    sql.query('SELECT DriverID from Drivers where Name = ?',[driverName], function(err, results){
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
 * @param {SQL Query Result} res
 * @return {void} No return value222
 */
function updateDriverWeeklyScore(week_no, driverID,race_finish, qualifying_finish, no_overtakes, beat_teammate_race, beat_teammate_qualifying, week_score, callback){
    sql.query('INSERT INTO criteria values(?,?,?,?,?,?,?,?)', [week_no, driverID,race_finish, qualifying_finish, no_overtakes, beat_teammate_race, beat_teammate_qualifying, week_score], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function updateDriverTotalScore(callback){
    sql.query('UPDATE Drivers SET Tot_Points  = (select SUM(week_points) from criteria where criteria.driverid = Drivers.DriverID)', [driverID], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);

    })
}

function updateDriverPrice(newPrice, driverID, callback) {
    sql.query('UPDATE Drivers SET Cost = ? WHERE DriverID = ?', [newPrice, driverID], function (err) {
        // if(err) {
        //     throw err;
        // }
        return callback(err);

    })
}

getAllDrivers(function(result){
        module.exports.getDrivers = result;
    })



module.exports.getAllDriversbyConstructor = getAllDriversbyConstructor
module.exports.updateDriverWeeklyScore = updateDriverWeeklyScore;
module.exports.updateDriverTotalScore = updateDriverTotalScore;
module.exports.updateDriverPrice = updateDriverPrice;
//module.exports.updateTotalScore = updateTotalScore;
module.exports.getAllDrivers = getAllDrivers;
module.exports.getDriverID = getDriverID;
