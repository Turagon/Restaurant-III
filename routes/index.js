const express = require('express')
const home = require('./modules/home')
const auth = require('./modules/auth')
const restaurant = require('./modules/userRoute')
const guest = require('./modules/guest')

const router = express.Router()

router.use('/', auth)
router.use('/home', home)
router.use('/restaurant', restaurant)
router.use('/guest', guest)

module.exports = router