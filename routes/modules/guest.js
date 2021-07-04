const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const findRelative = require('../../public/javascripts/findRelative')
const search = require('../../public/javascripts/search')
const sortTerm = require('../../public/javascripts/sortTerm')

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

router.post('/', (req, res) => {
  const searchValue = req.body.searchValue
  return restaurantData.find()
    .lean()
    .then(restaurants => search(searchValue, ...restaurants))
    .then(restaurants => res.render('searchResult', { searchValue, restaurants }))
    .catch(error => console.error(error))
})

// sort routing
router.post('/sort', (req, res) => {
  const value = req.body.sort
  const term = sortTerm(req.body.sort)
  return restaurantData.find()
    .lean()
    .sort(term)
    .then(restaurants => res.render('guestIndex', { value, restaurants }))
    .catch(error => console.error(error))
})

module.exports = router