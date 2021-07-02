function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'Please login to view this page')
  res.redirect('/')
}

function forwardAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/home')
}

module.exports = { ensureAuth, forwardAuth }