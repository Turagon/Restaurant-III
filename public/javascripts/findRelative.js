function findRelative (id, ...arr) {
  const targetRestaurant = arr.filter(item => item._id == id)
  const relativeLocation = targetRestaurant[0].location
  const relativeRestaurant = arr.filter(item => {
    return (item.location.includes(relativeLocation.slice(0, 2)) && item._id != id)
  })
  return [targetRestaurant, relativeRestaurant]
}

module.exports = findRelative