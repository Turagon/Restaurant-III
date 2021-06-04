const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurantdatas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('fail connect to db')
})

db.once('open', () => {
  console.log('db connecting success')
})

module.exports = db