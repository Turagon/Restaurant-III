if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantData = require('../restaurantData')
const user = require('../userData')
const db = require('../../config/mongoose')
const seedData = require('../../restaurant.json').results
const seedUser = require('../../userData.json').users
const bcrypt = require('bcryptjs')

db.once('open', () => {
  seedUser.forEach(item => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(item.password, salt, (err, hash) => {
        return user.create({
          name: item.name,
          email: item.email,
          password: hash
        })
        .then(user => {
          const userName = user.name
          const refId = user._id
          for (let i of seedData) {
            if (userName === 'user1' && Number(i.id) <= 3) {
              restaurantData.create({
                ...i, userId: refId
              })
            } else if (userName === 'user2' && Number(i.id) > 3 && Number(i.id) <= 6) {
              restaurantData.create({
                ...i, userId: refId
              })
            } else if (userName === 'user3' && Number(i.id) > 6) {
              restaurantData.create({
                ...i, userId: refId
              })
            }
          }
        })
      })
    })
  })
  console.log('done')
})