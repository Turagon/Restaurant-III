const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const search = require('../../public/javascripts/search').search
const verification = require('../../public/javascripts/newToVerify').verification

// search routing
router.post('/searchResult', (req, res) => {
  const value = req.body
  return restaurantData.find()
    .lean()
    .then(restaurants => search(value.searchValue, value.searchRegion, ...restaurants))
    .then(restaurants => res.render('searchResult', {restaurants}))
    .catch(error => console.error(error))
})

// add form submit & verify
router.post('/addSubmit', (req, res) => {
  const data = req.body
  const verifyName = data.name
  const verifyCategory = data.category
  restaurantData.find()
    .lean()
    .then(restaurants => verification(verifyName, verifyCategory, ...restaurants))
    .then(restaurants => {
      if (!restaurants[0]) {
        return restaurantData.create(data)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
      } else {
        res.render('needConfirmAgain', { data, restaurants })
      }
    })
})

// add confirmed
router.post('/confirmed', (req, res) => {
  const data = req.body
  restaurantData.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    location: data.location,
    phone: data.phone,
    rating: data.rating,
    description: data.description,
    image: data.image
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// go to add page routing
router.get('/addNew', (req, res) => {
  return res.render('addNewRestaurant')
})


module.exports = router