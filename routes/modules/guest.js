const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const findRelative = require('../../public/javascripts/findRelative')

router.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('guestIndex', { restaurants, layout: 'guestMain' }))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  restaurantData.find()
    .lean()
    .then(restaurants => findRelative(id, ...restaurants))
    .then(restaurants => res.render('guestDetailDisplay', { restaurants, layout: 'guestMain' }))
    .catch(error => console.error(error))
})

module.exports = router