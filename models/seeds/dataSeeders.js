const restaurantData = require('../restaurantData')
const db = require('../../config/mongoose')
const seedData = require('../../restaurant.json').results

db.once('open', () => {
  for (let i of seedData) {
    restaurantData.create({
      name: i.name,
      name_en: i.name_en,
      category: i.category,
      image: i.image,
      location: i.location,
      phone: i.phone,
      rating: i.rating,
      description: i.description
    })
  }
  console.log('done')
})