// Driver Route Module

const express = require('express');
const router = express.Router();

// Dummy URL for displaying all drivers
router.get('/', function(req,res) {
    res.send('Driver Home Page');
})

// Update the Weekly Score of a driver
router.get('/update_weekly_score', function(req,res) {
    res.send("Update a driver's weekly score");
})

module.exports = router;
