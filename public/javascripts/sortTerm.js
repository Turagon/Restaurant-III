function sortTerm (value) {
  if (value === 'name_en_reverse') {
    sortTerm = { name_en: -1 }
  } else if (value === 'category') {
    sortTerm = { category: 1 }
  } else if (value === 'location') {
    sortTerm = { location: 1 }
  } else {
    sortTerm = { name_en: 1 }
  }
  return sortTerm
}

module.exports = sortTerm