const mongoose = require('mongoose')
const schema = mongoose.Schema

const restaurantSchema = new schema({
  name: { type: String, require: true },
  name_en: { type: String },
  category: { type: String, require: true },
  image: { type: String },
  location: { type: String, require: true },
  phone: { type: String },
  rating: { type: Number },
  description: { type: String },
  collected: {type: Boolean, default: false},
  userId: {
    type: schema.Types.ObjectId,
    ref: 'users',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('restaurantData', restaurantSchema)