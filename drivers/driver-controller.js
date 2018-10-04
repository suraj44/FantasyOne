const model = require('./driver-model')

module.exports.updateWeeklyScore = function(req,res) {
    //console.log(req);
    driverID = req.body.DriverID;
    newScore = req.body.Weekly_Score;

    model.updateWeeklyScore(driverID, newScore, res)

    // if(model.weeklyScoreResult) {
    //     console.log("Controller received true")
    //     res.redirect("/");
    // } else { 
    //     console.log("Controller received error")
    //     res.redirect("update_weekly_score");
    // }

}

// module.exports = function(app) {

//     var DriverController = {
//         updateWeeklyScore : function(req, res) {
//             driverID = req.body.DriverID;
//             newScore = req.body.Weekly_Score;

//             if(model.updateWeeklyScore(driverID, newScore)) {
//                 res.redirect("/");
//             } else { 
//                 res.redirect("/update_weekly_score");
//             }

//         }
//     }
//     return DriverController;
// }