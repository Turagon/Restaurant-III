const mongoose = require('mongoose')
const schema = mongoose.Schema

const userData = new schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  date: { type: Date, default: Date.now },
  favorite: [String]
})

module.exports = mongoose.model('user', userData)