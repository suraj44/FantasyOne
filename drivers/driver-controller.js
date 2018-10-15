const model = require('./driver-model')

module.exports.updateWeeklyScore = function(req,res) {
    //console.log(req);
    driverID = req.body.DriverID;
    newScore = req.body.Weekly_Score;

    model.updateDriverWeeklyScore(driverID, newScore, function(err) {
        if(err) {
            console.log(err);
        }
    })

    model.updateDriverTotalScore(driverID, function(err) {
        if(err) {
            res.redirect("update_weekly_score");
            console.log("Error in updating database: " + err);
        } else {
            console.log("Database was updated successfully.")
            res.redirect("/");
            
        }
    })
    //model.updateWeeklyScore(driverID, newScore, res);

}