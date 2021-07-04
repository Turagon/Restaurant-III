const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const { ensureAuth, forwardAuth } = require('../../config/pageAuth')
router.use(ensureAuth)


router.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .sort( {_id: 'asc' } )
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})

module.exports = router
