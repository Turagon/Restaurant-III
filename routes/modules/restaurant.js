const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const search = require('../../public/javascripts/search')
const verification = require('../../public/javascripts/newToVerify')
const sortTerm = require('../../public/javascripts/sortTerm')

// search routing
router.post('/', (req, res) => {
  const value = req.body.searchValue
  return restaurantData.find()
    .lean()
    .then(restaurants => search(value, ...restaurants))
    .then(restaurants => res.render('searchResult', {restaurants}))
    .catch(error => console.error(error))
})

// sort routing
router.post('/sort', (req, res) => {
  const term = sortTerm(req.body.sort)
  return restaurantData.find()
    .lean()
    .sort(term)
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})

// add form submit & verify
router.post('/addSubmit', (req, res) => {
  const restaurant = req.body
  const verifyName = restaurant.name
  const verifyCategory = restaurant.category
  restaurantData.find()
    .lean()
    .then(restaurants => verification(verifyName, verifyCategory, ...restaurants))
    .then(restaurants => {
      if (!restaurants[0]) {
        return restaurantData.create(restaurant)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
      } else {
        res.render('needConfirmAgain', { restaurant, restaurants })
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

router.get('/:id', (req, res) => {
  const id = req.params.id
  restaurantData.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const data = req.body
  const id = req.params.id
  restaurantData.findById(id)
  .then(restaurant => {
    restaurant.name = data.name
    restaurant.name_en = data.name_en
    restaurant.category = data.category
    restaurant.location = data.location
    restaurant.phone = data.phone
    restaurant.rating = data.rating
    restaurant.description = data.description
    restaurant.image = data.image
    return restaurant.save()
  })
  .then(() => res.redirect(`/${id}`))
  .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  restaurantData.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


module.exports = router