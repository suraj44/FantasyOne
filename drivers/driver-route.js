// Driver Route Module

const express = require('express');
const router = express.Router();
const drivers = require('./driver-model')
const controller = require('./driver-controller')

// Dummy URL for displaying all drivers
router.get('/', function(req,res) {
    res.send('Driver Home Page');
})

// Update the Weekly Score of a driver
router.get('/update_weekly_score', function(req,res) {
    res.sendFile('/views/form.html',{ root: __dirname })
})

router.post('/update_weekly_score', controller.updateWeeklyScore)

module.exports = router;
