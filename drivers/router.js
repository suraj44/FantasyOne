var drivers = require('./driver-model')
var log = require('bole')('drivers/router')
var router = require('express').Router()



// Function that will be called on a GET request
function getDrivers(req, res) {
    drivers.findAll(function (error, drivers) {
        if (error) {
            log.error(error, 'error fetching drivers')
            res.status(500).send(error)
            return
        }
        res.json(drivers)
    })
}

router.get('/drivers', getDrivers)

module.exports = router