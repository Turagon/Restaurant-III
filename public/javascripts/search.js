function search (searchValue, searchRegion, ...restaurants) {
  if (searchValue) {
    return restaurants.filter(item => {
      return (item.name.includes(searchValue) || item.category.includes(searchValue)) && item.location.includes(searchRegion.slice(0, 2))
    })
  } else {
    return restaurants.filter(item => {
      return item.location.includes(searchRegion.slice(0, 2))
    })
  } 
}

module.exports = {search}