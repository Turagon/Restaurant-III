
function verification (verifyValue, verifyCategory, ...arr) {
  return arr.filter(item => {
    return item.name.includes(verifyValue) && (item.category === verifyCategory)
  })
}

module.exports = verification