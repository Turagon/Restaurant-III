const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')

router.get('/', (req, res) => {
  console.log(req.user)
  restaurantData.find()
    .lean()
    .sort( {_id: 'asc' } )
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})

module.exports = router
