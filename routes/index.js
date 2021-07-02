const express = require('express')
const home = require('./modules/home')
const auth = require('./modules/auth')
const restaurant = require('./modules/restaurant')

const router = express.Router()

router.use('/', auth)
router.use('/home', home)
router.use('/restaurant', restaurant)

module.exports = router