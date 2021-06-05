function search (searchValue, ...restaurants) {
  if (searchValue) {
    return restaurants.filter(item => {
      return (item.name.includes(searchValue) || item.category.includes(searchValue)) || item.location.includes(searchValue.slice(0, 2))
    })
  } else {
    return restaurants
  } 
}

module.exports = search