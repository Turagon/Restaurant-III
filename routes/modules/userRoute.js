const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurantData')
const userData = require('../../models/userData')
const search = require('../../public/javascripts/search')
const verification = require('../../public/javascripts/newToVerify')
const sortTerm = require('../../public/javascripts/sortTerm')
const findRelative = require('../../public/javascripts/findRelative')
const { ensureAuth, forwardAuth } = require('../../config/pageAuth')
router.use(ensureAuth)

// search routing
router.post('/', (req, res) => {
  const searchValue = req.body.searchValue
  return restaurantData.find()
    .lean()
    .then(restaurants => search(searchValue, ...restaurants))
    .then(restaurants => res.render('searchResult', {searchValue, restaurants}))
    .catch(error => console.error(error))
})

// sort routing
router.post('/sort', (req, res) => {
  const value = req.body.sort
  const term = sortTerm(req.body.sort)
  return restaurantData.find()
    .lean()
    .sort(term)
    .then(restaurants => res.render('index', {value, restaurants}))
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
router.post('/confirmAdd', (req, res) => {
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
  const userId = req.user.id
  restaurantData.find()
    .lean()
    .then(restaurants => findRelative(id, ...restaurants))
    .then(restaurants => {
      userData.findById(userId)
        .then(user => {
          const isFavoriteCheck = user.favorite.filter(item => item === id)
          if (isFavoriteCheck[0]) {
            restaurants[0][0].collected = true
            res.render('detailDisplay', { restaurants })
          } else {
            restaurants[0][0].collected = false
            res.render('detailDisplay', { restaurants })
          }
        })
    })
    .catch(error => console.error(error))
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  restaurantData.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.error(error))
})

router.get('/collect/:id', (req, res) => {
  const idUser = req.user.id
  const idRestaurant = req.params.id
  userData.findById(idUser)
    .then(user => {
      const repeat = user.favorite.filter(item => item === idRestaurant)
      if (!repeat.length) {
        user.favorite.push(idRestaurant)
        user.save({ favorite: user.favorite })
        req.flash('msg', 'Successfully add to your list')
      } else {
        req.flash('error', 'this item is already in your list')
      }
    })
    .then(() => {
      console.log(res.locals.msg)
      res.redirect(`/restaurant/${idRestaurant}`)
    })
    .catch(err => console.log(err))
})

router.get('/reverseCollect/:id', (req, res) => {
  const idUser = req.user.id
  const idRestaurant = req.params.id
  userData.findById(idUser)
    .then(user => {
      const itemFuc = (item) => item === idRestaurant
      const restaurantIndex = user.favorite.findIndex(itemFuc)
      if (restaurantIndex !== -1) {
        const restaurantList = user.favorite.splice(restaurantIndex, 1)
        user.save({ favorite: restaurantList })
        req.flash('msg', 'Successfully remove from your list')
      } else {
        req.flash('error', 'Sorry, this item is not in your list')
      }
    })
    .then(() => {
      return res.redirect(`/restaurant/${idRestaurant}`)
    })
    .catch(err => console.log(err))
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
  .then(() => res.redirect(`/restaurant/${id}`))
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